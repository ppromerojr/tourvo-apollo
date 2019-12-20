import { useQuery } from 'graphql-hooks'
import GET_PRODUCT from '../graphql/product.queries'

const useQueryProduct = ({ slug }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { slug }
  })

  return { data, loading, error }
}

export default useQueryProduct
