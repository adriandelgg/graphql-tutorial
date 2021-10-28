import type { NextPage } from 'next';
import { useState } from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';

const QUERY_ALL_USERS = gql`
	query GetAllUsers {
		users {
			name
			id
		}
	}
`;

const QUERY_ALL_MOVIES = gql`
	query GetAllMovies {
		movies {
			name
		}
	}
`;

const GET_MOVIE_BY_NAME = gql`
	query GetMovieByName($name: String!) {
		movie(name: $name) {
			name
			yearOfPublication
		}
	}
`;

const Home: NextPage = () => {
	const [movieSelect, setMovieSelect] = useState('');
	// This fetches data when a component is rendered
	const { data, loading, error } = useQuery(QUERY_ALL_USERS);
	const [fetchMovie, { data: movieSearchedData, error: movieError }] =
		useLazyQuery(GET_MOVIE_BY_NAME);

	// Allows you to handle loading
	if (loading) {
		return <h1>Data is loading...</h1>;
	}

	// The data payload of the fetch
	if (data) {
		console.log(data);
	}

	// You can handle errors
	if (error) {
		console.log(error);
	}

	return (
		<main>
			<h1>Hello world!</h1>
			<div>
				<input
					type="text"
					name="movie"
					id="movie"
					onChange={e => setMovieSelect(e.currentTarget.value)}
				/>
				<button onClick={fetchMovie}>Fetch Movie</button>
			</div>
		</main>
	);
};

export default Home;
