import { Fragment } from 'react'
import createPage from '../components/Page/decorator'
import GET_PAGE from '../graphql/page.queries'
import { useQuery } from '@apollo/react-hooks'
import Head from '../components/Head'

function AboutUs () {
  let metas = {}
  const { data, loading, error } = useQuery(GET_PAGE, {
    variables: { uri: 'about-us' }
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (data.pageBy) {
    const { pageBy: page } = data
    metas = {
      type: 'page',
      title: page.title,
      description: 'description',
      image: page.featuredImage.mediaItemUrl,
      imageWidth: page.featuredImage.width,
      imageHeight: page.featuredImage.height
      //   url: router.route
    }
  }

  return (
    <article>
      {data.pageBy && (
        <Fragment>
          <Head {...metas} />
          <div dangerouslySetInnerHTML={{ __html: data.pageBy.content }} />
        </Fragment>
      )}
    </article>
  )
}

export default createPage({ slug: 'shop', type: 'page' })(AboutUs)
