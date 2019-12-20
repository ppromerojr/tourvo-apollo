const GET_PAGE = `
  query Page($uri: String!) {
    pageBy(uri: $uri) {
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

export default GET_PAGE
