import createPage from '../components/Page/createPage'
import { Fragment } from 'react'

function Home({ data, loading, error, ...rest }) {
  if (error) {
    return <div>error</div>
  }

  return (
    <Fragment>
      <div>hello</div>
    </Fragment>
  )
}

Home = createPage({
  slug: 'homepage'
})(Home)

export default Home
