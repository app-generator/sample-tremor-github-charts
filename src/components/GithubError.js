import React from "react";
import { Link } from "react-router-dom";

const GithubError = ({ error }) => {
	return (
		<main className='errorContainer'>
			<h2 style={{ color: "#fff" }}>Github User: {error || "Not Found"}</h2>
			<Link to='/'>Go back</Link>
		</main>
	);
};

export default GithubError;
