import Link from 'next/link'
import { withRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import styled from "styled-components"

import GET_PAGE from '../graphql/page.queries'

const Nav = styled("div")`

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
    background: #FFF;
}

    }
    }
`

const Header = ({ router: { pathname } }) => {
    return (
        <div style={{ position: "fixed", width: "100%", height: "auto", bottom: 0 }}>
            <Nav>
                <ul>
                    <li> <Link href='/travel-tours'>
                        <a className={pathname === '/travel-tours' ? 'is-active' : ''}>Home</a>
                    </Link></li>
                    <li>
                        <Link href='/travel-tours/about-us'>
                            <a className={pathname === '/travel-tours/about-us' ? 'is-active' : ''}>About Us</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/travel-tours/packages'>
                            <a className={pathname === '/travel-tours/packages' ? 'is-active' : ''}>Packages</a>
                        </Link></li>

                    <li>
                        <Link href='/travel-tours/blog'>
                            <a className={pathname === '/travel-tours/blog' ? 'is-active' : ''}>Blog</a>
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
