import { useQuery } from 'graphql-hooks'
import GET_PAGE from '../graphql/page.queries'

const useQueryPage = ({ slug }) => {
  const { data, loading, error } = useQuery(GET_PAGE, {
    variables: { uri: slug },
    ssr: true
  })

  return { data, loading, error }
}

export default useQueryPage
