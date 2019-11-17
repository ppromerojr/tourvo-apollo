import { memo } from 'react'
import App from '../components/App'
import Header from '../components/Header'
import { withApollo } from '../lib/apollo'

const IndexPage = memo(props => (
  <App>
    <Header />
    <div>this is home</div>
  </App>
))

export default withApollo(IndexPage)
