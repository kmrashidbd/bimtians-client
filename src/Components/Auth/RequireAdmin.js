import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogOut } from "../../features/reducers/studentSlice";
import Loading from "../Shared/Loading";

const RequireAdmin = ({ children }) => {
    const dispatch = useDispatch();
    const student = useSelector(state=>state.student);
    let location = useLocation();
    if(student?.isLoading){
        return <Loading/>
    }
    if (student?.loggedInStudent?.role === 'moderator' || student?.loggedInStudent?.role === 'admin') {
        return children;
    }
    toast.warning('Authorized Access Only!')
    dispatch(userLogOut())
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAdmin;
