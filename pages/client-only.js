import App from '../components/App'
import Header from '../components/Header'
import { withApollo } from '../lib/apollo'
import Products from '../components/Products'

const ClientOnlyPage = props => (
  <App>
    <Header />
    <Products />
  </App>
)

export default withApollo(ClientOnlyPage, {
  // Disable apollo ssr fetching in favour of automatic static optimization
  ssr: false
})
