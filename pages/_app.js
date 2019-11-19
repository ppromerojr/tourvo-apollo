import React from 'react'
import App from 'next/app'

function MyApp(props) {
    const { Component, pageProps } = props

    return <Component {...pageProps} />
}
 
export default MyApp
