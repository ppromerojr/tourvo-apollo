import React from 'react'
import LazyLoad from 'react-lazyload'
import Placeholder from './Placeholder'

const Lazy = ({ children, ...rest }) => (
  <LazyLoad once height={300} offset={600} debounce={200} {...rest}>
    {children}
  </LazyLoad>
)

Lazy.defaultProps = {
  placeholder: <Placeholder />
}

export default Lazy
