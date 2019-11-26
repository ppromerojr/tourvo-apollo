import { Fragment } from 'react'
import createPage from '../../components/Page/createPage'
import Body from '../../components/Body'

function AboutPage ({ data, loading, error }) {
  if (error) {
    return <div>error</div>
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <Fragment>{data.pageBy && <Body>{data.pageBy.content}</Body>}</Fragment>
  )
}

AboutPage = createPage({
  slug: 'about-us'
})(AboutPage)

export default AboutPage
