import { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import GET_PAGE from '../graphql/page.queries'

const Page = ({ slug }) => {
  const { data, loading, error } = useQuery(GET_PAGE, {
    variables: { uri: slug }
  })

  useEffect(() => {
    console.log(data)
  }, [])
  return <div>this is page - {slug}</div>
}

export default Page
