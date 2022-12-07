import React, { useState } from "react";
import { FaGithubAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/profile/${username}`);
		setUsername("");
	};
	return (
		<div className='home'>
			<form className='home__form' onSubmit={handleSubmit}>
				<FaGithubAlt className='githubIcon' />
				<label htmlFor='username'>Enter your GitHub username</label>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					name='username'
					id='username'
				/>
			</form>
		</div>
	);
};

export default Home;
