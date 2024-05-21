import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({Component}) => {
   const isLoggedIn = useSelector(state => state.userData.isLoggedIn);

  return !isLoggedIn ? <Navigate to={"/"} replace/> :  <Component/>;
}

export default PrivateRoute