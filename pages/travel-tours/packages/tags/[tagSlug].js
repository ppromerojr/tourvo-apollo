import dynamic from 'next/dynamic'

import createTag from '../../../../components/Page/createTag'
import PackageTemplate from '../../../../components/PackageTemplate'

function Tags ({ data, loading, error, ...rest }) {
  if (error) {
    return <div>error</div>
  }

  return (
    <PackageTemplate
      type='tag'
      tag={data.productTags}
      loading={loading}
      {...rest}
    />
  )
}

Tags = createTag({})(Tags)

export default Tags
