import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsCircleFill, BsFillStarFill } from "react-icons/bs";
import { BiGitRepoForked } from "react-icons/bi";
import Header from "./Header";
import langColors from "../utils/langColors";
import { BarChart, DonutChart, Card, Title } from "@tremor/react";
import {
	fetchMostStarredRepos,
	fetchRepos,
	fetchStarsPerLang,
	fetchTopLanguages,
} from "../utils/requests";

const UserProfile = () => {
	const { username } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState([]);
	const [error, setError] = useState(false);
	const [repos, setRepos] = useState([]);
	const [mostStarred, setMostStarred] = useState([]);
	const [starsPerLanguageArray, setStarsPerLanguageArray] = useState([]);
	const [topLanguages, setTopLanguages] = useState([]);

	useEffect(() => {
		function fetchGitHubUser() {
			fetch(`https://api.github.com/users/${username}`)
				.then((res) => res.json())
				.then((data) => {
					if (data.message) {
						setError(true);
						setLoading(false);
					} else {
						setLoading(false);
						setUserData(data);
					}
				})
				.catch((err) => {
					setError(true);
					setLoading(false);
					console.error(err);
				});
		}
		fetchGitHubUser();
	}, [username]);

	useEffect(() => {
		function authenticate() {
			if (!error) {
				fetchMostStarredRepos(username, setMostStarred);
				fetchRepos(username, setRepos);
				fetchStarsPerLang(username, setStarsPerLanguageArray);
				fetchTopLanguages(username, setTopLanguages);
			}
		}
		authenticate();
	}, [username, error]);
	if (loading) {
		return <div className='loading'>Loading...please wait</div>;
	}
	if (error) {
		return navigate("/error");
	}
	return (
		<div className='profile'>
			<Header data={userData} />
			<main className='main' style={{ padding: "30px" }}>
				<div className='card__container'>
					<Card>
						<Title>Top Languages</Title>
						<DonutChart
							data={topLanguages}
							category='count'
							variant='pie'
							dataKey='lang'
							marginTop='mt-6'
							colors={["yellow", "blue", "red", "blue"]}
						/>
					</Card>
					<Card>
						<Title>Most Starred</Title>
						<BarChart
							data={mostStarred}
							dataKey='name'
							categories={["stars"]}
							colors={["blue"]}
							marginTop='mt-6'
							yAxisWidth='w-6'
						/>
					</Card>
					<Card>
						<Title>Stars per Language</Title>
						<DonutChart
							data={starsPerLanguageArray}
							category='stars'
							dataKey='lang'
							marginTop='mt-6'
							colors={["yellow", "blue", "red", "blue"]}
						/>
					</Card>
				</div>

				<div className='second__main'>
					<h2>Top Repos</h2>
					<div className='repos__container'>
						{repos.map((repo) => (
							<div className='repo' key={repo.id}>
								<h3 id='repo__name'>{repo.name}</h3>
								<p id='repo__description'>{repo.description}</p>
								<div className='repo__icons'>
									<div>
										<BsCircleFill color={langColors[repo.language]} />
										<p>{repo.language || "Unknown"}</p>
									</div>
									<div>
										<BsFillStarFill />
										<p>{repo.stargazers_count}</p>
									</div>
									<div>
										<BiGitRepoForked />
										<p>{repo.size} KB</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
			<footer>
				<p>Built using React GitHub API</p>
			</footer>
		</div>
	);
};

export default UserProfile;
