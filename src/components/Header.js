import React from "react";
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";

const Header = ({ data }) => {
	const splitDate = (date) => {
		const array = date.split("-");
		const months = {
			Janauary: "01",
			February: "02",
			March: "03",
			April: "04",
			May: "05",
			June: "06",
			July: "07",
			August: "08",
			September: "09",
			October: "10",
			November: "11",
			December: "12",
		};
		const day = array[2].substring(0, 2);
		const month = Object.keys(months).find((key) => months[key] === array[1]);
		const year = array[0];
		return `Joined ${month} ${day}, ${year}`;
	};
	return (
		<header className='profile__header'>
			<nav className='profile__nav'>
				<h2>Coder Stats</h2>
				<div className='profile__links'>
					<Link to='/' className='home__link'>
						Home
					</Link>
					<a href='https://github.com/app-generator/sample-tremor-github-charts' target='_blank' rel='noreferrer'>
						GitHub
					</a>
				</div>
			</nav>
			<div className='profile___section'>
				<img src={data.avatar_url} alt={data.name} className='profile__image' />
				<h1>{data.name}</h1>
				<a
					href={`https://github.com/${data.login}`}
					alt={data.name}
					className='profile__url'
					target='_blank'
					rel='noreferrer'
				>
					@{data.login}
				</a>
				<div className='profile__info'>
					<div style={{ display: "flex", marginRight: "30px", color: "#ddd" }}>
						<IoLocationSharp />
						<p>{data.location}</p>
					</div>

					<div style={{ display: "flex", color: "#ddd" }}>
						<FaCalendarAlt style={{ marginRight: "5px" }} />
						<p>{splitDate(data.created_at)}</p>
					</div>
				</div>
				<div className='profile__details'>
					<div>
						<p className='profile__text'>{data.public_repos}</p>
						<p style={{ color: "#21325e" }}>Repositories</p>
					</div>
					<div>
						<p className='profile__text'>{data.followers}</p>
						<p style={{ color: "#21325e" }}>Followers</p>
					</div>
					<div>
						<p className='profile__text'>{data.following}</p>
						<p style={{ color: "#21325e" }}>Following</p>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
