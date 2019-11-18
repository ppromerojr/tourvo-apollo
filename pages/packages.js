import { memo } from 'react'
import PackagesList from '../components/Packages'
import createPage from '../components/Page/decorator'

const Packages = props => <PackagesList />

export default createPage({ slug: 'shop' })(Packages)
