import React, { useEffect, memo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'
 
import ErrorMessage from './ErrorMessage'

import GET_CATEGORIES from '../graphql/categories.queries'
import useQueryCategories from '../hooks/useQueryCategories'

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

function Categories ({ onClick }) {
  const { loading, error, data, client } = useQueryCategories()

  const renderCategory = ({ node }, index) => {
    return (
      <li key={node.id}>
        <div
          onClick={() => {
            onClick(node)
          }}
        >
          {node.name}
        </div>
        {node.children && <ul>{node.children.edges.map(renderCategory)}</ul>}
      </li>
    )
  }

  const { productCategories } = data

  if (error) return <ErrorMessage message='Error loading posts.' />
  if (loading) return <div>Loading posts...</div>

  return (
    <div>
      <ul>{productCategories.edges.map(renderCategory)}</ul>
    </div>
  )
}

export default memo(Categories)
