// gql allows us to write pure GraphQL code and transpile to JS
import { gql } from 'apollo-server';

// Where we write our schema
export const typeDefs = gql`
	type Query {
		users: [User!]!
		user(id: ID!): User
		movies: [Movie!]!
		movie(name: String!): Movie!
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
	}
`;

// Best practice for enums to have cap letters. It's case sensitive!
