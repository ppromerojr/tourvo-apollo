import createPage from '../../../components/Page/createPage'

import dynamic from 'next/dynamic'

const PackagesList = dynamic(import('../../../components/Packages'))

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
