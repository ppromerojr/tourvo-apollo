import { withRouter } from 'next/router'

import Head from '../Head'
import App from '../App'
import Header from '../Header'
import GET_PAGE from '../../graphql/page.queries'
import { useRouter } from 'next/router'
import { withApollo } from '../../lib/apollo'
import GET_POST from '../../graphql/post.queries'

export default options => {
  let _options = options

  options = {
    head: true,
    ..._options
  }

  options.getInitialProps = async context => {
    const { apolloClient } = context
    let result = {}
    let extraProps = {}

    if (_options.type === 'page') {
      const { data, loading, error } = await apolloClient.query({
        query: GET_PAGE,
        variables: { uri: _options.slug }
      })

      extraProps = {
        page: data.pageBy
      }
    }

    if (_options.getInitialProps) {
      result = await _options.getInitialProps(context, extraProps)
    }

    return {
      ...extraProps,
      ...result
    }
  }

  return Component => createPage(options, Component)
}

function createPage (options, InnerComponent) {
  class Page extends React.Component {
    render () {
      const { page, router } = this.props
      let metas = {}

      //   if (options.head) {
      //     metas = {
      //       type: 'page',
      //       title: page.title,
      //       description: 'description',
      //       image: page.featuredImage.mediaItemUrl,
      //       imageWidth: page.featuredImage.width,
      //       imageHeight: page.featuredImage.height,
      //       url: router.route
      //     }
      //   }

      return (
        <React.Fragment>
          {/* {options.head && <Head {...metas} />} */}
          <App>
            <Header />
            <InnerComponent {...this.props} />
          </App>
        </React.Fragment>
      )
    }
  }

  Page.getInitialProps = options.getInitialProps

  Page = withApollo(Page)

  return withRouter(Page)
}
