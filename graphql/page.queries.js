import gql from 'graphql-tag'

const GET_PAGE = gql`
  query Product($uri: String!) {
    pageBy(uri: $uri) {
      slug
      content(format: RENDERED)
      date
    }
  }
`

export default GET_PAGE
