import {
    InMemoryCache,
    ApolloClient
} from '@apollo/client';
import {
    API_URL
} from '../constants/url';

export const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
});