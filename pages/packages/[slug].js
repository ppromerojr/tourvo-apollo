import { Fragment } from 'react'
import createProduct from '../../components/Page/createProduct'
import Package from '../../components/Packages/Package'

const PackagePage = ({ data, loading, error }) => {
  if (error) {
    return <div>error</div>
  }

  if (loading) {
    return <div>Loading package Name post...</div>
  }

  return <Package item={data.productBy} />
}

export default createProduct({})(PackagePage)
