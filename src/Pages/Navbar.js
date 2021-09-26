import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../Assets/img/logo_small.png';
import profile from '../Assets/img/profile.png';
import logout from '../Assets/img/logout.png';
import '../Assets/css/Navbar.css';
import axios from 'axios';
import url from '../Services/axois';
import Swal from 'sweetalert2';
import refreshToken from '../Services/auth';
import noti from '../Assets/img/bell.svg';
import Notifications from './navbar-components/Notifications';

function Navbar(props) {
	const history = useHistory();
	const [data, setData] = useState([]);
	const [profileData, setProfileData] = useState();
	const token = localStorage.getItem('auth_pass');

	const getUserData = () => {
		axios
			.get(`${url}/api/home/`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				if (res.status === 200) {
					setData(res.data);
				}
			})
			.catch((error) => {
				if (error.response.data.code === 400) {
					Swal.fire({
						icon: 'error',
						text: error.response.data.message,
					});
				}
				if (error.response.data.code === '403') {
					refreshToken();
				}
			});
	};

	const getUserImage = () => {
		axios
			.get(`${url}/api/profile/`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => setProfileData(res.data.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getUserData();
		getUserImage();
	}, []);

	function logOut() {
		localStorage.removeItem('auth_pass');
		localStorage.removeItem('refresh_auth_pass');
		history.push('/');
		Swal.fire({
			icon: 'success',
			text: 'User Logged Out successfully!',
		});
	}

	return (
		<div className='navbar__section'>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-12 p-0'>
						<nav className='navbar navbar-expand-lg navbar-light bg-light'>
							<Link to='/dashboard' className='navbar-brand'>
								<img src={logo} alt='' className='img-fluid' />
							</Link>
							<button
								className='navbar-toggler d-none'
								type='button'
								data-toggle='collapse'
								data-target='#navbarSupportedContent'
								aria-controls='navbarSupportedContent'
								aria-expanded='false'
								aria-label='Toggle navigation'>
								<span className='navbar-toggler-icon'></span>
							</button>

							{/* <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              > */}
							<ul className='navbar-nav mr-auto'>
								<li className='nav-item active'>
									<h2 className='font-weight-bold color__primary ml-md-5'>
										{props.title}
									</h2>
								</li>
							</ul>
							<div className='form-inline my-2 my-lg-0 d-flex align-items-center'>
								<img
									src={noti}
									className='navbar__notification'
									alt=''
								/>
								<img
									src={profile}
									alt=''
									className='img-fluid mr-2'
									style={{ width: '40px' }}
								/>

								<div className='dropdown'>
									<button
										className='dropdown-toggle'
										type='button'
										id='dropdownMenuButton'
										data-toggle='dropdown'
										aria-haspopup='true'
										aria-expanded='false'>
										{data.first_name}
									</button>
									<div
										className='dropdown-menu'
										aria-labelledby='dropdownMenuButton'>
										<div
											className='dropdown-item'
											style={{ cursor: 'pointer' }}>
											<Link
												to='/profile'
												className='text-dark'>
												Manage Account
											</Link>
										</div>
										<div
											className='dropdown-item mt-3'
											onClick={logOut}
											style={{ cursor: 'pointer' }}>
											<img
												src={logout}
												alt=''
												className='img-fluid'
											/>{' '}
											Logout
										</div>
									</div>
								</div>
							</div>
							{/* </div> */}
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
