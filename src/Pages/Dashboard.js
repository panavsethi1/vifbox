import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import url from '../Services/axois';
import Swal from 'sweetalert2';
import refreshToken from '../Services/auth';
import welcome from '../Assets/img/undraw.png';
import LeftNav from './navbar-components/LeftNav';

function Dashboard() {
	const [data, setData] = useState([]);
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

	useEffect(() => {
		getUserData();
	}, []);
	return (
		<div>
			<Navbar title='Dashboard' />
			<LeftNav page='dashboard' />
			<section className='dashboard__section'>
				<div className='container'>
					<div className='col-md-12'>
						<img
							src={welcome}
							alt=''
							className='img-fluid d-block m-auto'
							style={{ width: '50%' }}
						/>
						<h1 className='text-center mt-5 color__primary'>
							{data.first_name} {data.last_name}
						</h1>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Dashboard;
