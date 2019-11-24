import { Fragment } from 'react'
import App from 'next/app'
import PWA from '../components/Install'

class MyApp extends App {
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
