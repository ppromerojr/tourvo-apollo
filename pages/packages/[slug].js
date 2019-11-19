import createPage from '../../components/Page/decorator'
import PackagePage from '../../components/Package'

const Package = (props) => {
  return <PackagePage {...props} />
}
 
export default createPage({   })(Package)
