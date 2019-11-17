import App from '../../components/App'
import Header from '../../components/Header'
import { withApollo } from '../../lib/apollo'

import PostPage from '../../components/Post'

const Post = ({ slug }) => {
  return (
    <App>
      <Header />
      <PostPage slug={slug} />
    </App>
  )
}

Post.getInitialProps = async ({ query }) => {
  return {
    slug: query.slug
  }
}

export default withApollo(Post)
