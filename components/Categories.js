import React, { memo, useState, Fragment, useRef } from 'react'
import styled from 'styled-components'
import ErrorMessage from './ErrorMessage'

import useQueryCategories from '../hooks/useQueryCategories'
import Link from 'next/link'

const Tags = styled('div')`
  button {
    margin: 3px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: inline-flex;

    & li {
      display: inline-flex;
      margin-right: 10px;

      & > ul {
        & li {
          display: inline-block;
        }
      }
    }
  }
`

const CategoryImage = styled('div')`
  width: 50px;
  height: 50px;
  background-color: #21bad9;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }
  }
`

const Category = styled('div')`
  text-align: center;
  width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const postsQueryVars = {
    skip: 0,
    first: 10
}

function Categories({ onClick }) {
    const { loading, error, data,  fetchMore } = useQueryCategories()
    const [isSearching, setIsSearching] = useState(false)
    const [keyword, setKeyword] = useState('')
    // const [showFilter, setShowFilter] = useState(false)
    const searchRef = useRef()

    const searchPosts = ({ string }) => {
        let variables = {}

        if (string) {
            variables = {
                ...variables,
                string
            }
        }

        setIsSearching(true)

        fetchMore({
            variables: variables,
            updateQuery: (previousResult, { fetchMoreResult }) => {
                setIsSearching(false)
                if (!fetchMoreResult) {
                    return previousResult
                }

                return fetchMoreResult
            }
        })
    }

    const renderCategory = ({ node }, index) => {
        return (
            <Fragment key={node.id + "_" + index}>
                <li>
                    <Link
                        href='/travel-tours/packages/categories/[slug]'
                        as={`/travel-tours/packages/categories/${node.slug}`}
                        // params={{ title: node.name }}
                    >
                        <a>
                            <Category>
                                <CategoryImage   >
                                    {node.image ? (
                                        <img src={node.image.sourceUrl} />
                                    ) : (
                                            node.name.charAt(0)
                                        )}
                                </CategoryImage>
                                <span>{node.name}</span>
                            </Category>
                        </a>
                    </Link>
                </li>
            </Fragment>
        )
    }

    const { productCategories } = data

    if (error) return <ErrorMessage message='Error loading posts.' />
    if (loading) return <div>Loading categories</div>

    return (
        <Tags style={{ width: '100%' }}>
            {showFilter && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20
                    }}
                >
                    <input
                        type='text'
                        placeholder='Search category'
                        ref={searchRef}
                        onKeyUp={event => {
                            const value = event.target.value
                            setKeyword(value)
                        }}
                    />

                    <Fragment>
                        <button onClick={() => searchPosts({ string: keyword })}>
                            Search
            </button>
                        <button
                            onClick={() => {
                                onClick({})
                                searchRef.current.value = ''
                                searchPosts({ string: '' })
                            }}
                        >
                            Clear
            </button>
                    </Fragment>
                </div>
            )}

            {isSearching ? (
                <div>Searching categories</div>
            ) : (
                    <Fragment>
                        {productCategories.edges.length ? (
                            <ul>{productCategories.edges.map(renderCategory)}</ul>
                        ) : (
                                <div>Not found</div>
                            )}
                    </Fragment>
                )}
        </Tags>
    )
}

export default memo(Categories)
