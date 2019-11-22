import { Fragment } from 'react'
import PackagesList from '../components/Packages'
import Body from '../components/Body'
import createPage from '../components/Page/createPage'

function Packages ({ data, loading, error, ...rest }) {
  if (error) {
    return <div>error</div>
  }

  return (
    <Fragment>
      <PackagesList {...rest} />
    </Fragment>
  )
}

Packages = createPage({
  slug: 'packages'
})(Packages)

export default Packages
