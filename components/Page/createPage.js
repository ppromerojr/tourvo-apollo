import { memo } from 'react'
import { withRouter } from 'next/router'

import App from '../App'
import Header from '../Header'
import { withApollo } from '../../lib/apollo'
import useQueryPage from '../../hooks/useQueryPage'
import Head from '../Head'

export default options => {
  let _options = options

  options = {
    ..._options
  }

  options.getInitialProps = async context => {
    let result = {}
    let extraProps = {}

    if (_options.getInitialProps) {
      result = await _options.getInitialProps(context, extraProps)
    }

    return result
  }

  return Component => createPage(options, Component)
}

function renderMetaTags ({ data }, router) {
  if (data.pageBy) {
    const { pageBy: page } = data
    const tags = {
      title: page.title,
      image: page.featuredImage.mediaItemUrl.replace(/[\r\n]+/g, ''),
      imageWidth: page.featuredImage.width,
      imageHeight: page.featuredImage.height,
      type: 'page',
      description:
        'In addition to fetching and mutating data, Apollo analyzes your queries and their results to construct a client-side cache of your data, which is kept up to date as further queries and mutations are run, fetching more results from the server.',
      url: router.route
    }

    return <Head {...tags} />
  }

  return <Head title='Tourvo App' />
}

function createPage (options, InnerComponent) {
  let Page = props => {
    const response = useQueryPage({ slug: options.slug })

    return (
      <React.Fragment>
        {renderMetaTags(response, props.router)}
        <App>
          <Header />
          <InnerComponent {...props} {...response} />
        </App>
      </React.Fragment>
    )
  }

  Page.getInitialProps = options.getInitialProps

  Page = memo(Page)

  return withRouter(withApollo(Page))
}