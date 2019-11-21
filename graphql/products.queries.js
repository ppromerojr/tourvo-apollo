import gql from 'graphql-tag'

const GET_PRODUCTS = gql`
  query Products(
    $first: Int
    $after: String
    $string: String
    $categoryId: Int
    $category: String
    $orderby: [ProductsOrderbyInput]
    $onSale: Boolean
  ) {
    products(
      first: $first
      after: $after
      where: {
        search: $string
        categoryId: $categoryId
        category: $category
        orderby: $orderby
        status: "publish"
        onSale: $onSale
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
          sku
          status
          slug
          image {
            sourceUrl(size: THUMBNAIL)
          }
          ... on SimpleProduct {
            id
            name
            onSale
            salePrice(format: FORMATTED)
            regularPrice(format: FORMATTED)
          }
        }
      }
    }
  }
`

export default GET_PRODUCTS
