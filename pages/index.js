import React, { useEffect } from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/react-hooks'

import PRODUCTS_QUERY from '../graphql/products.query'
import Nav from '../components/nav'

const Home = () => {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY)

  useEffect(() => {
    console.log('data', data)
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
      <div>This is home</div>
    </div>
  )
}

export default Home
