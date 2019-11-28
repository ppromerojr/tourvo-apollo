import { memo } from 'react'
import { withRouter } from 'next/router'

import App from '../App'
import TabBar from '../TabBar'
import { withApollo } from '../../lib/apollo'
import Head from '../Head'

import useQueryCategory from '../../hooks/useQueryCategory'

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

  return Component => createCategoryPage(options, Component)
}

function renderMetaTags ({ data }, router) {
  if (data.productCategories && data.productCategories.edges) {
    const page = data.productCategories.edges[0].node

    let tags = {
      title: `${process.env.TITLE} - ${page.name}`,
      type: 'category',
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

function createCategoryPage (options, InnerComponent) {
  let Page = props => {
    const slug = props.router.query.slug
    const response = useQueryCategory({ first: 1, slug })

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
