import { Fragment } from 'react'
import Link from 'next/link'
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinIcon,
  LinkedinShareButton
} from 'react-share'

import Body from '../Body'

function renderPackage ({ node }, index) {
  return (
    <div key={index}>
      {node.name}
      <Link
        href='/travel-tours/packages/[slug]'
        as={`/travel-tours/packages/${node.slug}`}
      >
        <a>Read more</a>
      </Link>
    </div>
  )
}

const Package = ({ item, router }) => {
  const baseURL = process.env.BASE_URL
  const shareUrl = baseURL + router.asPath

  return (
    <Fragment>
      <div>
        <h1>{item.name}</h1>
        <FacebookShareButton url={shareUrl} quote={item.name}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <LinkedinShareButton
          url={shareUrl}
          windowWidth={750}
          windowHeight={600}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        {item.description && <Body>{item.description}</Body>}
      </div>
      <div>
        <h2>Related Packages</h2>
        <div>
          {item.related.edges.length && item.related.edges.map(renderPackage)}
        </div>
      </div>
    </Fragment>
  )
}

export default Package
