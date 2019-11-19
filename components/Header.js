import Link from 'next/link'
import { withRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import GET_PAGE from '../graphql/page.queries'

const Header = ({ router: { pathname } }) => {
  const { client } = useQuery(GET_PAGE)
  return (
    <header>
      <Link href='/'>
        <a
          onMouseOver={() => {
            client.query({
              query: GET_PAGE,
              variables: { uri: 'homepage' }
            })
          }}
          className={pathname === '/' ? 'is-active' : ''}
        >
          Home
        </a>
      </Link>

      <Link href='/about-us'>
        <a
          onMouseOver={() => {
            client.query({
              query: GET_PAGE,
              variables: { uri: 'about-us' }
            })
          }}
          className={pathname === '/about-us' ? 'is-active' : ''}
        >
          About Us
        </a>
      </Link>

      <Link href='/packages'>
        <a
          onMouseOver={() => {
            client.query({
              query: GET_PAGE,
              variables: { uri: 'packages' }
            })
          }}
          className={pathname === '/packages' ? 'is-active' : ''}
        >
          Packages
        </a>
      </Link>

      <Link href='/blog'>
        <a
          onMouseOver={() => {
            client.query({
              query: GET_PAGE,
              variables: { uri: 'blog' }
            })
          }}
          className={pathname === '/blog' ? 'is-active' : ''}
        >
          Blog
        </a>
      </Link>

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
    </header>
  )
}

export default withRouter(Header)
