import gql from 'graphql-tag'

const GET_CATEGORIES = gql`
  query Categories($string: String) {
    productCategories(
      first: 200
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
        }
      }
    }
  }
`

export default GET_CATEGORIES
