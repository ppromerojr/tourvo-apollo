import React, { memo, useState, Fragment, useRef } from 'react'
import styled from 'styled-components'
import ErrorMessage from './ErrorMessage'

import useQueryCategories from '../hooks/useQueryCategories'

const Tags = styled('div')`
  button {
    margin: 3px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    & li {
      display: inline-flex;

      & > ul {
        & li {
          display: inline-block;
        }
      }
    }
  }
`

export const postsQueryVars = {
  skip: 0,
  first: 10
}

function Categories ({ onClick, selected, onSale }) {
  const { loading, error, data, client, fetchMore } = useQueryCategories()
  const [isSearching, setIsSearching] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const searchRef = useRef()

  const searchPosts = ({ string }) => {
    let variables = {}

    if (string) {
      variables = {
        ...variables,
        string
      }
    }

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

  const renderCategory = ({ node }, index) => {
    return (
      <Fragment key={node.id}>
        <li>
          <div>
            <button
              className={`${
                selected.productCategoryId === node.productCategoryId
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                if (node.productCategoryId === selected.productCategoryId) {
                  node = {}
                }
                onClick(node)
              }}
            >
              {node.name}
            </button>
          </div>
        </li>
      </Fragment>
    )
  }

  const { productCategories } = data

  if (error) return <ErrorMessage message='Error loading posts.' />
  if (loading) return <div>Loading categories</div>

  return (
    <Tags style={{ width: '100%' }}>
      <div
        style={{
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <button
          style={{ backgroundColor: '#000' }}
          onClick={() => {
            setShowFilter(!showFilter)
          }}
        >
          Show filter
        </button>
      </div>
      {showFilter && (
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
            placeholder='Search category'
            ref={searchRef}
            onKeyUp={event => {
              const value = event.target.value
              setKeyword(value)
            }}
          />

          <Fragment>
            <button onClick={() => searchPosts({ string: keyword })}>
              Search
            </button>
            <button
              onClick={() => {
                onClick({})
                searchRef.current.value = ''
                searchPosts({ string: '' })
              }}
            >
              Clear
            </button>
          </Fragment>
        </div>
      )}

      {isSearching ? (
        <div>Searching categories</div>
      ) : (
        <Fragment>
          {productCategories.edges.length ? (
            <ul>{productCategories.edges.map(renderCategory)}</ul>
          ) : (
            <div>Not found</div>
          )}
        </Fragment>
      )}
    </Tags>
  )
}

export default memo(Categories)
