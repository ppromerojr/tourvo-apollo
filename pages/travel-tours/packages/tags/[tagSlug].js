import PackageTemplate from '../../../../components/PackageTemplate'
import createTag from '../../../../components/Page/createTag'

function Tags ({ data, loading, error, ...rest }) {
  if (error) {
    return <div>error</div>
  }

  return <PackageTemplate tag={data.productTags} loading={loading} {...rest} />
}

Tags = createTag({})(Tags)

export default Tags
