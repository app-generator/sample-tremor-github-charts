export function fetchMostStarredRepos(user, setVariable) {
	fetch(
		`https://api.github.com/users/${user}/repos?type=owner&sort=updated&per_page=100`
	)
		.then((res) => res.json())
		.then((data) => {
			const sorted = data.sort(
				(a, b) => b.stargazers_count - a.stargazers_count
			);
			const mostStarred = [];
			const newArray = sorted.splice(0, 5);
			for (let i = 0; i < newArray.length; i++) {
				mostStarred.push({
					name: newArray[i].name,
					stars: newArray[i].stargazers_count,
				});
			}
			setVariable(mostStarred);
		})
		.catch((err) => console.error(err));
}

export function fetchRepos(user, setVariable) {
	fetch(
		`https://api.github.com/users/${user}/repos?type=owner&sort=updated&per_page=100`
	)
		.then((res) => res.json())
		.then((data) => {
			const mostStarred = data.sort(
				(a, b) => b.stargazers_count - a.stargazers_count
			);
			setVariable(mostStarred.splice(0, 9));
		})
		.catch((err) => console.error(err));
}

export function fetchStarsPerLang(user, setVariable) {
	const languages = [];
	fetch(
		`https://api.github.com/users/${user}/repos?type=owner&sort=updated&per_page=100`
	)
		.then((res) => res.json())
		.then((data) => {
			data
				.filter((i) => i.language)
				.forEach((repo) => {
					const idx = languages.findIndex((i) => i.lang === repo.language);
					if (idx !== -1) {
						languages[idx].stars += repo.stargazers_count;
					} else {
						languages.push({
							lang: repo.language,
							stars: repo.stargazers_count,
						});
					}
				});
			setVariable(languages);
		})
		.catch((err) => console.error(err));
}

export function fetchTopLanguages(user, setVariable) {
	const languages = [];
	fetch(
		`https://api.github.com/users/${user}/repos?type=owner&sort=updated&per_page=100`
	)
		.then((res) => res.json())
		.then((data) => {
			data
				.filter((i) => i.language)
				.forEach((repo) => {
					const idx = languages.findIndex((i) => i.lang === repo.language);
					if (idx !== -1) {
						languages[idx].count += 1;
					} else {
						languages.push({
							lang: repo.language,
							count: 1,
						});
					}
				});
			setVariable(languages);
		})
		.catch((err) => console.error(err));
}
