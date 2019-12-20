import { useEffect } from 'react'
import { useQuery } from 'graphql-hooks'

import GET_POST from '../graphql/post.queries'

const Post = ({ slug }) => {
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { slug }
  })

  if (loading) {
    return <p>Loading...</p>
  }

  const { postBy: item } = data

  return (
    <div>
      <h1>{item.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: item.content }} />
    </div>
  )
}

export default Post
