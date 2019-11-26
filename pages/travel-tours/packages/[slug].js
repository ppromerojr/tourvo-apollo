import { Fragment } from 'react'
import createProduct from '../../../components/Page/createProduct'
import Package from '../../../components/Packages/Package'
import Placeholder from '../../../components/Placeholder'

const PackagePage = ({ data, loading, error, ...rest }) => {
  if (error) {
    return <div>error</div>
  }

  if (loading) {
    return <Placeholder rows={10} />
  }

  return (
    <Fragment>
      <Package item={data.productBy} {...rest} />
    </Fragment>
  )
}

export default createProduct({})(PackagePage)
