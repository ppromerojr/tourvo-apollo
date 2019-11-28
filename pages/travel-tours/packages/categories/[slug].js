import dynamic from 'next/dynamic'
import createCategoryPage from '../../../../components/Page/createCategory'
import { Fragment, useEffect } from 'react'
import GET_PRODUCTS from '../../../../graphql/products.queries'
import Router from 'next/router'

const PackageTemplate = dynamic(
  import('../../../../components/PackageTemplate')
)

function Packages ({ data, loading, error, client, ...rest }) {
  if (error) {
    return <div>error</div>
  }

  return (
    <Fragment>
      <PackageTemplate
        isCategoryPageLoading={loading}
        category={data.productCategories}
        {...rest}
      />
    </Fragment>
  )
}

Packages = createCategoryPage({})(Packages)

export default Packages
