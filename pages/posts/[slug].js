import { Fragment } from 'react'
import createPost from '../../components/Page/createPost'
import Body from '../../components/Body'

const Post = ({ data, loading, error }) => {
  if (error) {
    return <div>error</div>
  }

  return (
    <Fragment>
      {loading && <div>Loading blog post...</div>}
      <div>
        {data.postBy && (
          <div>
            <h1> {data.postBy.title}</h1>
            <Body>{data.postBy.content}</Body>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default createPost({})(Post)
