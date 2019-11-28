import dynamic from 'next/dynamic'
import createPage from '../../../components/Page/createPage'

const PackageTemplate = dynamic(import('../../../components/PackageTemplate'))

function Packages ({ data, loading, error, ...rest }) {
  if (error) {
    return <div>error</div>
  }

  return <PackageTemplate title='Packages' {...rest} />
}

Packages = createPage({
  slug: 'packages'
})(Packages)

export default Packages
