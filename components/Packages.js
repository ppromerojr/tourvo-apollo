import React, { useEffect, memo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import Link from 'next/link'

import ErrorMessage from './ErrorMessage'

import GET_PRODUCTS from '../graphql/products.queries'
import GET_PRODUCT from '../graphql/product.queries'

const style = {
  border: '1px solid green',
  padding: 0,
  display: 'flex',
  marginBottom: 20,
  alignItems: 'center'
}

const imgStyle = {
  display: 'block'
}

const textStyle = {
  padding: 10
}

export const productsQueryVars = {
  skip: 0,
  first: 10
}

function Packages () {
  const { loading, error, data, fetchMore, networkStatus, client } = useQuery(
    GET_PRODUCTS,
    {
      variables: productsQueryVars,
      notifyOnNetworkStatusChange: true
    }
  )
  const { products } = data
  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  if (error) return <ErrorMessage message='Error loading posts.' />
  if (loading && !loadingMorePosts) return <div>Loading...</div>

  const fetchMoreData = () => {
    fetchMore({
      variables: {
        after: products.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }

        return Object.assign({}, previousResult, {
          products: {
            __typename: previousResult.products.__typename,
            edges: [
              ...previousResult.products.edges,
              ...fetchMoreResult.products.edges
            ],
            pageInfo: fetchMoreResult.products.pageInfo
          }
        })
      }
    })
  }

  return (
    <div>
      <div>
        {products.edges.map(({ node }, id) => {
          return (
            <Link
              key={id}
              href='/packages/[slug]'
              as={`/packages/${node.slug}`}
            >
              <a>
                <div
                  style={style}
                  onMouseOver={() => {
                    client.query({
                      query: GET_PRODUCT,
                      variables: { slug: node.slug }
                    })
                  }}
                >
                  {node.image && (
                    <div>
                      <img style={imgStyle} src={node.image.sourceUrl} />
                    </div>
                  )}
                  <div style={textStyle}>
                    {node.name} - {node.slug}
                  </div>
                </div>
              </a>
            </Link>
          )
        })}
      </div>
      {products.pageInfo.hasNextPage && (
        <button onClick={fetchMoreData}>
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </button>
      )}
    </div>
  )
}

export default memo(Packages)
