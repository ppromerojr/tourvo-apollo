import { Fragment } from 'react'
import createPage from '../components/Page/decorator'
import GET_PAGE from '../graphql/page.queries'
import { useQuery } from '@apollo/react-hooks'
import Head from '../components/Head'

function AboutUs ({ router }) {
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
      description:
        'Apollo is a GraphQL client that allows you to easily query the exact data you need from a GraphQL server. In addition to fetching and mutating data, Apollo analyzes your queries and their results to construct a client-side cache of your data, which is kept up to date as further queries and mutations are run, fetching more results from the server.',
      image: page.featuredImage.mediaItemUrl,
      imageWidth: page.featuredImage.width,
      imageHeight: page.featuredImage.height,
      url: router.route
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
