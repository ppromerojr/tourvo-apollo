import createPage from '../../components/Page/decorator'
import PostPage from '../../components/Post'

const Post = ({ slug }) => {
  return <PostPage slug={slug} />
}

const getInitialProps = async ({ query }) => {
  return {
    slug: query.slug
  }
}

export default createPage({
  head: false,
  getInitialProps
})(Post)
