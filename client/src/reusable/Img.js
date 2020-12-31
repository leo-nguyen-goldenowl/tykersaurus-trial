import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Img = ({ className, effect, src, alt, ...rest }) => {
  return (
    <LazyLoadImage
      className={className}
      effect={effect || 'blur'}
      alt={alt}
      src={src}
      {...rest}
      style={{ marginBottom: '-4px' }}
    />
  )
}

export default Img
