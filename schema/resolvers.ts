// Contains all the functions that exist in our API
// to call to our DB to decide what we want to return
import { userList } from '../FakeData';

export const resolvers = {
	Query: {
		users() {
			// Here is where you feed it the data from your DB
			return userList;
		},

		// args is an object that contains the arguments of the query
		// Even if the ID is an int, Apollo passes it in as a string.
		user: (_: any, args: any) => userList.find(({ id }) => id === +args.id)
	}
};
