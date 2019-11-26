import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import createProduct from '../../../components/Page/createProduct'
import Placeholder from '../../../components/Placeholder'

const Package = dynamic(import('../../../components/Packages/Package'))

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
