import dynamic from 'next/dynamic'
import createCategoryPage from '../../../../components/Page/createCategory'
import { Fragment, useEffect, useState } from 'react'

const PackageTemplate = dynamic(
  import('../../../../components/PackageTemplate')
)

function Packages ({ data, loading, error, ...rest }) {
  const [category, setCategory] = useState({})
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
