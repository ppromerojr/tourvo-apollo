import gql from 'graphql-tag'

const GET_POSTS = gql`
  query Posts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          title
          slug
          id
          excerpt
           featuredImage {
          sourceUrl(size: THUMBNAIL)
        }
        }
      }
    }
  }
`

export default GET_POSTS
