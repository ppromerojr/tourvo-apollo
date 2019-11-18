import gql from 'graphql-tag'

const GET_PRODUCTS = gql`
  query Products($first: Int, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          name
          slug
          id
          description
          date
          image {
            sourceUrl(size: THUMBNAIL)
          }
        }
      }
    }
  }
`

export default GET_PRODUCTS
