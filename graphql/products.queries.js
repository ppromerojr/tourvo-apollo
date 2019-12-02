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
    $tagIn: [String]
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
        tagIn: $tagIn
      }
    ) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
        total
      }
      edges {
        cursor
        node {
          name
          sku
          status
          slug
          image {
            sourceUrl(size: WOOCOMMERCE_SINGLE)
          }
          tags {
            edges {
              node {
                name
                id
                slug
              }
            }
          }
          shortDescription(format: RENDERED)
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
