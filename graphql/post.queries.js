import gql from 'graphql-tag'

const GET_POST = gql`
  query Post($slug: String!) {
    postBy(slug: $slug) {
      id
      slug
      title
      content(format: RENDERED)
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
      featuredImage {
        mediaItemUrl
        mediaDetails {
          height
          width
        }
        title
      }
    }
  }
`

export default GET_POST
