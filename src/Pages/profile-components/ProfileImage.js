import React from 'react';
import { useState, useEffect } from 'react';
import edit from '../../Assets/img/edit-image.svg';
import url from '../../Services/axois';
import axios from 'axios';

function ProfileImage({ data, token }) {
	const [profileImg, setProfileImg] = useState();
	const [profileTitle, setProfileTitle] = useState('Software Engineer');

	useEffect(() => {
		console.log(data);
		console.log(
			`https://ui-avatars.com/api/name=${data.name}&background=random`
		);
	}, []);

	const handleFileChange = (e) => {
		setProfileImg(URL.createObjectURL(e.target.files[0]));
	};

	const handleTitleChange = (e) => {
		setProfileTitle(e.target.value);
	};

	const handleSave = () => {
		axios
			.put(`${url}/api/profile/set_img/`, {
				headers: { Authorization: `Bearer ${token}` },
				body: {
					profile_img_url: profileImg,
					profile_title: profileTitle,
				},
			})
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};

	return (
		<div className='col-md-4 mt-3'>
			<div className='card card-profile-image'>
				<div className='card-body'>
					<h5>PROFILE IMAGE</h5>
					<div className='card-profile-image__content'>
						<div className='image-upload'>
							<label for='upload'>
								<img
									className='image-upload__preview'
									src={
										profileImg
											? profileImg
											: data.profile_img_url
											? `https://dev.vifbox.org${data.profile_img_url}`
											: `https://ui-avatars.com/api/name=${data.name}&background=random`
									}
									alt=''
								/>
								<img
									className='image-upload__edit'
									src={edit}
									alt=''
								/>
							</label>
						</div>
						<input
							id='upload'
							className='image-upload__input'
							type='file'
							onChange={handleFileChange}
						/>
						<input
							type='text'
							className='image-upload__title'
							value={profileTitle}
							onChange={handleTitleChange}
						/>
						<button onClick={handleSave} className='btn btn__save'>
							SAVE
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileImage;

// `https://dev.vifbox.org${data.profile_img_url}`

// localtest@gmail.com
// Nightmare
