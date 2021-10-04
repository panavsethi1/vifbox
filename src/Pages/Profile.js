import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../Assets/css/Profile.css';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import url from '../Services/axois';
import Swal from 'sweetalert2';
import refreshToken from '../Services/auth';
import { Link, useHistory } from 'react-router-dom';
import themes from './themes';
import Dropdown from './Dropdown';
import Select from 'react-select';
import tick from '../Assets/img/tick.png';
import cross from '../Assets/img/cross.png';
import exclamation from '../Assets/img/exclamation.png';
import arrow from '../Assets/img/right-angle-arrow.svg';
import ProfileImage from './profile-components/ProfileImage';
import LeftNav from './navbar-components/LeftNav';

function Profile() {
	const history = useHistory();
	const [data, setData] = useState([]);
	const [passwordCntrl1, setpasswordCntrl1] = useState(true);
	const [passwordCntrl2, setpasswordCntrl2] = useState(true);
	const [passwordCntrl3, setpasswordCntrl3] = useState(true);
	const [settingsType, setSettingsType] = useState('account');
	const [settingData, setSettingData] = useState([]);
	const token = localStorage.getItem('auth_pass');

	// const [theme, setTheme] = useState("");

	// const options = [];

	// Object.keys(themes).forEach((theme) => {
	//   options.push({
	//     value: theme,
	//     label: theme.charAt(0).toUpperCase() + theme.slice(1),
	//   });
	// });

	// const handleChange = (selectedTheme) => {
	//   setTheme(themes[selectedTheme.value]);
	// };
	// const refCallback = (node) => {
	//   if (node) {
	//     theme &&
	//       Object.keys(theme).forEach((element) => {
	//         node.style.setProperty(element, theme[element], "important");
	//         if (element === "background-color" || element === "background") {
	//           document.body.style.background = theme[element];
	//         }
	//       });
	//   }
	// };

	function getUserData() {
		axios
			.get(`${url}/api/profile/`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				if (res.status === 200) {
					setData(res.data.data);
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
	}
	useEffect(() => {
		// refreshToken();
		getUserData();
	}, []);

	const initialValuesPassword = {
		old_password: '',
		new_password: '',
		new_password1: '',
	};
	const changePassword = (values, onSubmitProps) => {
		axios
			.post(`${url}/api/settings/set_info/`, values, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				if (res.status === 200) {
					onSubmitProps.resetForm();
					Swal.fire({
						icon: 'success',
						text: res.data.message,
					});
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

	function handleSettingsChange(e) {
		setSettingsType(e.target.id);
		if (e.target.id === 'security') {
			setting();
		}
	}

	const setting = () => {
		axios
			.get(`${url}/api/settings/`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				if (res.status === 200) {
					setSettingData(res.data.data);
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

	return (
		<div className='profile'>
			<Navbar title='Profile' />
			<LeftNav
				page='profile'
				setting={setting}
				handleSettings={handleSettingsChange}
			/>
			<section id='profile' className='profile__section mt-3'>
				<div className='container-fluid'>
					<div className='row pb-5 flex-wrap justify-between'>
						{/* <div className="col-md-2 mt-3 p-0">
              <div onClick={handleSettingsChange} id="account">
                <p
                  id="account"
                  className={
                    settingsType === "account" ? "active__profile" : "ml-2"
                  }
                  style={{ cursor: "pointer" }}
                >
                  <i class="fas fa-user-cog"></i> Account Preferences
                </p>
              </div>
              <div onClick={handleSettingsChange} id="security">
                <p
                  id="security"
                  className={
                    settingsType === "security" ? "active__profile" : "ml-2"
                  }
                  style={{ cursor: "pointer" }}
                >
                  <i class="fas fa-user-shield"></i> Sign in & Security
                </p>
              </div>
            </div> */}
						{settingsType === 'account' && (
							<>
								<div className='col-md-10'>
									<div className='row'>
										<div className='col-md-12 d-flex justify-content-center'>
											<ProfileImage />
										</div>
									</div>
									<div className='row'>
										<div className='col-md-4 profile__card'>
											<div className='card '>
												<div className='card-body'>
													<h5>
														PERSONAL INFORMATION
													</h5>
													<small>
														See the data in your
														Vifbox Account
													</small>
													<hr />
													<Link to='profile/personal-information'>
														Manage your data
													</Link>
												</div>
											</div>
										</div>
										<div className='col-md-4 profile__card'>
											<div className='card '>
												<div className='card-body'>
													<h5>COMPANY INFORMATION</h5>
													<small>
														See the data in your
														Vifbox Account
													</small>
													<hr />
													<Link to='profile/company-information'>
														Manage your data
													</Link>
												</div>
											</div>
										</div>
										<div className='col-md-4 profile__card'>
											<div className='card '>
												<div className='card-body'>
													<h5>GENERAL PREFERENCES</h5>
													<small>
														Manage settings for
														Vifbox services on the
														web
													</small>
													<hr />
													<Link to='profile/general-information'>
														Manage your data
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
						{settingsType === 'security' && (
							<div className='col-md-4 mt-3'>
								<div className='card'>
									<div className='card-body'>
										<h5>CHANGE PASSWORD</h5>

										<Formik
											initialValues={
												initialValuesPassword
											}
											onSubmit={changePassword}>
											<Form>
												<div className='row mt-4'>
													<div className='col-md-12'>
														<div
															className='form-group'
															style={{
																position:
																	'relative',
															}}>
															<label htmlFor='old_password'>
																Current Password
															</label>
															<Field
																type={
																	passwordCntrl1
																		? 'password'
																		: 'text'
																}
																className='form-control'
																id='old_password'
																name='old_password'
																aria-describedby='emailHelp'
																placeholder='Enter current password'
															/>
															<i
																className={
																	passwordCntrl1
																		? 'fa fa-eye-slash fa-lg'
																		: 'fa fa-eye fa-lg active'
																}
																id='change_password_eyeslash1'
																onClick={() =>
																	setpasswordCntrl1(
																		!passwordCntrl1
																	)
																}
																style={{
																	fontSize:
																		'15px',
																}}></i>
														</div>
													</div>
													<div className='col-md-12'>
														<div
															className='form-group'
															style={{
																position:
																	'relative',
															}}>
															<label htmlFor='new_password'>
																New Password
															</label>
															<Field
																type={
																	passwordCntrl2
																		? 'password'
																		: 'text'
																}
																className='form-control'
																id='new_password'
																name='new_password'
																aria-describedby='emailHelp'
																placeholder='Enter new password'
															/>
															<i
																className={
																	passwordCntrl2
																		? 'fa fa-eye-slash fa-lg'
																		: 'fa fa-eye fa-lg active'
																}
																id='change_password_eyeslash1'
																onClick={() =>
																	setpasswordCntrl2(
																		!passwordCntrl2
																	)
																}
																style={{
																	fontSize:
																		'15px',
																}}></i>
														</div>
													</div>
													<div className='col-md-12'>
														<div
															className='form-group'
															style={{
																position:
																	'relative',
															}}>
															<label htmlFor='new_password1'>
																Confirm New
																Password
															</label>
															<Field
																type={
																	passwordCntrl3
																		? 'password'
																		: 'text'
																}
																className='form-control'
																id='new_password1'
																name='new_password1'
																aria-describedby='emailHelp'
																placeholder='Re-enter new password'
															/>
															<i
																className={
																	passwordCntrl3
																		? 'fa fa-eye-slash fa-lg'
																		: 'fa fa-eye fa-lg active'
																}
																id='change_password_eyeslash1'
																onClick={() =>
																	setpasswordCntrl3(
																		!passwordCntrl3
																	)
																}
																style={{
																	fontSize:
																		'15px',
																}}></i>
														</div>
													</div>
												</div>
												<div className='row mt-4 justify-content-center'>
													<div className='col-md-5'>
														<button className='btn btn__save'>
															SAVE
														</button>
													</div>
												</div>
											</Form>
										</Formik>
									</div>
								</div>
							</div>
						)}
						{settingsType === 'security' && (
							<div className='col-md-4 mt-3'>
								<div className='card'>
									<div className='card-body'>
										<h5>ACCOUNT SECURITY</h5>

										<div className='row mt-5'>
											<div className='col-2 d-flex justify-content-center align-items-start'>
												<img
													src={
														settingData.is_verified ===
														true
															? tick
															: cross
													}
													alt=''
													className='img-fluid'
													style={{ width: '25px' }}
												/>
											</div>
											<div className='col-10'>
												<h6>CONFIRM EMAIL</h6>
												<small>
													{settingData.is_verified ===
													true
														? 'Email is verified'
														: 'Your email is not verified'}
												</small>
												<p
													className='mt-2 font-weight-bold'
													style={{
														cursor: 'pointer',
														color: '#26237b',
													}}
													onClick={() => {
														axios
															.get(
																`${url}/api/email-verify-resend/`,
																{
																	headers: {
																		Authorization: `Bearer ${token}`,
																	},
																}
															)
															.then((res) => {
																if (
																	res.status ===
																	200
																) {
																	Swal.fire({
																		icon: 'success',
																		text: res
																			.data
																			.message,
																	});
																}
															})
															.catch((error) => {
																if (
																	error
																		.response
																		.data
																		.code ===
																	400
																) {
																	Swal.fire({
																		icon: 'error',
																		text: error
																			.response
																			.data
																			.message,
																	});
																}
																if (
																	error
																		.response
																		.data
																		.code ===
																	'403'
																) {
																	Swal.fire({
																		icon: 'error',
																		text: error
																			.response
																			.data
																			.message,
																	});
																	refreshToken();
																}
															});
													}}>
													{settingData.is_verified ===
													true
														? ''
														: 'Resend Email'}
												</p>
												{/* <button onClick={resendEmail()}>
                              Resend Email
                            </button> */}
											</div>
										</div>
										<div className='row mt-5'>
											<div className='col-2'>
												<img
													src={exclamation}
													alt=''
													className='img-fluid'
													style={{ width: '25px' }}
												/>
											</div>
											<div className='col-10'>
												<h6>2 STEP VERIFICATION</h6>
												<small>
													Protect your Vifbox account
													with both your password & a
													phone code.
												</small>
												<p
													className='mt-2 font-weight-bold'
													style={{
														cursor: 'pointer',
														color: '#26237b',
													}}>
													Enable
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}

export default Profile;
