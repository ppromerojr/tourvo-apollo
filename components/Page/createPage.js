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

    let tags = {
      title: `${process.env.TITLE} - ${page.title}`,
      type: 'page',
      url: router.route
    }

    if (page.featuredImage) {
      const { mediaItemUrl, width, height } = page.featuredImage

      tags = {
        ...tags,
        image: mediaItemUrl.replace(/[\r\n]+/g, ''),
        imageWidth: width,
        imageHeight: height
      }
    }

    if (page.metaTags) {
      const { keywords, description } = page.metaTags
      tags = {
        ...tags,
        description,
        keywords
      }
    }

    return <Head {...tags} />
  }

  return null
}

function createPage (options, InnerComponent) {
  let Page = props => {
    const response = useQueryPage({ slug: options.slug })
    console.log('page', props.router)

    return (
      <React.Fragment>
        {renderMetaTags(response, props.router)}
        <Header />
        <App>
          <InnerComponent {...props} {...response} />
        </App>
      </React.Fragment>
    )
  }

  Page.getInitialProps = options.getInitialProps

  Page = memo(Page)

  return withRouter(withApollo(Page))
}
