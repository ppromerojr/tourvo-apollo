import { useQuery } from '@apollo/react-hooks'

import GET_PRODUCT from '../graphql/product.queries'

const Package = ({ router }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { slug: router.query.slug }
  })

  if (loading) {
    return <p>Loading...</p>
  }

  const { productBy: item } = data

  return (
    <div>
      <h1>{item.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: item.description }} />
    </div>
  )
}

export default Package
