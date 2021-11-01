// Contains all the functions that exist in our API
// to call to our DB to decide what we want to return
import { userList, movieList } from '../FakeData';

export const resolvers = {
	Query: {
		users(parent: any, args: any, context: any, info: any) {
			// Here is where you feed it the data from your DB
			// console.log(context.req.headers);
			// Gives information about the GraphQL request, NOT the server request.
			// console.log(info);
			if (userList) return { users: userList };
			return { message: 'Adrian: There was an error!' };
		},

		// args is an object that contains the arguments of the query
		// Even if the ID is an int, Apollo passes it in as a string.
		user: (_: any, args: typeof userList[0]) =>
			userList.find(({ id }) => id === +args.id),

		movies: () => movieList,

		movie: (_: any, args: typeof movieList[0]) =>
			movieList.find(({ name }) => name === args.name)
	},
	/** You can add resolvers to specify what each field can return if
	it isn't of one of the stellar types. Instead of making it a
	type of movies we can make it a type of IDs that can get passed
	in here to list all of the users favorite movies. */
	User: {
		favoriteMovies: () => [movieList[0]]
	},

	UsersResult: {
		__resolveType(obj: any) {
			console.log(obj);
			// It must return the string with the same name as the type in the Union
			if (obj.users) return 'UsersSuccessResult';
			else if (obj.message) return 'UsersErrorResult';

			return null;
		}
	},

	Mutation: {
		createUser: (_: any, args: any) => {
			// This is where you would take the user &
			// add it to your database, then return the user
			return args.user;
		},

		updateUsername: (_: any, args: any) => {
			// Update username from DB here by finding it by
			// its ID, then return the user.
			return args.input;
		},

		deleteUser: (_: any, args: any) => {
			// When deleting, we only want to find it by its ID.
			// Grab ID, find it in the DB and delete it.
			// Return the deleted user
			return; // User
		}
	}
};
