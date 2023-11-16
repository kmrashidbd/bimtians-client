import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import Bimtian from '../../assets/images/bimtian.png';
import { getLoggedInUser } from '../../features/actions/studentAction';
import { setToken } from '../../features/reducers/authSlice';
import { userLogOut } from '../../features/reducers/studentSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const token = localStorage.getItem('authToken');
    const { loggedInStudent } = useSelector(state => state.student)
    useEffect(() => {
        if (token) {
            dispatch(getLoggedInUser(token))
            dispatch(setToken(token))
        }
    }, [dispatch, token])
    const handleLogOut = () => {
        dispatch(userLogOut());
        dispatch(setToken(''))
        navigate('/login');
        localStorage.removeItem('authToken')
    };
    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <LinkContainer to='/'><Navbar.Brand><img src={Bimtian} className='rounded' width='150px' alt='BIMTian' /></Navbar.Brand></LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='me-auto'></Nav>
                        <Nav>
                            {token ? <>
                                <LinkContainer to='/message'><Nav.Link>Messaging</Nav.Link></LinkContainer>
                                <LinkContainer to='/blood-donation'><Nav.Link>Blood Donation</Nav.Link></LinkContainer>
                                {
                                    loggedInStudent?.status === 'active' && <>
                                        <LinkContainer to='/job/all'><Nav.Link>Job Query</Nav.Link></LinkContainer>
                                    </>
                                }
                                <NavDropdown title="Dashboard" id="collasible-nav-dropdown">
                                    <LinkContainer to='/dashboard'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    {
                                        loggedInStudent?.status === 'active' ? <>
                                            <LinkContainer to='/dashboard/bimtian/search'>
                                                <NavDropdown.Item>Search BIMTian</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to='/dashboard/post-job'>
                                                <NavDropdown.Item>Post A Job</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to='/dashboard/my-job-list'>
                                                <NavDropdown.Item>My Job List</NavDropdown.Item>
                                            </LinkContainer>

                                        </> : ''
                                    }
                                    {
                                        (loggedInStudent?.role === 'admin' || loggedInStudent?.role === "moderator") ? <>
                                            <LinkContainer to='/dashboard/bimtian/all'>
                                                <NavDropdown.Item>BIMTian List</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to='/dashboard/job-post-info'>
                                                <NavDropdown.Item>Job List</NavDropdown.Item>
                                            </LinkContainer>
                                        </> : ''
                                    }
                                    <LinkContainer to='/dashboard/change-password'>
                                        <NavDropdown.Item>Change Password</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                                <LinkContainer to={{
                                    pathname: "/bimtian/Kazi-Mamun",
                                    search: "?c4184409-9347-477f-ae18-4ad00dc0884e",
                                }}><Nav.Link>Developer Profile</Nav.Link></LinkContainer>
                                <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
                            </> : <>
                                <LinkContainer to='/login'><Nav.Link>Login</Nav.Link></LinkContainer>
                                <LinkContainer to='/register'><Nav.Link>Register</Nav.Link></LinkContainer>
                            </>}                            
                            <LinkContainer to='/about'><Nav.Link>About</Nav.Link></LinkContainer>
                            <LinkContainer to='/contact'><Nav.Link>Contact</Nav.Link></LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;