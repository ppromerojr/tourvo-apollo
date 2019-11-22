import gql from 'graphql-tag'

const GET_PRODUCT = gql`
  query Product($slug: String!) {
    productBy(slug: $slug) {
      name
      description
      metaTags {
        description
        keywords
    }
      image {
        mediaItemUrl
        mediaDetails {
          height
          width
        }
      }
    }
  }
`

export default GET_PRODUCT
