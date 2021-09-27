import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../Assets/css/Profile.css';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import url from '../Services/axois';
import Swal from 'sweetalert2';
import refreshToken from '../Services/auth';
import { useHistory } from 'react-router-dom';
import themes from './themes';
import Dropdown from './Dropdown';
import Select from 'react-select';
import tick from '../Assets/img/tick.png';
import exclamation from '../Assets/img/exclamation.png';
import arrow from '../Assets/img/right-angle-arrow.svg';
import ProfileImage from './profile-components/ProfileImage';

function Profile() {
	const history = useHistory();
	const [data, setData] = useState([]);
	const [passwordCntrl1, setpasswordCntrl1] = useState(true);
	const [passwordCntrl2, setpasswordCntrl2] = useState(true);
	const [passwordCntrl3, setpasswordCntrl3] = useState(true);
	const [settingsType, setSettingsType] = useState('account');
	const token = localStorage.getItem('auth_pass');

	const [theme, setTheme] = useState('');

	const options = [];

	Object.keys(themes).forEach((theme) => {
		options.push({
			value: theme,
			label: theme.charAt(0).toUpperCase() + theme.slice(1),
		});
	});

	const handleChange = (selectedTheme) => {
		setTheme(themes[selectedTheme.value]);
	};
	const refCallback = (node) => {
		if (node) {
			theme &&
				Object.keys(theme).forEach((element) => {
					node.style.setProperty(
						element,
						theme[element],
						'important'
					);
					if (
						element === 'background-color' ||
						element === 'background'
					) {
						// apply the same background mentioned for theme to the body of the website
						document.body.style.background = theme[element];
					}
				});
		}
	};

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
				console.log(error.response);
				if (error.response.data.code === 400) {
					Swal.fire({
						icon: 'error',
						text: error.response.data.message,
					});
				}
				if (error.response.data.code === '403') {
					Swal.fire({
						icon: 'error',
						text: error.response.data.message,
					});
					refreshToken();
				}
			});
	}
	const initialValues = {
		email: data.email,
		name: data.name,
		username: data.username,
		phone: data.phone_number,
	};
	useEffect(() => {
		// refreshToken();
		getUserData();
	}, []);

	const personalInfo = (values) => {
		axios
			.put(`${url}/api/profile/set_info/`, values, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				if (res.status === 200) {
					Swal.fire({
						icon: 'success',
						text: res.data.message,
					});
					getUserData();
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
					Swal.fire({
						icon: 'error',
						text: error.response.data.message,
					});
					refreshToken();
				}
			});
	};
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
					Swal.fire({
						icon: 'error',
						text: error.response.data.message,
					});
					refreshToken();
				}
			});
	};

	const initialValuesCompany = {
		company_email: data.company_email,
		company_name: data.company_name,
	};

	const companyUpdate = (values, onSubmitProps) => {
		axios
			.put(`${url}/api/profile/set_company/`, values, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				if (res.status === 200) {
					Swal.fire({
						icon: 'success',
						text: res.data.message,
					});
					getUserData();
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
					Swal.fire({
						icon: 'error',
						text: error.response.data.message,
					});
					refreshToken();
				}
			});
	};

	function handleSettingsChange(e) {
		setSettingsType(e.target.id);
		console.log(e.target.id);
	}

	return (
		<div className='profile' ref={refCallback}>
			<Navbar title='Profile' data={data} />

			<section className='profile__section mt-3'>
				<div className='container-fluid'>
					<div className='row pb-5 flex-wrap justify-content-between card-row'>
						<div className='col-md-3 mt-3'>
							<div className='card card__options'>
								<div className='card-body'>
									<div
										onClick={handleSettingsChange}
										id='account'
										className='card-tab'>
										<p
											id='account'
											className='card-tab__title'>
											Account Preferences
										</p>
										<img
											id='account'
											className='card-tab__arrow'
											src={arrow}
											alt=''
										/>
									</div>
									<div
										onClick={handleSettingsChange}
										id='security'
										className='card-tab'>
										<p
											id='security'
											className='card-tab__title'>
											Sign in & Security
										</p>
										<img
											id='security'
											className='card-tab__arrow'
											src={arrow}
											alt=''
										/>
									</div>
									<div
										onClick={handleSettingsChange}
										id='theme'
										className='card-tab'>
										<p
											id='theme'
											className='card-tab__title'>
											Theme Preferences
										</p>{' '}
										<img
											id='theme'
											className='card-tab__arrow'
											src={arrow}
											alt=''
										/>
									</div>
								</div>
							</div>
						</div>
						{settingsType === 'account' && (
							<>
								<div className='col-md-4 mt-3'>
									<div className='card'>
										<div className='card-body'>
											<h5>PERSONAL INFORMATION</h5>

											<Formik
												initialValues={initialValues}
												onSubmit={personalInfo}
												enableReinitialize>
												<Form>
													<div className='row mt-4'>
														<div className='col-md-12'>
															<div className='form-group'>
																<label htmlFor='name'>
																	Name
																</label>
																<Field
																	type='text'
																	className='form-control'
																	id='name'
																	name='name'
																	aria-describedby='emailHelp'
																	placeholder='Enter name'
																/>
															</div>
														</div>
														<div className='col-md-12'>
															<div className='form-group'>
																<label htmlFor='email'>
																	Your Email
																</label>
																<Field
																	type='text'
																	className='form-control'
																	id='email'
																	name='email'
																	aria-describedby='emailHelp'
																	placeholder='Enter email'
																	readOnly
																/>
															</div>
														</div>
														<div className='col-md-12'>
															<div className='form-group'>
																<label htmlFor='username'>
																	Username
																</label>
																<Field
																	type='text'
																	className='form-control'
																	id='username'
																	name='username'
																	aria-describedby='emailHelp'
																	placeholder='Enter username'
																/>
															</div>
														</div>
														<div className='col-md-12'>
															<div className='form-group'>
																<label htmlFor='phone'>
																	Phone Number
																</label>
																<Field
																	type='text'
																	className='form-control'
																	id='phone'
																	name='phone'
																	aria-describedby='emailHelp'
																	placeholder='Enter phone number'
																/>
															</div>
														</div>
													</div>
													<div className='row mt-4 justify-content-center'>
														{/* <div className="col-md-5"> */}
														{/* <button className="btn btn__close">CLOSE</button> */}
														{/* </div> */}
														<div className='col-md-5'>
															<button className='btn btn__save'>
																UPDATE
															</button>
														</div>
													</div>
												</Form>
											</Formik>
										</div>
									</div>
								</div>
								<ProfileImage data={data} token={token} />
								<div className='col-md-3 mt-3'></div>
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
																placeholder='Enter name'
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
													{/* <div className="col-md-5">
                          <button className="btn btn__close">CLOSE</button>
                        </div> */}
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
						{settingsType === 'account' && (
							<>
								<div className='col-md-4 mt-3'>
									<div className='card'>
										<div className='card-body'>
											<h5>COMPANY INFORMATION</h5>

											<Formik
												initialValues={
													initialValuesCompany
												}
												onSubmit={companyUpdate}
												enableReinitialize>
												<Form>
													<div className='row mt-4'>
														<div className='col-md-12'>
															<div className='form-group'>
																<label htmlFor='company_name'>
																	Company Name
																</label>
																<Field
																	type='text'
																	className='form-control'
																	id='company_name'
																	name='company_name'
																	aria-describedby='emailHelp'
																	placeholder='Enter Company Name'
																/>
															</div>
														</div>
														<div className='col-md-12'>
															<div className='form-group'>
																<label htmlFor='company_email'>
																	Company
																	Email
																</label>
																<Field
																	type='text'
																	className='form-control'
																	id='company_email'
																	name='company_email'
																	aria-describedby='emailHelp'
																	placeholder='Enter company email'
																/>
															</div>
														</div>
													</div>
													<div className='row mt-4 justify-content-center'>
														{/* <div className="col-md-5">
                          <button className="btn btn__close">CLOSE</button>
                        </div> */}
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
								<div className='col-md-4 mt-3'></div>
							</>
						)}
						{settingsType === 'security' && (
							<div className='col-md-4 mt-3'>
								<div className='card'>
									<div className='card-body'>
										<h5>ACCOUNT SECURITY</h5>

										<div className='row mt-5'>
											<div className='col-2'>
												<img
													src={tick}
													alt=''
													className='img-fluid'
												/>
											</div>
											<div className='col-10'>
												<h5>CONFIRM EMAIL</h5>
												<small>
													Your email is confirmed
												</small>
												<p className='mt-2 font-weight-bold'>
													Change
												</p>
											</div>
										</div>
										<div className='row mt-5'>
											<div className='col-2'>
												<img
													src={exclamation}
													alt=''
													className='img-fluid'
												/>
											</div>
											<div className='col-10'>
												<h5>2 STEP VERIFICATION</h5>
												<small>
													Protect your Vifbox account
													with both your password & a
													phone code.
												</small>
												<p className='mt-2 font-weight-bold'>
													Enable
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
						{settingsType === 'theme' && (
							<>
								<div className='col-md-4 mt-3'>
									<div className='card'>
										<div className='card-body'>
											<h5>THEME PREFERENCES</h5>

											<Formik>
												<Form>
													<div className='row mt-4'>
														<div className='col-md-12'>
															<div className='form-group'>
																<label htmlFor='name'>
																	Theme
																</label>
																<Select
																	className='select-filter'
																	onChange={
																		handleChange
																	}
																	options={
																		options
																	}
																/>
															</div>
														</div>
														<div className='col-md-12'>
															<div className='form-group'>
																<label htmlFor='email'>
																	Language
																</label>
																<select
																	className='form-control'
																	id='exampleFormControlSelect1'>
																	<option>
																		English
																	</option>
																	<option>
																		French
																	</option>
																</select>
															</div>
														</div>
													</div>
													<div className='row mt-4 justify-content-center'>
														{/* <div className="col-md-5">
                          <button className="btn btn__close">CLOSE</button>
                        </div> */}
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
								<div className='col-md-4 mt-3'></div>
							</>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}

export default Profile;
