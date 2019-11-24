import { useQuery } from '@apollo/react-hooks'
import GET_CATEGORIES from '../graphql/categories.queries'

const useQueryCategories = () => {
  const { data, loading, error, client, fetchMore } = useQuery(GET_CATEGORIES, {
    variables: {}
  })

  return { data, loading, error, client, fetchMore }
}

export default useQueryCategories
