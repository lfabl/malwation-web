import {
    InMemoryCache,
    ApolloClient
} from '@apollo/client';
import {
    API_URL
} from '../constants/url';

export let client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
});
export const setClient = (newClient) => {
    client = newClient;
};