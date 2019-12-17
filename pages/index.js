import { Fragment } from 'react'
import styled from 'styled-components'

import createPage from '../components/Page/createPage'

import Link from '../components/Link'

const Grid = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
})

const Row = styled('div')({
  flexGrow: 1,
  textAlign: 'center',
  padding: 20
})

function MainPage ({ data, loading, error }) {
  if (error) {
    return <div>error</div>
  }

  return (
    <Fragment>
      {loading && <div>Loading homepage...</div>}

      {data.pageBy && (
        <Grid>
          <Row>
            <h1>Consultancy</h1>
          </Row>
          <Row>
            <Link href='/travel-tours/'>
              <h1>Travel & Tours</h1>
            </Link>
          </Row>
        </Grid>
      )}
    </Fragment>
  )
}

MainPage = createPage({
  withHeader: false,
  slug: 'homepage'
})(MainPage)

export default MainPage
