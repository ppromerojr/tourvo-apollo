import { useQuery } from '@apollo/react-hooks'
import GET_PRODUCTS from '../graphql/products.queries'

const useQueryProducts = ({ slug }) => {
  const { loading, error, data, fetchMore, networkStatus, client } = useQuery(
    GET_PRODUCTS,
    {
      variables: {
        category: slug,
        first: 3,
        orderby: [
          {
            field: 'DATE',
            order: 'DESC'
          }
        ]
      },
      notifyOnNetworkStatusChange: true
    }
  )

  return { loading, error, data, fetchMore, networkStatus, client }
}

export default useQueryProducts
