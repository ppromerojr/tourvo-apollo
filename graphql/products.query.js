import gql from 'graphql-tag'

const PRODUCTS_QUERY = gql`
  query Products {
    products {
      nodes {
        id
        name
        slug
        image {
          mediaItemUrl
        }
        galleryImages {
          nodes {
            mediaItemUrl
            title
          }
        }
      }
    }
  }
`

export default PRODUCTS_QUERY
