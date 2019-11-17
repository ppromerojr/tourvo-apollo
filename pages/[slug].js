import { memo } from 'react'
import App from '../components/App'
import Header from '../components/Header'
import { withApollo } from '../lib/apollo'
import Products from '../components/Products'
import Page from '../components/Page'

const IndexPage = memo(({ slug }) => (
  <App>
    <Header />
    <div>this is page - {slug}</div>
    <Page slug={slug} />
  </App>
))

IndexPage.getInitialProps = async ({ query }) => {
  return {
    slug: query.slug
  }
}

export default withApollo(IndexPage)
