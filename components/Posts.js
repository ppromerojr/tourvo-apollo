import React, { memo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import Link from 'next/link'
import styled from 'styled-components'
import moment from 'moment'

import ErrorMessage from './ErrorMessage'

import GET_POSTS from '../graphql/posts.queries'
import Body from './Body'
import Lazy from './Image'

export const postsQueryVars = {
  skip: 0,
  first: 10
}

const PostsList = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gridGap: '10px'
})

function Posts () {
  const { loading, error, data, fetchMore, networkStatus, client } = useQuery(
    GET_POSTS,
    {
      variables: postsQueryVars,
      notifyOnNetworkStatusChange: true
    }
  )

  const { posts } = data
  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  if (error) return <ErrorMessage message='Error loading posts.' />
  if (loading && !loadingMorePosts) return <div>Loading posts...</div>

  const fetchMoreData = () => {
    fetchMore({
      variables: {
        after: posts.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }

        return Object.assign({}, previousResult, {
          posts: {
            __typename: previousResult.posts.__typename,
            edges: [
              ...previousResult.posts.edges,
              ...fetchMoreResult.posts.edges
            ],
            pageInfo: fetchMoreResult.posts.pageInfo
          }
        })
      }
    })
  }

  return (
    <div>
      <PostsList>
        {posts.edges.map(({ node }, id) => {
          return (
            <div key={node.id} style={{ marginBottom: 10 }}>
              <div>
                {node.featuredImage && (
                  <div>
                    <Lazy>
                      <img
                        width='100%'
                        height='300'
                        alt={node.name}
                        style={{ display: 'block', objectFit: 'cover' }}
                        src={node.featuredImage.sourceUrl}
                      />
                    </Lazy>
                  </div>
                )}
                <div>
                  <div style={{ padding: 10 }}>
                    <h1>{node.title}</h1>
                    <h4>{moment(node.date).format('MMMM D, YYYY')}</h4>
                    <Body>{node.excerpt}</Body>
                    <Link
                      key={id}
                      href='/travel-tours/posts/[slug]'
                      as={`/travel-tours/posts/${node.slug}`}
                    >
                      <a>Continue reading</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </PostsList>
      <div style={{ width: '100%' }}>
        {posts.pageInfo.hasNextPage && (
          <button onClick={fetchMoreData}>
            {loadingMorePosts ? 'Loading...' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  )
}

export default memo(Posts)
