import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "./features/redux/UserSlice";
import AppLoader from "./components/layout/AppLoader";

// Screens
import BoardsScreen from "./screens/BoardsScreen/BoardsScreen";
import BoardScreen from "./screens/BoardScreen";
import AuthScreen from "./screens/AuthScreen";

// Utils
import PublicOnlyRoute from "./components/utils/PublicOnlyRoute";
import PrivateRoute from "./components/utils/PrivateRoute";
import SnackBarManer from "./components/layout/SnackBarManer";

const App = () => {
  const user = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(setLoginState(!!user));
    });
    return () => unsub();
  }, []);

  if (user.loader) return <AppLoader />;

  return (
    <>
      <SnackBarManer />
      <Routes>
        <Route path="/" element={<PublicOnlyRoute Component={AuthScreen} />} />
        <Route
          path="/Boards"
          element={<PrivateRoute Component={BoardsScreen} />}
        />
        <Route
          path="/Boards/:BoardId"
          element={<PrivateRoute Component={BoardScreen} />}
        />
      </Routes>
    </>
  );
};

export default App;
