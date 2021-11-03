// gql allows us to write pure GraphQL code and transpile to JS
import { gql } from 'apollo-server-express';

// Where we write our schema
// Best practice for enums to have all cap letters. It's case sensitive!
export const typeDefs = gql`
	type Query {
		users: [User!]!
		user(id: ID!): User
		movies: [Movie!]!
		movie(name: String!): Movie!
	}

	type Mutation {
		createUser(user: CreateUserInput!): User!
		updateUsername(input: UpdateUsernameInput!): User!
		deleteUser(id: ID!): User
		createMovie(movie: CreateMovieInput!): Movie!
		updateMovie(input: UpdateMovieInput!): Movie!
	}

	input CreateUserInput {
		name: String!
		username: String!
		age: Int!
		nationality: Nationality = USA
	}

	input UpdateUsernameInput {
		id: ID!
		username: String!
	}

	input CreateMovieInput {
		name: String!
		yearOfPublication: Int!
		isInTheaters: Boolean!
	}

	input UpdateMovieInput {
		id: ID!
		name: String
		yearOfPublication: Int
		isInTheaters: Boolean
	}

	type User {
		id: ID!
		name: String!
		username: String!
		age: Int!
		nationality: Nationality!
		friends: [User]
		favoriteMovies: [Movie]
	}

	type Movie {
		id: ID!
		name: String!
		yearOfPublication: Int!
		isInTheaters: Boolean!
	}

	enum Nationality {
		MEXICO
		BRAZIL
		PERU
		USA
		CANADA
	}
`;
