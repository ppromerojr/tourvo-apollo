import { Fragment } from 'react'
import App from 'next/app'
import PWA from '../components/Install'
import { initGA, logPageView } from '../utils/analytics'
import Router from 'next/router'

class MyApp extends App {
  componentDidMount () {
    initGA()
    logPageView()
    Router.router.events.on('routeChangeComplete', logPageView)
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Fragment>
        <Component {...pageProps} />
        <PWA />
      </Fragment>
    )
  }
}

export default MyApp
