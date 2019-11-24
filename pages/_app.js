import React, { useEffect, Fragment } from 'react'
import App from 'next/app'

function MyApp (props) {
  const { Component, pageProps } = props
  let deferredPrompt

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', installPrompt)

    return window.removeEventListener('beforeinstallprompt', installPrompt)
  })

  function addToHomeScreen () {
    var a2hsBtn = document.querySelector('.prompt') // hide our user interface that shows our A2HS button
    a2hsBtn.style.display = 'none' // Show the prompt
    deferredPrompt.prompt() // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then(function (choiceResult) {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }

      deferredPrompt = null
    })
  }

  function installPrompt (e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt = e

    showAddToHomeScreen()
  }

  function showAddToHomeScreen () {
    var a2hsBtn = document.querySelector('.prompt')

    a2hsBtn.style.display = 'block'

    a2hsBtn.addEventListener('click', addToHomeScreen)
  }

  return (
    <Fragment>
      <Component {...pageProps} />
      <div style={{ marginTop: 20 }} className='prompt'>
        Install
      </div>
    </Fragment>
  )
}

export default MyApp
