import React, { useState } from 'react';
import './LeftNav.css';
import add from '../../Assets/img/math-plus.svg';
import hamburger from '../../Assets/img/hamburger-menu.svg';

function LeftNav({ page, setting, handleSettings }) {
	const [settingsType, setSettingsType] = useState('account');
	const [isOpen, setIsOpen] = useState('false');

	function handleSettingsChange(e) {
		setSettingsType(e.target.id);
		handleSettings(e);
		if (e.target.id === 'security') {
			setting();
		}
	}

	function handleHamburger() {
		setIsOpen(!isOpen);
		if (isOpen) {
			document.getElementById('left-nav').style.display = 'initial';
		} else {
			document.getElementById('left-nav').style.display = 'none';
		}
	}

	return (
		<>
			<div id='left-nav' className='left-nav'>
				{page === 'dashboard' && (
					<div className='left-nav__new'>
						<img src={add} alt='' />
						<p>New</p>
					</div>
				)}
				{page === 'profile' && (
					<>
						<div onClick={handleSettingsChange} id='account'>
							<p
								id='account'
								className={
									settingsType === 'account'
										? 'active__profile'
										: 'ml-2'
								}
								style={{ cursor: 'pointer' }}>
								<i class='fas fa-user-cog'></i> Account
								Preferences
							</p>
						</div>
						<div onClick={handleSettingsChange} id='security'>
							<p
								id='security'
								className={
									settingsType === 'security'
										? 'active__profile'
										: 'ml-2'
								}
								style={{ cursor: 'pointer' }}>
								<i class='fas fa-user-shield'></i> Sign in &
								Security
							</p>
						</div>
					</>
				)}
			</div>
			<div id='hamburger' onClick={handleHamburger}>
				<img onClick={handleHamburger} src={hamburger} alt='' />
			</div>
		</>
	);
}

export default LeftNav;
