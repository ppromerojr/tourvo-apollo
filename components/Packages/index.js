import React, { useState, memo, useRef } from 'react'
import { NetworkStatus } from 'apollo-client'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ErrorMessage from '../ErrorMessage'

import GET_PRODUCT from '../../graphql/product.queries'
import useQueryProducts from '../../hooks/useQueryProducts'
import Categories from '../Categories'
import LazyImage from '../Image'

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

const defaultFilter = {
  field: 'DATE',
  order: 'ASC'
}

function Packages () {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [filter, setFilter] = useState(defaultFilter)
  const [selectedCategory, setSelectedCategory] = useState({})
  const saleRef = useRef()

  const {
    loading,
    error,
    data,
    fetchMore,
    networkStatus,
    client
  } = useQueryProducts({ slug: router ? router.query.slug : '' })
  const { products } = data

  const isFetching = networkStatus === NetworkStatus.fetchMore

  const isLoadingMorePosts = isLoadingMore && isFetching
  const isSearchingPosts = isSearching && isFetching

  if (error) return <ErrorMessage message='Error loading posts.' />
  if (loading && !isLoadingMorePosts && !isSearchingPosts) {
    return <div>Loading packages</div>
  }

  const searchPosts = ({ string, categoryId, filter }) => {
    let variables = {}
    const sale = {
      field: 'ON_SALE_TO',
      order: 'ASC'
    }

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

    if (filter.field) {
      variables = {
        ...variables,
        orderby: [filter]
      }
    }

    if (saleRef.current.checked) {
      variables = {
        ...variables,
        onSale: true
      }
    }

    console.log(variables)

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
      <div>
        <Categories
          selected={selectedCategory}
          onClick={node => {
            setSelectedCategory(node)
            searchPosts({
              string: keyword,
              categoryId: node.productCategoryId,
              filter
            })
          }}
        />
      </div>

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
                filter
              })
            }}
          />
          <select
            onChange={event => {
              const value = event.target.value
              var optionElement =
                event.target.childNodes[event.target.selectedIndex]
              const order = optionElement.getAttribute('order')
              const data = {
                field: value,
                order
              }
              setFilter(data)
              searchPosts({
                string: keyword,
                categoryId: selectedCategory.productCategoryId,
                filter: data
              })
            }}
          >
            <option value='DATE' order='ASC'>
              Newness
            </option>
            <option value='PRICE' order='ASC'>
              Cheapest first
            </option>
            <option value='PRICE' order='DESC'>
              Most expensive first
            </option>
          </select>
          <label>
            Sale
            <input
              type='checkbox'
              ref={saleRef}
              onClick={() => {
                searchPosts({
                  string: keyword,
                  categoryId: selectedCategory.productCategoryId,
                  filter
                })
              }}
            />
          </label>
        </div>
        <h1>{selectedCategory.name}</h1>
      </div>

      <div>
        <div style={{ height: 50 }}>
          {isSearchingPosts
            ? 'Searching...'
            : `${products.pageInfo.total} packages`}
        </div>

        <div>
          <div>{!products.edges.length && <div>No item found.</div>}</div>
          <div style={{ position: 'relative' }}>
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
                          <LazyImage
                            style={imgStyle}
                            src={node.image.sourceUrl}
                          />
                        </div>
                      )}
                      <div style={textStyle}>
                        <h3>{node.name}</h3>
                        {node.onSale ? (
                          <div>
                            <del>{node.regularPrice}</del>{' '}
                            <strong>{node.salePrice}</strong>
                          </div>
                        ) : (
                          <div>{node.regularPrice}</div>
                        )}
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
    </div>
  )
}

export default memo(Packages)
