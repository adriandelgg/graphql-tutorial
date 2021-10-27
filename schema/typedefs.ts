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

	type Mutation {
		createUser(user: CreateUserInput!): User!
		updateUsername(input: UpdateUsernameInput!): User!
		deleteUser(id: ID!): User
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
	}
`;

// Best practice for enums to have cap letters. It's case sensitive!
