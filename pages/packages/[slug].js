import App from '../../components/App'
import Header from '../../components/Header'
import { withApollo } from '../../lib/apollo'

import PackagePage from '../../components/Package'

const Package = ({ slug }) => {
  return (
    <App>
      <Header />
      <PackagePage slug={slug} />
    </App>
  )
}

Package.getInitialProps = async ({ query }) => {
  return {
    slug: query.slug
  }
}

export default withApollo(Package)
