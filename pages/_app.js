import { Fragment } from 'react'
import App from 'next/app'
import Router from 'next/router'
import { ClientContext } from 'graphql-hooks'

import withGraphQLClient from '../lib/with-graphql-client'
import PWA from '../components/Install'
import { initGA, logPageView } from '../utils/analytics'

class MyApp extends App {
    componentDidMount() {
        initGA()
        logPageView()
        Router.router.events.on('routeChangeComplete', logPageView)
    }
    render() {
        const { Component, pageProps, graphQLClient } = this.props
        return (
            <ClientContext.Provider value={graphQLClient}>
                <Fragment>
                    <Component {...pageProps} />
                    <PWA />
                </Fragment>
            </ClientContext.Provider>
        )
    }
}

export default withGraphQLClient(MyApp)