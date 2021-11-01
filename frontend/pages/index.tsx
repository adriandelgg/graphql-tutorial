import type { NextPage } from 'next';
import { useState } from 'react';
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';

const QUERY_ALL_USERS = gql`
	query GetAllUsers {
		users {
			name
			id
			username
			age
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

// ! The name of the query matters when fetching with variables!
const GET_MOVIE_BY_NAME = gql`
	query Movie($name: String!) {
		movie(name: $name) {
			name
			yearOfPublication
		}
	}
`;

// In order to DELETE, PUT, or POST
// all you do is match the mutation query you want
const CREATE_USER_MUTATION = gql`
	mutation CreateUser($input: CreateUserInput!) {
		createUser(user: $input) {
			name
			age
			nationality
		}
	}
`;

const Home: NextPage = () => {
	const [movieSelect, setMovieSelect] = useState('');
	const [user, setUser] = useState({
		name: '',
		username: '',
		age: '',
		nationality: ''
	});

	// This fetches data when a component is rendered
	const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
	const {
		data: movieData,
		loading: movieLoading,
		error: movieError
	} = useQuery(QUERY_ALL_MOVIES);

	// The 2nd parameter of useLazyQuery can be used to pass in the variable
	// Or you can pass it in to fetchMovie.
	// Make sure to handle errors and loading
	// You can tell it to refetch data by calling the refetch function
	const [fetchMovie, { data: movieSearchedData, error: moviesError }] =
		useLazyQuery(GET_MOVIE_BY_NAME);

	const [createUser, { data: userCreated }] = useMutation(CREATE_USER_MUTATION);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.currentTarget;
		setUser(prev => ({ ...prev, [name]: value }));
		console.log(user);
	}

	if (userCreated) {
		console.log(userCreated);
	}

	if (data) {
		console.log(data);
	}

	return (
		<main>
			<div className="flex flex-col">
				<input
					type="text"
					name="name"
					id="name"
					value={user.name}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="username"
					id="username"
					value={user.username}
					onChange={handleChange}
				/>
				<input
					type="number"
					name="age"
					id="age"
					value={user.age}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="nationality"
					id="nationality"
					value={user.nationality}
					onChange={e =>
						setUser(prev => ({
							...prev,
							nationality: e.target.value.toUpperCase()
						}))
					}
				/>
				<button
					onClick={() => {
						createUser({ variables: { input: { ...user, age: +user.age } } });
						refetch();
					}}
				>
					Create User
				</button>
			</div>
			<div>
				<input
					type="text"
					name="movie"
					id="movie"
					onChange={e => setMovieSelect(e.currentTarget.value)}
				/>
				<button
					onClick={() => fetchMovie({ variables: { name: movieSelect } })}
				>
					Fetch Movie
				</button>
				{data &&
					data.users.map(({ name, username, id, age }: any) => (
						<div key={id}>
							<p>{name}</p>
							<p>{username}</p>
							<p>{id}</p>
							<p>{age}</p>
						</div>
					))}
				<div>
					{movieSearchedData && (
						<div>
							<h1>MovieName: {movieSearchedData.movie.name}</h1>
						</div>
					)}
				</div>
				{moviesError && <h1>There was an error fetching the data.</h1>}
			</div>
		</main>
	);
};

export default Home;
