import { useQuery } from 'graphql-hooks'
import GET_CATEGORIES from '../graphql/categories.queries'

const useQueryCategories = ({ first, slug }) => {
  const { data, loading, error, client, fetchMore } = useQuery(GET_CATEGORIES, {
    variables: {
      first,
      slug
    }
  })

  return { data, loading, error, client, fetchMore }
}

export default useQueryCategories
