import createPage from '../../components/Page/decorator'
import PackagePage from '../../components/Package'

const Package = ({ slug }) => {
  return <PackagePage slug={slug} />
}

const getInitialProps = async ({ query }) => {
  return {
    slug: query.slug
  }
}

export default createPage({ head: false, getInitialProps })(Package)
