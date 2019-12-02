import gql from 'graphql-tag'

const GET_TAG = gql`
  query Categories($slug: [String]) {
    productTags(
      first: 1
      where: { shouldOutputInFlatList: true, slug: $slug }
    ) {
      edges {
        node {
          name
          slug
          id
          termTaxonomyId
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
        }
      }
    }
  }
`

export default GET_TAG
