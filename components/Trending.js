import { Fragment } from 'react'
const Trending = ({ tags }) => {
  return (
    <Fragment>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>{tag.name}</li>
        ))}
      </ul>
    </Fragment>
  )
}

export default Trending
