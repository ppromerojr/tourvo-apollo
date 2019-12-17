import Document, { Html, Head, Main, NextScript } from 'next/document'
import { css, Global } from '@emotion/core'

const globalStyles = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
      'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    letter-spacing: -0.015em;
  }
  a {
    color: #22bad9;
  }
  p {
    font-size: 14px;
    line-height: 24px;
  }
  article {
    margin: 0 auto;
    max-width: 650px;
  }
  input[type='text'] {
    padding: 9px 15px;
    border: 0;
    border: 1px solid #ccc;
    outline: none;
  }
  button {
    align-items: center;
    background-color: #22bad9;
    border: 0;
    color: white;
    display: flex;
    border-radius: 17px;
    padding: 10px 20px;
    transition: background-color 0.3s;
  }
  button.active {
    background-color: #017790;
    font-weight: bold;
  }
  button:active {
    background-color: #1b9db7;
  }
  button:disabled {
    background-color: #b5bebf;
  }
  button:focus {
    outline: none;
  }
`

class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Global styles={globalStyles} />
        <Head>
          <link rel='manifest' href='/static/manifest.json' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='black-translucent'
          />
          <meta name='theme-color' content='#21bad9' />

          <link
            rel='apple-touch-icon'
            href='/static/icons/apple-touch-icon.png'
          />
          <link rel='stylesheet' href='/static/wp.min.css' />

          {this.props.styleTags}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
