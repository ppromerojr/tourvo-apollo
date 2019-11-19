import gql from 'graphql-tag'

const GET_PRODUCT = gql`
  query Product($slug: String!) {
    productBy(slug: $slug) {
      name
      description
      image {
        sourceUrl(size: THUMBNAIL)
      }
    }
  }
`

export default GET_PRODUCT
