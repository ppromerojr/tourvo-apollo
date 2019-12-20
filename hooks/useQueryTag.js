import { useQuery } from 'graphql-hooks'
import GET_TAG from '../graphql/tag.queries'

const useQueryTag = ({ first, slug }) => {
  const { data, loading, error, client, fetchMore } = useQuery(GET_TAG, {
    variables: {
      slug
    }
  })

  return { data, loading, error, client, fetchMore }
}

export default useQueryTag
