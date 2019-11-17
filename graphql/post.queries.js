import gql from 'graphql-tag'

const GET_POST = gql`
  query Post($slug: String!) {
    postBy(slug: $slug) {
      title
      content(format: RENDERED)
    }
  }
`

export default GET_POST
