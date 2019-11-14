import gql from 'graphql-tag'

const PRODUCTS_QUERY = gql`
  query Products($first: Int, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
        total
      }
      edges {
        cursor
        node {
          name
          slug
          id
          description
          date
        }
      }
    }
  }
`

export default PRODUCTS_QUERY
