import React from 'react';
import './Notifications.css';

function NotificationItem() {
	return (
		<div className='noti__item'>
			<div className='noti__item__avatar'>
				<img
					src='https://ui-avatars.com/api/name=Panav%20Sethi&background=random'
					alt=''
				/>
			</div>
			<div className='noti__item__content'>
				<p>
					<span>Panav Sethi</span> invited you to a project.
				</p>
			</div>
			<div className='noti__item__time'>
				<p>2 mins</p>
			</div>
		</div>
	);
}

export default NotificationItem;
