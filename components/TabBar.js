import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from '@emotion/styled'
import { Home, Heart, Briefcase, List } from 'react-feather'

const Nav = styled('div')`
  border-top: 1px solid #ccc;
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
    display: inline-flex;
    justify-content: space-between;
    width: 100%;

    li {
      flex-grow: 1;
      a {
        display: block;
        padding: 10px;
        margin: 0;
        text-align: center;
        background: #fff;
      }
    }
  }
`

const Header = ({ router: { pathname } }) => {
  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: 'auto',
        bottom: 0,
        zIndex: 9,
        left: 0
      }}
    >
      <Nav>
        <ul>
          <li>
            {' '}
            <Link href='/travel-tours'>
              <a className={pathname === '/travel-tours' ? 'is-active' : ''}>
                <Home
                  color={pathname === '/travel-tours' ? '#007890' : '#22bad9'}
                />
              </a>
            </Link>
          </li>
          <li>
            <Link href='/travel-tours/about-us'>
              <a
                className={
                  pathname === '/travel-tours/about-us' ? 'is-active' : ''
                }
              >
                <Heart
                  color={
                    pathname === '/travel-tours/about-us'
                      ? '#007890'
                      : '#22bad9'
                  }
                />
              </a>
            </Link>
          </li>
          <li>
            <Link href='/travel-tours/packages'>
              <a
                className={
                  pathname === '/travel-tours/packages' ? 'is-active' : ''
                }
              >
                <Briefcase
                  color={
                    pathname === '/travel-tours/packages'
                      ? '#007890'
                      : '#22bad9'
                  }
                />
              </a>
            </Link>
          </li>

          <li>
            <Link href='/travel-tours/blog'>
              <a
                className={pathname === '/travel-tours/blog' ? 'is-active' : ''}
              >
                <List
                  color={
                    pathname === '/travel-tours/blog' ? '#007890' : '#22bad9'
                  }
                />
              </a>
            </Link>
          </li>
        </ul>
      </Nav>

      <style jsx>{`
        header {
          margin-bottom: 25px;
        }
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

export default withRouter(Header)
