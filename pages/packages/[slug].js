import { Fragment } from 'react'
import Body from '../../components/Body'
import createProduct from '../../components/Page/createProduct'

const Package = ({ data, loading, error }) => {
  if (error) {
    return <div>error</div>
  }

  return (
    <Fragment>
      {loading && <div>Loading package Name posts...</div>}
      <div>
        {data.productBy && (
          <div>
            <h1> {data.productBy.name}</h1>
            <Body>{data.productBy.description}</Body>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default createProduct({})(Package)
