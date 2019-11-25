import gql from 'graphql-tag'

const GET_PRODUCT = gql`
  query Product($slug: String!) {
    productBy(slug: $slug) {
      id
      onSale
      image {
        mediaItemUrl
        mediaDetails {
          height
          width
        }
      }
      ... on SimpleProduct {
        id
        name
        regularPrice(format: FORMATTED)
        salePrice(format: FORMATTED)
      }
      description(format: RENDERED)
      slug
      shortDescription(format: RENDERED)
      catalogVisibility
      name
      travel {
        travelCode
        travelValidity
      }
      package {
        departureDates
        optionalTour
        otherHotels
        packageItinerary
        remarks
        termsOfPayment
      }
      related {
        edges {
          node {
            name
            slug
            id
            ... on SimpleProduct {
              id
              onSale
              regularPrice(format: FORMATTED)
              salePrice(format: FORMATTED)
              image {
                sourceUrl(size: MEDIUM)
              }
            }
          }
        }
      }
      metaTags {
        description
        keywords
      }
    }
  }
`

export default GET_PRODUCT
