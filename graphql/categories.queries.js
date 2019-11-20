import gql from 'graphql-tag'

const GET_CATEGORIES = gql`
  query Categories {
    productCategories {
      edges {
        node {
          name
          slug
          id
          productCategoryId
          children {
            edges {
              node {
                name
                slug
                id
                productCategoryId
                children {
                  edges {
                    node {
                      name
                      slug
                      id
                      productCategoryId
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default GET_CATEGORIES
