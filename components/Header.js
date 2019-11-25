import Link from 'next/link'
import { withRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import GET_PAGE from '../graphql/page.queries'

const Header = ({ router: { pathname } }) => {
  return (
    <header>
      <Link href='/travel-tours'>
        <a className={pathname === '/travel-tours' ? 'is-active' : ''}>Home</a>
      </Link>

      <Link href='/travel-tours/about-us'>
        <a className={pathname === '/travel-tours/about-us' ? 'is-active' : ''}>About Us</a>
      </Link>

      <Link href='/travel-tours/packages'>
        <a className={pathname === '/travel-tours/packages' ? 'is-active' : ''}>Packages</a>
      </Link>

      <Link href='/travel-tours/blog'>
        <a className={pathname === '/travel-tours/blog' ? 'is-active' : ''}>Blog</a>
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
