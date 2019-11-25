import { Fragment } from 'react'

import Body from '../../components/Body'
import Posts from '../../components/Posts'
import createPage from '../../components/Page/createPage'

function Packages ({ data, loading, error }) {
  if (error) {
    return <div>error</div>
  }

  return (
    <Fragment>
      <Posts />
    </Fragment>
  )
}

Packages = createPage({
  slug: 'blog'
})(Packages)

export default Packages
