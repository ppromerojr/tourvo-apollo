import { Fragment } from 'react'
import PackagesList from '../../../../components/Packages'
import Body from '../../../../components/Body'
import createPage from '../../../../components/Page/createPage'

function Packages({ data, loading, error }) {
    if (error) {
        return <div>error</div>
    }

    return (
        <Fragment>
            <div>loading category page</div>
            {loading && <div>Loading page content...</div>}
            {data.pageBy && <Body>{data.pageBy.content}</Body>}
            <PackagesList />
        </Fragment>
    )
}

Packages = createPage({
    slug: 'packages'
})(Packages)

export default Packages
