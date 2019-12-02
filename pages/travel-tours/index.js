import { Fragment, memo } from 'react'
import useSWR from 'swr'

import createPage from '../../components/Page/createPage'
import Body from '../../components/Body'
import Trending from '../../components/Trending'

const API = process.env.API_URL + '/trending-tags'

const getTrendingTags = url => fetch(url).then(_ => _.json())

function MainPage ({ data, loading, error, ...rest }) {
  const { data: tags, error: tagsError } = useSWR(API, getTrendingTags)
  if (error) {
    return <div>error</div>
  }

  return (
    <Fragment>
      {loading && <div>Loading homepage...</div>}

      {data.pageBy && (
        <div>
          <h1>{data.pageBy.title}</h1>
          {tags && tags.length && (
            <Fragment>
              <h2>Trending tags</h2>
              <Trending tags={tags} />
            </Fragment>
          )}
          <Body>{data.pageBy.content}</Body>
        </div>
      )}
    </Fragment>
  )
}

MainPage = createPage({
  slug: 'homepage'
})(MainPage)

export default memo(MainPage)
