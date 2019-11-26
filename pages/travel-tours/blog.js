import dynamic from 'next/dynamic'

import createPage from '../../components/Page/createPage'

const Posts = dynamic(import('../../components/Posts'))

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
