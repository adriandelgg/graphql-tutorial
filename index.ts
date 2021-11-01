import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema/typedefs';
import { resolvers } from './schema/resolvers';

// typeDefs are all the types & queries I define in GraphQL
// resolvers are all the functions that resolve the data
const server = new ApolloServer({
	typeDefs,
	resolvers,
	// Useful for accessing data across every request, like authentication
	context: ({ req, res }) => {
		return { name: 'Adrian', req, res };
	}
});

server
	.listen()
	.then(({ url }) => console.log(`Your API is running at: ${url}`));
