import React, { useState, useEffect } from 'react'

export default function useAddToHomescreenPrompt () {
  const [prompt, setState] = useState(null)

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt()
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    )
  }

  useEffect(() => {
    const ready = e => {
      console.log(e)
      e.preventDefault()

      setState(e)
    }

    window.addEventListener('beforeinstallprompt', ready)

    return () => {
      window.removeEventListener('beforeinstallprompt', ready)
    }
  }, [])

  return [prompt, promptToInstall]
}
