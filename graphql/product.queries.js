import gql from 'graphql-tag'

const GET_PRODUCT = gql`
  query Product($slug: String!) {
    productBy(slug: $slug) {
      name
      description
    }
  }
`

export default GET_PRODUCT
