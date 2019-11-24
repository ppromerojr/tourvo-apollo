import React, { memo, useState, Fragment } from 'react'
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

  const searchPosts = ({ string }) => {
    if (string.length <= 0) {
      onClick({})
    }
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
              {node.name} {!onSale && `(${node.count})`}
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
    <Tags>
      <input
        type='search'
        placeholder='Search category'
        onBlur={event => {
          const value = event.target.value
          setKeyword(value)
          searchPosts({ string: value })
        }}
        defaultValue={keyword}
      />
      {isSearching && <div>Searching categories</div>}

      <ul>{productCategories.edges.map(renderCategory)}</ul>
    </Tags>
  )
}

export default memo(Categories)
