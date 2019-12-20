const GET_CATEGORIES = `
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
