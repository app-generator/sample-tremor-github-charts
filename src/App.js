import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GithubError from "./components/GithubError";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import "@tremor/react/dist/esm/tremor.css";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/profile/:username' element={<UserProfile />} />
				<Route path='/error' element={<GithubError />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
