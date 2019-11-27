import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import createProduct from '../../../components/Page/createProduct'

const Package = dynamic(import('../../../components/Packages/Package'))
const Placeholder = dynamic(import('../../../components/Placeholder'))

const PackagePage = ({ data, loading, error, ...rest }) => {
  if (error) {
    return <div>error</div>
  }

  if (loading) {
    return <Placeholder />
  }

  return (
    <Fragment>
      <Package item={data.productBy} {...rest} />
    </Fragment>
  )
}

export default createProduct({})(PackagePage)
