import Link from 'next/link'
import { withRouter } from 'next/router'

const Header = ({ router: { pathname } }) => (
  <header>
    <Link href='/'>
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>

    <Link href='/about-us'>
      <a className={pathname === '/about-us' ? 'is-active' : ''}>About Us</a>
    </Link>

    <Link href='/packages'>
      <a className={pathname === '/packages' ? 'is-active' : ''}>Packages</a>
    </Link>

    <Link href='/blog'>
      <a className={pathname === '/blog' ? 'is-active' : ''}>Blog</a>
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

export default withRouter(Header)
