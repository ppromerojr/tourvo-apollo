import { Fragment } from 'react'
import createProduct from '../../components/Page/createProduct'
import Package from '../../components/Packages/Package'

const PackagePage = ({ data, loading, error, ...rest }) => {
    if (error) {
        return <div>error</div>
    }

    if (loading) {
        return <div>Loading package Name post...</div>
    }


    return (
        <Fragment> 
            <Package item={data.productBy} {...rest} />
        </Fragment>
    )
}

export default createProduct({})(PackagePage)
