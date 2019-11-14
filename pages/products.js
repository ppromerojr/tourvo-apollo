import React, { useEffect, memo, useState } from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'
import { Button } from 'antd'
import { Pagination } from 'antd'

import PRODUCTS_QUERY from '../graphql/products.query'
import Nav from '../components/nav'

const Products = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [total, setTotalPages] = useState(0)
  const { data, loading, error, fetchMore, endCursor } = useQuery(
    PRODUCTS_QUERY,
    {
      variables: {
        first: 2
      }
    }
  )

  useEffect(
    () => {
      console.log('data', data)
    },
    [data]
  )

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>
  }

  useEffect(() => {
    setTotalPages(data.products.pageInfo.total)
  }, [])

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Nav />
      <ul>
        {data.products.edges.map(product => {
          return (
            <li key={`job__${product.node.id}`}>
              <Link href='/product/[slug]' as={`/product/${product.node.slug}`}>
                <a>{product.node.name}</a>
              </Link>
            </li>
          )
        })}
      </ul>
      <Pagination
        onChange={(page, size) => {
          let variables = {}
          console.log(page, currentIndex)

          if (page < currentIndex) {
            variables = {
              last: page,
              before: data.products.pageInfo.startCursor
            }
          } else {
            variables = {
              after: data.products.pageInfo.endCursor
            }
          }

          setCurrentIndex(page)

          return fetchMore({
            variables,
            updateQuery: (prev, { fetchMoreResult }) => {
              console.log(
                'fetchMoreResult',
                data.products.pageInfo.endCursor
                // prev.products.edges.map(v => console.log(v.node.name)),
                // fetchMoreResult.products.edges.map(v =>
                //   console.log(v.node.name)
                // )
              )

              return fetchMoreResult
            }
          })
        }}
        defaultPageSize={2}
        total={total}
      />
    </div>
  )
}

export default memo(Products)
