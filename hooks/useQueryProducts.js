import { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import GET_PRODUCTS from '../graphql/products.queries'

const defaultFilter = [
  {
    field: 'DATE',
    order: 'DESC'
  }
]

const useQueryProducts = ({ slug, onSale, filter }) => {
  const { loading, error, data, fetchMore, networkStatus, client } = useQuery(
    GET_PRODUCTS,
    {
      variables: {
        onSale,
        category: slug,
        first: 6,
        orderby: filter ? [filter] : defaultFilter
      },
      notifyOnNetworkStatusChange: true
    }
  )

  useEffect(
    () => {
      console.log('slug', slug)
    },
    [slug]
  )

  return { loading, error, data, fetchMore, networkStatus, client }
}

export default useQueryProducts
