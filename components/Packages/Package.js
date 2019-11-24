import { Fragment } from 'react'
import Link from 'next/link'
import Body from '../Body'

function renderPackage ({ node }, index) {
  return (
    <div key={index}>
      {node.name}
      <Link href='/packages/[slug]' as={`/packages/${node.slug}`}>
        <a>Read more</a>
      </Link>
    </div>
  )
}

const Package = ({ item }) => {
  return (
    <Fragment>
      <div>
        <h1>{item.name}</h1>
        <Body>{item.description}</Body>
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
