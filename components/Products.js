import React, { useEffect, memo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import Link from 'next/link'

import ErrorMessage from './ErrorMessage'

import GET_PRODUCTS from '../graphql/products.queries'
import GET_PRODUCT from '../graphql/product.queries'

const style = {
  height: 30,
  border: '1px solid green',
  margin: 6,
  padding: 8
}

export const productsQueryVars = {
  skip: 0,
  first: 10
}

function Products () {
  const { loading, error, data, fetchMore, networkStatus, client } = useQuery(
    GET_PRODUCTS,
    {
      variables: productsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true
    }
  )
  const { products } = data
  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  useEffect(
    () => {
      console.log('products', products)
    },
    [products]
  )

  if (error) return <ErrorMessage message='Error loading posts.' />
  if (loading && !loadingMorePosts) return <div>Loading</div>

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
            <div
              style={style}
              key={id}
              onMouseOver={() => {
                console.log('hover')
                client.query({
                  query: GET_PRODUCT,
                  variables: { slug: node.slug }
                })
              }}
            >
              <Link href='/product/[slug]' as={`/product/${node.slug}`}>
                <a>
                  {node.name} - {node.slug}
                </a>
              </Link>
            </div>
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

export default memo(Products)
