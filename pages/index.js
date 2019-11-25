import { Fragment } from 'react'
import Link from 'next/link'

import createPage from '../components/Page/createPage'
import Body from '../components/Body'

function MainPage({ data, loading, error }) {
    if (error) {
        return <div>error</div>
    }

    return (
        <Fragment>
            {loading && <div>Loading homepage...</div>}

            {data.pageBy && (
                <div>
                    <div>Consultancy</div>
                    <div>
                        <Link href='/travel-tours' as='/travel-tours'>
                            <a> Travel & Tours</a>
                        </Link>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

MainPage = createPage({
    withHeader: false,
    slug: 'homepage'
})(MainPage)

export default MainPage
