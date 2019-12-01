import { memo } from 'react'
import { withRouter } from 'next/router'

import App from '../App'
import TabBar from '../TabBar'
import { withApollo } from '../../lib/apollo'
import useQueryPage from '../../hooks/useQueryPage'
import Head from '../Head'

export default options => {
  let _options = options

  options = {
    withHeader: true,
    ..._options
  }

  console.log('options', options)

  options.getInitialProps = async context => {
    let result = {}
    let extraProps = {}

    console.log(context)

    if (options.getInitialProps) {
      try {
        result = await _options.getInitialProps(context, extraProps)
      } catch (err) {
        console.log(err)
      }
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
      url: router.asPath
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

    return (
      <React.Fragment>
        {renderMetaTags(response, props.router)}
        <App>
          <InnerComponent {...props} {...response} />
          {options.withHeader && <TabBar />}
        </App>
      </React.Fragment>
    )
  }

  Page = memo(Page)

  return withRouter(withApollo(Page))
}
