import gql from 'graphql-tag'

const GET_CATEGORIES = gql`
  query Categories($string: String) {
    productCategories(
      first: 50
      where: {
        nameLike: $string
        shouldOutputInFlatList: true
        hideEmpty: true
        updateTermMetaCache: true
        orderby: NAME
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
