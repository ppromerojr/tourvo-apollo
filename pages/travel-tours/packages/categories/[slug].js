import createCategoryPage from '../../../../components/Page/createCategory'
import { Fragment } from 'react'
import PackageTemplate from '../../../../components/PackageTemplate'

function Packages ({ data, loading, error, client, ...rest }) {
  if (error) {
    return <div>error</div>
  }

  return (
    <Fragment>
      <PackageTemplate
        type='category'
        loading={loading}
        category={data.productCategories}
        {...rest}
      />
    </Fragment>
  )
}

Packages = createCategoryPage({})(Packages)

export default Packages
