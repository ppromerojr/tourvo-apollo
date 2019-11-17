import App from '../../components/App'
import Header from '../../components/Header'
import { withApollo } from '../../lib/apollo'

import ProductPage from '../../components/Product'

const Product = ({ slug }) => {
  return (
    <App>
      <Header />
      <ProductPage slug={slug} />
    </App>
  )
}

Product.getInitialProps = async ({ query }) => {
  return {
    slug: query.slug
  }
}

export default withApollo(Product)
