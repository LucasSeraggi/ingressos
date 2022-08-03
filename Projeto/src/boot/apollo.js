import Vur from "vue";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";
import { exportFile } from "quasar";

const BASE_PATH = "";

const STAGE_URL = "";

const httpLink = new HttpLink({ uri: "" })

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,

});


export default ({ app }) => {
    app.use(apolloProvider);
}