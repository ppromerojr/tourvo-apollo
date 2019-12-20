import { useEffect } from "react"
import createPage from '../components/Page/createPage'
import PackageTemplate from '../components/PackageTemplate'

function Packages({ data, loading, error, ...rest }) {

    useEffect(() => {
        console.log("data", data)
    }, [data])

    if (error) {
        return <div>error</div>
    }

    return <div>Test</div>
}

Packages = createPage({
    slug: 'packages'
})(Packages)

export default Packages

