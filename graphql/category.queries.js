import gql from 'graphql-tag'

const GET_CATEGORY = gql`
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
          }
          image {
            sourceUrl(size: THUMBNAIL)
          }
        }
      }
    }
  }
`

export default GET_CATEGORY
