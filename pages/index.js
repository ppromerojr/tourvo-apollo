import { memo } from 'react'
import App from '../components/App'
import Header from '../components/Header'
import { withApollo } from '../lib/apollo'
import Products from '../components/Products'

const IndexPage = memo(props => (
  <App>
    <Header />
    <Products />
  </App>
))

export default withApollo(IndexPage)
