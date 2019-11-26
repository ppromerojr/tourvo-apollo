import { memo } from 'react'
import { withRouter } from 'next/router'

import App from '../App'
import TabBar from '../TabBar'
import { withApollo } from '../../lib/apollo'
import Head from '../Head'
import useQueryProduct from '../../hooks/useQueryProduct'

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

  return Component => createProductPage(options, Component)
}

function renderMetaTags ({ data }, router) {
  if (data.productBy) {
    const { productBy: page } = data
    let tags = {
      type: 'product',
      title: `${process.env.TITLE} - ${page.name}`,
      url: router.asPath
    }

    if (page.image) {
      const {
        mediaItemUrl,
        mediaDetails: { width, height }
      } = page.image

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

function createProductPage (options, InnerComponent) {
  let Page = props => {
    const slug = props.router.query.slug
    const response = useQueryProduct({ slug })

    return (
      <React.Fragment>
        {renderMetaTags(response, props.router)}
        <App>
          <InnerComponent {...props} {...response} />
          <TabBar />
        </App>
      </React.Fragment>
    )
  }

  Page.getInitialProps = options.getInitialProps

  Page = memo(Page)

  return withRouter(withApollo(Page))
}
