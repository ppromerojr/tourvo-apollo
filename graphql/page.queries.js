import gql from 'graphql-tag'

const GET_PAGE = gql`
  query Page($uri: String!) {
    pageBy(uri: $uri) {
      id
      slug
      title
      featuredImage {
        mediaItemUrl
        mediaDetails {
          height
          width
        }
        title
      }
    }
  }
`

export default GET_PAGE
