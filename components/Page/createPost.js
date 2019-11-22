import { memo } from 'react'
import { withRouter } from 'next/router'

import App from '../App'
import Header from '../Header'
import { withApollo } from '../../lib/apollo'
import Head from '../Head'
import useQueryPost from '../../hooks/useQueryPost'

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

    return Component => createPostPage(options, Component)
}

function renderMetaTags({ data }, router) {
    if (data.postBy) {
        const { postBy: page } = data
        console.log("data", data)

        let tags = {
            title: page.title,
            image:
                page.featuredImage &&
                page.featuredImage.mediaItemUrl.replace(/[\r\n]+/g, ''),
            imageWidth: page.featuredImage && page.featuredImage.width,
            imageHeight: page.featuredImage && page.featuredImage.height,
            type: 'post',
            description: page.meta_description ? page.meta_description.metaDescription : "",
            url: `/posts/${router.query.slug}`
        }

        return <Head {...tags} />
    }

    return null
}

function createPostPage(options, InnerComponent) {
    let Page = props => {
        const slug = props.router.query.slug
        const response = useQueryPost({ slug })

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
