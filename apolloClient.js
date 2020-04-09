import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

export default function createApolloClient(initialState, ctx) {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
        link: new HttpLink({
            uri: process.env.GRAPHQL_URL,
            credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
            fetch
        }),
        cache: new InMemoryCache().restore(initialState)
    })
}
