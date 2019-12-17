import createPage from '../../components/Page/createPage'
import Posts from '../../components/Posts'

function Packages ({ data, loading, error }) {
  if (error) {
    return <div>error</div>
  }

  return <Posts />
}

Packages = createPage({
  slug: 'blog'
})(Packages)

export default Packages
