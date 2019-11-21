import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const LazyImage = ({ alt, height, src, width, ...rest }) => (
  <LazyLoadImage alt={alt} height={height} src={src} width={width} {...rest} />
)

export default LazyImage
