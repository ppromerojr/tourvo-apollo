import { useQuery } from '@apollo/react-hooks'
import GET_CATEGORIES from '../graphql/categories.queries'

const useQueryCategories = () => {
  const { data, loading, error, client } = useQuery(GET_CATEGORIES)

  return { data, loading, error, client }
}

export default useQueryCategories
