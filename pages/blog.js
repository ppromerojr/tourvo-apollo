import { memo } from 'react'
import App from '../components/App'
import Header from '../components/Header'
import { withApollo } from '../lib/apollo'
import Posts from '../components/Posts'

const Blog = memo(props => (
  <App>
    <Header />
    <Posts />
  </App>
))

export default withApollo(Blog)
