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
				<p>
					<a href="https://appseed.us/" rel="noreferrer" target="_blank">&copy; AppSeed</a> 					
					&nbsp; &bull; &nbsp; 					
					<a href="https://github.com/app-generator/sample-tremor-github-charts" rel="noreferrer" target="_blank">Sources</a>
				</p>
			</form>
		</div>
	);
};

export default Home;
