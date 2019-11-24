import React, { Fragment, useState, memo, useRef } from 'react'
import { NetworkStatus } from 'apollo-client'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ErrorMessage from '../ErrorMessage'

import GET_PRODUCT from '../../graphql/product.queries'
import useQueryProducts from '../../hooks/useQueryProducts'
import Categories from '../Categories'
import LazyImage from '../Image'
import Body from '../Body'

const style = {
  padding: 0,
  display: 'flex',
  marginBottom: 20,
  boxShadow: `1px 1px 11px 6px rgba(204, 204, 204, 0.48)`
}

const imgStyle = {
  display: 'block'
}

const textStyle = {
  padding: 10
}

const defaultFilter = {
  field: 'DATE',
  order: 'DESC'
}

function Packages () {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [filter, setFilter] = useState(defaultFilter)
  const [selectedCategory, setSelectedCategory] = useState({})
  const [isModalOpen, setModal] = useState(false)
  const saleRef = useRef()
  const searchRef = useRef()

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
    console.log(selectedCategory)
    let variables = {
      after: products.pageInfo.endCursor,
      categoryId: selectedCategory.productCategoryId
    }

    if (keyword) {
      variables = {
        ...variables,
        string: keyword
      }
    }

    if (saleRef.current.checked) {
      variables = {
        ...variables,
        onSale: true
      }
    }

    if (filter.field) {
      variables = {
        ...variables,
        orderby: [filter]
      }
    }

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
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20
          }}
        >
          <input
            type='text'
            placeholder='Search package'
            defaultValue={keyword}
            ref={searchRef}
            onKeyUp={event => {
              setKeyword(event.target.value)
            }}
          />

          <Fragment>
            <button
              style={{ margin: 3 }}
              onClick={() => {
                searchPosts({
                  string: keyword,
                  categoryId: selectedCategory.productCategoryId,
                  filter
                })
              }}
            >
              Search
            </button>
            <button
              style={{ margin: 3 }}
              onClick={() => {
                setKeyword('')
                searchRef.current.value = ''
                searchPosts({
                  string: '',
                  categoryId: selectedCategory.productCategoryId,
                  filter
                })
              }}
            >
              Clear
            </button>
          </Fragment>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ marginRight: 10 }}>
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
          <div>
            <button
              onClick={() => {
                setModal(!isModalOpen)
              }}
            >
              {!isModalOpen ? 'Filter' : 'Close'}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          style={{
            width: 'auto',
            padding: 20,
            border: '1px solid #EEE',
            borderRadius: 23,
            margin: 20
          }}
        >
          <div
            style={{ display: 'flex', height: '100%', alignItems: 'center' }}
          >
            <Categories
              onSale={saleRef.current.checked}
              onClose={setModal}
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
        </div>
      )}

      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0'
          }}
        >
          <div>
            <div>
              {isSearchingPosts ? (
                <div className='lds-ripple'>
                  <div />
                  <div />
                </div>
              ) : (
                <h2 style={{ margin: 0, padding: 0 }}>
                  {selectedCategory.name}
                </h2>
              )}
            </div>
          </div>
          <div>
            <div style={{ marginBottom: 2, fontSize: 12, textAlign: 'right' }}>
              Sort by:
            </div>
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
              <option value='DATE' order='DESC'>
                Date
              </option>
              <option value='PRICE' order='ASC'>
                Cheapest first
              </option>
              <option value='PRICE' order='DESC'>
                Most expensive first
              </option>
            </select>
          </div>
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
                <div
                  key={id}
                  style={style}
                  //   onMouseOver={() => {
                  //     client.query({
                  //       query: GET_PRODUCT,
                  //       variables: { slug: node.slug }
                  //     })
                  //   }}
                >
                  {node.image && (
                    <div>
                      <LazyImage style={imgStyle} src={node.image.sourceUrl} />
                    </div>
                  )}
                  <div style={{ ...textStyle, flexGrow: 1 }}>
                    <h3>{node.name}</h3>
                    {/* <Body>{node.shortDescription}</Body> */}
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
                      <div>
                        <Link
                          key={id}
                          href='/packages/[slug]'
                          as={`/packages/${node.slug}`}
                        >
                          <a>Read More</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
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
