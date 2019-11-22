import React, { memo } from 'react'
import styled from 'styled-components'
import ErrorMessage from './ErrorMessage'

import useQueryCategories from '../hooks/useQueryCategories'

const Tags = styled('div')`
  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    & li {
      margin: 5px 0;

      & > ul {
        margin-left: 20px;
        & li {
          display: inline-block;
          margin-right: 5px;
        }
      }
    }
  }
`

const style = {
  height: 30,
  border: '1px solid green',
  margin: 6,
  padding: 8
}

export const postsQueryVars = {
  skip: 0,
  first: 10
}

function Categories ({ onClick, selected }) {
  const { loading, error, data, client } = useQueryCategories()

  const renderCategory = ({ node }, index) => {
    if (!node.children) return
    // console.log(node.children)
    // if (!node.children && !node.children.edges) return null

    return (
      <li key={node.id}>
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
        {node.children.edges.length ? (
          <ul>{node.children.edges.map(renderCategory)}</ul>
        ) : null}
      </li>
    )
  }

  const { productCategories } = data

  if (error) return <ErrorMessage message='Error loading posts.' />
  if (loading) return <div>Loading categories</div>

  return (
    <Tags>
      <ul>{productCategories.edges.map(renderCategory)}</ul>
    </Tags>
  )
}

export default memo(Categories)
