import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setToken } from '../../features/reducers/authSlice';
import { userLogOut } from '../../features/reducers/studentSlice';
import Loading from '../Shared/Loading';

const RequireActive = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const student = useSelector(state => state.student);
    useEffect(() => {
        if (student?.loggedInStudent?.status !== 'active') {
            toast.warning('Active Student Access Only!')
            dispatch(setToken());
            dispatch(userLogOut())
            navigate('/login')
        }
    }, [dispatch, navigate, student?.loggedInStudent?.status])
    if (student?.isLodaing) {
        return <Loading />
    }
    return children;
};

export default RequireActive;