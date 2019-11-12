import React, { useEffect, memo } from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'

import PRODUCTS_QUERY from '../graphql/products.query'
import Nav from '../components/nav'

const Products = () => {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY)

  useEffect(() => {
    // console.log('data', data)
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Nav />
      <ul>
        {data.products.nodes.map(product => {
          return (
            <li key={`job__${product.id}`}>
              <Link href='/product/[slug]' as={`/product/${product.slug}`}>
                <a>{product.name}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default memo(Products)
