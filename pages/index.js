import { Fragment } from 'react'
import createPage from '../components/Page/createPage'
import Body from '../components/Body'

function MainPage ({ data, loading, error }) {
  if (error) {
    return <div>error</div>
  }

  return (
    <Fragment>
      {loading && <div>Loading homepage...</div>}
      {data.pageBy && <Body>{data.pageBy.content}</Body>}
    </Fragment>
  )
}

MainPage = createPage({
  slug: 'homepage'
})(MainPage)

export default MainPage
