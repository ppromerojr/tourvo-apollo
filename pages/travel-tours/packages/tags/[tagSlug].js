import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import createCategory from '../../../../components/Page/createCategory'
import createTag from '../../../../components/Page/createTag'

const PackageTemplate = dynamic(
  import('../../../../components/PackageTemplate')
)

function Tags ({ data, loading, error, ...rest }) {
  if (error) {
    return <div>error</div>
  }

  useEffect(() => {
    console.log('Rest', rest)
  }, [])

  return <PackageTemplate title='Packages' {...rest} />
}

Tags = createTag({})(Tags)

export default Tags
