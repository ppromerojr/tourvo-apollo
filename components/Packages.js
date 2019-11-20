import React, { useState, memo, useRef } from 'react'
import { NetworkStatus } from 'apollo-client'
import Link from 'next/link'

import ErrorMessage from './ErrorMessage'

import GET_PRODUCT from '../graphql/product.queries'
import useQueryProducts from '../hooks/useQueryProducts'
import Categories from './Categories'

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

function Packages () {
  const [keyword, setKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [filters, setFilters] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({})
  const {
    loading,
    error,
    data,
    fetchMore,
    networkStatus,
    client
  } = useQueryProducts()
  const { products } = data

  const isFetching = networkStatus === NetworkStatus.fetchMore

  const isLoadingMorePosts = isLoadingMore && isFetching
  const isSearchingPosts = isSearching && isFetching

  if (error) return <ErrorMessage message='Error loading posts.' />
  if (loading && !isLoadingMorePosts && !isSearchingPosts) {
    return <div>Loading Packages page...</div>
  }

  const searchPosts = ({ string, categoryId, filters }) => {
    let variables = {}

    if (categoryId) {
      variables = {
        ...variables,
        categoryId
      }
    }

    if (string) {
      variables = {
        ...variables,
        string
      }
    }

    if (filters.length) {
      variables = {
        ...variables,
        orderby: [...filters]
      }
    }

    // if category page
    // if (router) {
    //   variables = {
    //     ...variables,
    //     category: router.query.slug
    //   }
    // }

    console.log(variables, filters)

    setIsSearching(true)

    fetchMore({
      variables: variables,
      updateQuery: (previousResult, { fetchMoreResult }) => {
        setIsSearching(false)
        if (!fetchMoreResult) {
          return previousResult
        }

        return fetchMoreResult
      }
    })
  }

  const fetchMoreData = () => {
    setIsLoadingMore(true)

    fetchMore({
      variables: {
        after: products.pageInfo.endCursor,
        string: keyword,
        categoryId: selectedCategory.categoryId
      },
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
      <Categories
        onClick={node => {
          console.log(node)
          setSelectedCategory(node)
          searchPosts({
            string: keyword,
            categoryId: node.productCategoryId,
            filters
          })
        }}
      />

      <div>
        <div>
          Search:{' '}
          <input
            type='search'
            placeholder='Search package'
            defaultValue={keyword}
            onBlur={event => {
              setKeyword(event.target.value)
              searchPosts({
                string: event.target.value,
                categoryId: selectedCategory.productCategoryId,
                filters
              })
            }}
          />
          Sort By
          <select
            onChange={event => {
              const orderBy = {
                field: event.target.value,
                order: 'ASC'
              }

              setFilters([...filters, orderBy])
              searchPosts({
                filters: [...filters, orderBy],
                string: keyword,
                categoryId: selectedCategory.productCategoryId
              })
            }}
          >
            <option />
            <option value='DATE'>Date - ASC</option>
          </select>
        </div>
        <h1>{selectedCategory.name}</h1>
      </div>

      <div>
        {!isSearchingPosts && (
          <div>
            <div>{!products.edges.length && <div>No item found.</div>}</div>
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
                          {node.name} - {node.slug} - {node.price}
                        </div>
                      </div>
                    </a>
                  </Link>
                )
              })}
            </div>
            <div>
              {products.pageInfo.hasNextPage && (
                <button onClick={fetchMoreData}>
                  {isLoadingMorePosts ? 'Loading...' : 'Show More'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div>{isSearchingPosts && 'Searching...'}</div>
    </div>
  )
}

export default memo(Packages)
