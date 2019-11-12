import gql from 'graphql-tag'

const PRODUCT_QUERY = gql`
  query Product($slug: String!) {
    productBy(slug: $slug) {
      name
    }
  }
`

export default PRODUCT_QUERY
