import { Fragment, memo } from 'react'
import useSWR from 'swr'

import createPage from '../../components/Page/createPage'
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
          {tags && tags.length && (
            <Fragment>
              <h2>Popular Tags</h2>
              <Trending tags={tags} />
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  )
}

MainPage = createPage({
  slug: 'homepage'
})(MainPage)

export default memo(MainPage)
