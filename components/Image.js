import React from 'react'
import LazyLoad from 'react-lazyload'
import Placeholder from './Placeholder'

const Lazy = ({ children, ...rest }) => (
  <LazyLoad
    once
    height={300}
    offset={600}
    placeholder={<Placeholder />}
    debounce={200}
  >
    {children}
  </LazyLoad>
)

export default Lazy
