import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang='en'>
        <Head />
        <title>Tourvo App</title>
        <meta
          name='Description'
          content='Destinations within your reach, travel, packages'
        />
        <meta name='theme-color' content='#000000' />
        <link rel='manifest' href='/static/manifest.json' />
        <link
          rel='apple-touch-icon'
          href='/static/icons/apple-touch-icon.png'
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
