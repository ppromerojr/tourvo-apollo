import { memo } from 'react'
import App from '../components/App'
import Header from '../components/Header'
import { withApollo } from '../lib/apollo'

const IndexPage = memo(({ slug }) => (
  <App>
    <Header />
    <div>this is page - {slug}</div>
  </App>
))

IndexPage.getInitialProps = async ({ query }) => {
  return {
    slug: query.slug
  }
}

export default withApollo(IndexPage)
