import { memo, useEffect } from 'react'
import { withRouter } from 'next/router'

import App from '../App'
import TabBar from '../TabBar'
import { withApollo } from '../../lib/apollo'
import Head from '../Head'

import useQueryCategory from '../../hooks/useQueryCategory'
import useQueryTag from '../../hooks/useQueryTag'
import { Tags } from '../../utils/HttpClient'

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

  return Component => createTagPage(options, Component)
}

function renderMetaTags ({ data }, router) {
  if (data.productTags && data.productTags.edges) {
    const page = data.productTags.edges[0].node

    let tags = {
      title: `${process.env.TITLE} - ${page.name}`,
      type: 'category',
      url: router.asPath
    }

    if (page.metaTags) {
      const { keywords, description } = page.metaTags

      if (page.metaTags.image) {
        const {
          mediaItemUrl,
          mediaDetails: { width, height }
        } = page.metaTags.image
        tags = {
          ...tags,
          image: mediaItemUrl.replace(/[\r\n]+/g, ''),
          imageWidth: width,
          imageHeight: height
        }
      }

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

function createTagPage (options, InnerComponent) {
  let Page = props => {
    const slug = props.router.query.tagSlug
    const response = useQueryTag({ first: 1, slug })
    const { data } = response

    useEffect(
      () => {
        if (data.productTags && data.productTags.edges) {
          const tag = data.productTags.edges[0].node

          const count = async () => {
            const result = await countPageView(tag)
          }

          count()
        }
      },
      [data]
    )

    const countPageView = async tag => {
      return await Tags.countView(tag.termTaxonomyId)
    }

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
