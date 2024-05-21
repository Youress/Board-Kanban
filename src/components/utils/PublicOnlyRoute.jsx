import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicOnlyRoute = ({ Component }) => {
    const isLoggedIn = useSelector(state => state.userData.isLoggedIn);

    return isLoggedIn ? <Navigate to={"/Boards"} replace/> :  <Component/>;
};

export default PublicOnlyRoute;
