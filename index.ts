import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema/typedefs';
import { resolvers } from './schema/resolvers';

// typeDefs are all the types & queries I define in GraphQL
// resolvers are all the functions that resolve the data
const server = new ApolloServer({ typeDefs, resolvers });

server
	.listen()
	.then(({ url }) => console.log(`Your API is running at: ${url}`));
