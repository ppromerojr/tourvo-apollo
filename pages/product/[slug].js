import React, { useEffect, memo, useState } from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'

import Nav from '../../components/nav'
import PRODUCT_QUERY from '../../graphql/product.query'

const Product = ({ router, slug }) => {
  if (!slug) return <div />

  const { data, loading, error } = useQuery(PRODUCT_QUERY, {
    variables: { slug }
  })

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
      <p>Slug: {slug}</p>
      <p>Name: {data.productBy.name}</p>
    </div>
  )
}

Product.getInitialProps = async ({ query }) => {
  return {
    slug: query.slug
  }
}

export default Product
