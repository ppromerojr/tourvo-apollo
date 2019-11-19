import parse from 'html-react-parser'

const Body = ({ children }) => {
  const body = parse(children)

  return body
}

export default Body
