import { useQuery } from '@apollo/react-hooks'
import GET_POST from '../graphql/post.queries'

const useQueryPost = ({ slug }) => {
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { slug }
  })

  return { data, loading, error }
}

export default useQueryPost
