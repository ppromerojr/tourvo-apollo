import { useEffect } from 'react'
import { withApollo } from '../lib/apollo'
import createPage from '../components/Page/decorator'
import { useQuery } from '@apollo/react-hooks'
import GET_PAGE from '../graphql/page.queries'
import ApolloClient from 'apollo-client'

function MainPage (props) {
  return <div>this is home1</div>
}

MainPage = createPage({
  slug: 'homepage'
})(MainPage)

export default MainPage
