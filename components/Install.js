import { useState, useEffect, Fragment } from 'react'
import useAddToHomescreenPrompt from '../hooks/useAddToHomescreenPrompt'

function PWA (props) {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt()
  const [isVisible, setVisibleState] = useState(false)

  const hide = () => setVisibleState(false)

  useEffect(
    () => {
      if (prompt) {
        setVisibleState(true)
      }
    },
    [prompt]
  )

  if (!isVisible) {
    return <div />
  }

  return (
    <Fragment>
      <div
        style={{ marginTop: 50, display: 'flex', justifyContent: 'flex-end' }}
      >
        <button onClick={promptToInstall}>Install PWA</button>
      </div>
    </Fragment>
  )
}

export default PWA
