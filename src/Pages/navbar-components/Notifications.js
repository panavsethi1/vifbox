import React from 'react';
import { useEffect } from 'react';
import './Notifications.css';
import cross from '../../Assets/img/cross.svg';
import url from '../../Services/axois';
import axios from 'axios';
import NotificationItem from './NotificationItem';

function Notifications({ handleClose }) {
	const token = localStorage.getItem('auth_pass');

	// useEffect(() => {
	// 	axios
	// 		.get(`${url}/api/profile/`, {
	// 			headers: { Authorization: `Bearer ${token}` },
	// 		})
	// 		.then((res) => console.log(res))
	// 		.catch((err) => console.error(err));
	// });

	return (
		<div className='noti'>
			<div className='noti__slider'>
				<img src={cross} alt='' onClick={handleClose} />
				<div className='noti__slider__header'>
					<p>Notifications</p>
					<hr />
				</div>
				<div className='noti__body'>
					<NotificationItem />
					<NotificationItem />
				</div>
			</div>
		</div>
	);
}

export default Notifications;
