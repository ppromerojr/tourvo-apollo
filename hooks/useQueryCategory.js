import { useQuery } from 'graphql-hooks'
import GET_CATEGORY from '../graphql/category.queries'

const useQueryCategories = ({ first, slug }) => {
  const { data, loading, error, client, fetchMore } = useQuery(GET_CATEGORY, {
    variables: {
      slug
    }
  })

  return { data, loading, error, client, fetchMore }
}

export default useQueryCategories
