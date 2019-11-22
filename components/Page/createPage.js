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

function renderMetaTags({ data }, router) {
    if (data.pageBy) {
        const { pageBy: page } = data
        let tags = {
            title: page.title,
            image: page.featuredImage.mediaItemUrl.replace(/[\r\n]+/g, ''),
            imageWidth: page.featuredImage.width,
            imageHeight: page.featuredImage.height,
            type: 'page',
            description: page.meta_description ? page.meta_description.metaDescription : "",
            url: router.route
        }

        return <Head {...tags} />
    }

    return null
}

function createPage(options, InnerComponent) {
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
