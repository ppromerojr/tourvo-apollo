import { Fragment } from 'react'
import Link from 'next/link'

const Trending = ({ tags }) => {
  return (
    <Fragment>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {tags.map((tag, index) => (
          <li key={index}>
            <Link
              href={`/travel-tours/packages/tags/[tagSlug]`}
              as={`/travel-tours/packages/tags/${tag.slug}`}
            >
              <a>#{tag.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Fragment>
  )
}

export default Trending
