import React, { useEffect, memo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import Link from 'next/link'

import ErrorMessage from './ErrorMessage'

import GET_POSTS from '../graphql/posts.queries'
import GET_POST from '../graphql/post.queries'
import Body from './Body'

const style = {
  height: 30,
  border: '1px solid green',
  margin: 6,
  padding: 8
}

export const postsQueryVars = {
  skip: 0,
  first: 10
}

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
      <div>
        {posts.edges.map(({ node }, id) => {
          return (
            <div key={node.id}>
              <h1>{node.title}</h1>
              <Body>{node.excerpt}</Body>
              <hr />

              <Link key={id} href='/posts/[slug]' as={`/posts/${node.slug}`}>
                <a>Continue reading</a>
              </Link>
            </div>
          )
        })}
      </div>
      {posts.pageInfo.hasNextPage && (
        <button onClick={fetchMoreData}>
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </button>
      )}
    </div>
  )
}

export default memo(Posts)
