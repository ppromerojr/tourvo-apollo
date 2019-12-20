const GET_CATEGORY = `
  query Categories($slug: [String]) {
    productCategories(
      first: 1
      where: { shouldOutputInFlatList: true, slug: $slug }
    ) {
      edges {
        node {
          name
          slug
          id
          productCategoryId
          metaTags {
            description
            keywords
            image {
              mediaItemUrl
              mediaDetails {
                height
                width
              }
            }
          }
          image {
            mediaDetails {
              height
              width
            }
            mediaItemUrl
          }
        }
      }
    }
  }
`

export default GET_CATEGORY
