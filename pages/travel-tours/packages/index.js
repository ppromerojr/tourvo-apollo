import { Fragment } from 'react'
import PackagesList from '../../../components/Packages'
import createPage from '../../../components/Page/createPage'

function Packages ({ data, loading, error, ...rest }) {
  if (error) {
    return <div>error</div>
  }

  return (
    <div>
      <PackagesList {...rest} />
    </div>
  )
}

Packages = createPage({
  slug: 'packages'
})(Packages)

export default Packages
