import { memo } from 'react'
import App from '../components/App'
import Header from '../components/Header'
import { withApollo } from '../lib/apollo'
import PackagesList from '../components/Packages'

const Packages = memo(props => (
  <App>
    <Header />
    <PackagesList />
  </App>
))

export default withApollo(Packages)
