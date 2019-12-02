import { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import GET_PRODUCTS from '../graphql/products.queries'

const defaultFilter = [
  {
    field: 'DATE',
    order: 'DESC'
  }
]

const useQueryProducts = ({ slug, onSale, filter, tagSlug }) => {
  const { loading, error, data, fetchMore, networkStatus, client } = useQuery(
    GET_PRODUCTS,
    {
      variables: {
        onSale,
        category: slug,
        tagIn: tagSlug || [],
        first: 4,
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
