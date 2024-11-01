import { useEffect, useState } from 'react'

export const usePageLoaded = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // callback function to call when event triggers
    const onPageLoad = () => {
      setIsLoaded(true)
    }

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad()
    } else {
      window.addEventListener('load', onPageLoad, false)
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad)
    }
  }, [])

  return isLoaded
}
