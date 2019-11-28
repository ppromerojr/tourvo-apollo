import gql from 'graphql-tag'

const GET_CATEGORIES = gql`
  query Categories($string: String, $first: Int, $slug: [String]) {
    productCategories(
      first: $first
      where: {
        nameLike: $string
        shouldOutputInFlatList: true
        hideEmpty: true
        updateTermMetaCache: true
        orderby: NAME
        slug: $slug
      }
    ) {
      edges {
        node {
          name
          slug
          id
          productCategoryId
          count
          image {
            sourceUrl(size: THUMBNAIL)
          }
        }
      }
    }
  }
`

export default GET_CATEGORIES
