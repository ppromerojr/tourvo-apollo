import React from 'react'
import LazyLoad from 'react-lazyload';
import Placeholder from './Placeholder';

const Lazy = ({ children, ...rest }) => (
    <LazyLoad height={200} offset={[-200, 0]} placeholder={<Placeholder />} debounce={500}>
        {children}
    </LazyLoad>
)

export default Lazy
