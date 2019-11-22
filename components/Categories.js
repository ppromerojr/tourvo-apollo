import React, { memo } from 'react'
import styled from 'styled-components'
import ErrorMessage from './ErrorMessage'

import useQueryCategories from '../hooks/useQueryCategories'

const Tags = styled('div')`
  width: 80%;
  margin: auto;

  button {
    margin: 5px;
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

function Categories ({ onClick, selected, onClose }) {
  const { loading, error, data, client } = useQueryCategories()

  const renderCategory = ({ node }, index) => {
    if (!node.children) return

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
      <div style={{ marginTop: 50 }}>
        <button onClick={() => onClose(false)}>Close</button>
      </div>
    </Tags>
  )
}

export default memo(Categories)
