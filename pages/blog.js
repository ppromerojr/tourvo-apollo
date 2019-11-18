import { memo } from 'react'
import Posts from '../components/Posts'

import createPage from '../components/Page/decorator'

const Blog = memo(props => <Posts />)

export default createPage({ slug: 'shop' })(Blog)
