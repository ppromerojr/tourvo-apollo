import { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'

import GET_PRODUCT from '../graphql/product.queries'

const Product = ({ slug }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { slug }
  })

  useEffect(
    () => {
      console.log('product', data)
    },
    [data]
  )

  if (loading) {
    return <p>Loading...</p>
  }

  const { productBy: item } = data

  return (
    <div>
      <div>slug: {slug}</div>
      <div>Name: {item.name}</div>
      <div dangerouslySetInnerHTML={{ __html: item.description }} />
    </div>
  )
}

export default Product
