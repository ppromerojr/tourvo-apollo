import gql from 'graphql-tag'

const GET_PRODUCTS = gql`
  query Products(
    $first: Int
    $after: String
    $string: String
    $categoryId: Int
    $category: String
    $orderby: [ProductsOrderbyInput]
  ) {
    products(
      first: $first
      after: $after
      where: {
        search: $string
        categoryId: $categoryId
        category: $category
        orderby: $orderby
      }
    ) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          name
          slug
          id
          description
          date
          image {
            sourceUrl(size: THUMBNAIL)
          }
        }
      }
    }
  }
`

export default GET_PRODUCTS
