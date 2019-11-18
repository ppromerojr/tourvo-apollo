import NextHead from 'next/head'
import PropTypes from 'prop-types'

const baseURL = process.env.BASE_URL

const Head = props => {
  let { type, title, description, image, imageWidth, imageHeight, url } = props

  return (
    <NextHead>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta key='og-type' property='og:type' content={type} />
      <meta key='og-title' property='og:title' content={title} />
      <meta
        key='og-description'
        property='og:description'
        content={description}
      />

      <meta key='og-image' property='og:image' content={image} />
      {imageWidth > 0 && (
        <meta property='og:image:width' content={imageWidth} />
      )}
      {imageHeight > 0 && (
        <meta property='og:image:height' content={imageHeight} />
      )}

      <meta key='og-url' property='og:url' content={baseURL + url} />

      <meta
        key='twitter-card'
        name='twitter:card'
        content='summary_large_image'
      />
      <meta key='twitter-title' name='twitter:title' content={title} />
      <meta
        key='twitter-description'
        name='twitter:description'
        content={description}
      />
      <meta key='twitter-image' name='twitter:image' content={image} />
      <meta key='twitter-url' name='twitter:url' content={baseURL + url} />
    </NextHead>
  )
}

Head.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  url: PropTypes.string
}

export default Head
