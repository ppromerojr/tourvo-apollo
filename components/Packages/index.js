import React, { Fragment, useState, memo, useRef, useEffect } from 'react'
import { NetworkStatus } from 'apollo-client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Input, Spin, Affix, Select } from 'antd'

import ErrorMessage from '../ErrorMessage'

import GET_PRODUCT from '../../graphql/product.queries'
import useQueryProducts from '../../hooks/useQueryProducts'
import Categories from '../Categories'
import Body from '../Body'
import Lazy from '../Image'
import Placeholder from '../Placeholder'

const { Search } = Input
const { Option } = Select

const Description = styled('div')`
  ul {
    margin: 0;
  }
`

const style = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
  flexBasis: '100%',
  flex: 1,
  marginBottom: 20
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

  const [isSticky, setSticky] = useState(false)
  const stickyRef = useRef(null)

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
        window.scrollTo({ top: 0, behavior: 'smooth' })
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
        <h1 style={{ textAlign: 'center' }}>Packages</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            width: '100%'
          }}
        >
          <Affix style={{ width: '100%' }} offsetTop={0}>
            <Search
              placeholder='Search for Hotel, City or Location'
              onSearch={value => {
                setKeyword(value)
                searchPosts({
                  string: value,
                  categoryId: selectedCategory.productCategoryId,
                  filter
                })
              }}
              size='large'
              style={{ width: '100%' }}
            />
          </Affix>
        </div>

        <div
          style={{
            width: '100%',
            overflow: 'scroll'
          }}
        >
          <Categories
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
        </div>
      </div>

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
                <Spin />
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
                <div
                  key={id}
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
                    <h3 style={{ margin: 0, marginBottom: 10 }}>{node.name}</h3>

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
                          href='/travel-tours/packages/[slug]'
                          as={`/travel-tours/packages/${node.slug}`}
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
