const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const fetch = require("node-fetch");

require("dotenv").config();

//graphql server

//types query/mutation/subscription
const typeDefs = `
type Light {
    visible: Int
    full: Int
    value: Int
  }

  type Accelerometer {
    roll: Int
    pitch: Int
    yaw: Int
  }

  type Atom {
    illuminance: [Light]
    acceleration: [Accelerometer]
  }

  type Query {
    currentData: [Atom]
  }
`;

//resolvers
const resolvers = {
  Query: {
    currentData: async () => {
      const response = await fetch(process.env.ATOM);
      const data = await response.json();
      return data;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

apolloServer.listen(process.env.PORT, () => {
  console.log(
    `🚀 GRAPHQL Server is running at ${process.env.URL}${process.env.PORT}`
  );
});
