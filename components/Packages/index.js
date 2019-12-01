import React, { useState, memo, useEffect } from 'react'
import { NetworkStatus } from 'apollo-client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import ErrorMessage from '../ErrorMessage'

import GET_PRODUCT from '../../graphql/product.queries'
import useQueryProducts from '../../hooks/useQueryProducts'
import Lazy from '../Image'
// import Placeholder from '../Placeholder'

const Placeholder = dynamic(import('../Placeholder'))

const style = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
  flexBasis: '100%',
  flex: 1,
  marginBottom: 20
}

const textStyle = {
  padding: 10
}

function Packages ({ keyword, onSale, filter }) {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const {
    loading,
    error,
    data,
    fetchMore,
    networkStatus,
    client
  } = useQueryProducts({
    slug: router ? router.query.slug : '',
    onSale,
    filter
  })

  useEffect(
    () => {
      if (!loading) {
        if (keyword || onSale != null || filter != null) {
          searchPosts({
            string: keyword,
            filter,
            onSale
          })
        }
      }
    },
    [keyword, onSale, filter]
  )

  const { products } = data

  const isFetching = networkStatus === NetworkStatus.fetchMore

  const isLoadingMorePosts = isLoadingMore && isFetching
  const isSearchingPosts = isSearching && isFetching

  if (error) return <ErrorMessage message='Error loading posts.' />
  if (loading && !isLoadingMorePosts && !isSearchingPosts) {
    return <Placeholder rows={10} />
  }

  const searchPosts = ({ string, filter, onSale }) => {
    let variables = { onSale }

    if (string) {
      variables = {
        ...variables,
        string
      }
    }

    if (filter && filter.field) {
      variables = {
        ...variables,
        orderby: [filter]
      }
    }

    console.log(variables)

    setIsSearching(true)

    fetchMore({
      variables: variables,
      updateQuery: (previousResult, { fetchMoreResult }) => {
        setIsSearching(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        if (!fetchMoreResult) {
          return previousResult
        }

        return fetchMoreResult
      }
    })
  }

  const fetchMoreData = () => {
    let variables = {
      after: products.pageInfo.endCursor,
      onSale
    }

    if (keyword) {
      variables = {
        ...variables,
        string: keyword
      }
    }

    if (filter && filter.field) {
      variables = {
        ...variables,
        orderby: [filter]
      }
    }

    console.log('fetch More', variables)

    setIsLoadingMore(true)

    fetchMore({
      variables,
      updateQuery: (previousResult, { fetchMoreResult }) => {
        setIsLoadingMore(false)
        if (!fetchMoreResult) return previousResult

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
      <div>{!products.edges.length && <div>No item found.</div>}</div>

      <div>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: ' 100%'
          }}
        >
          {isSearchingPosts && (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: ` rgba(255, 255, 255, 0.6)`
              }}
            />
          )}
          {products.edges.map(({ node }, id) => {
            return (
              <Link
                key={id}
                href='/travel-tours/packages/[slug]'
                as={`/travel-tours/packages/${node.slug}`}
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
                        <Lazy>
                          <img
                            width='100%'
                            height='300'
                            alt={node.name}
                            style={{ display: 'block', objectFit: 'cover' }}
                            src={node.image.sourceUrl}
                          />
                        </Lazy>
                      </div>
                    )}
                    <div style={{ ...textStyle }}>
                      <h3 style={{ margin: 0, marginBottom: 10 }}>
                        {node.name}
                      </h3>

                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        {node.onSale ? (
                          <div>
                            <del>{node.regularPrice}</del>{' '}
                            <strong>{node.salePrice}</strong>
                          </div>
                        ) : (
                          <div>{node.regularPrice}</div>
                        )}
                        <div />
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            )
          })}
          <div>
            {products.pageInfo.hasNextPage && (
              <button onClick={fetchMoreData}>
                {isLoadingMorePosts ? 'Loading...' : 'Show More'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Packages)
