import { Fragment } from 'react'
import createPage from '../../components/Page/createPage'
import Body from '../../components/Body'

function MainPage ({ data, loading, error }) {
  if (error) {
    return <div>error</div>
  }

  return (
    <Fragment>
      {loading && <div>Loading homepage...</div>}

      {data.pageBy && (
        <div>
          <h1>{data.pageBy.title}</h1>
          <Body>{data.pageBy.content}</Body>
        </div>
      )}
    </Fragment>
  )
}

MainPage = createPage({
  slug: 'homepage'
})(MainPage)

export default MainPage
