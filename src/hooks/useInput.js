import { useState } from 'react'

function useInput (defaultValue = '') {
  const [value, setValue] = useState(defaultValue)

  function onValueChange (event) {
    setValue(event.target.value)
  }

  function resetValue () {
    setValue(defaultValue)
  }

  return [value, onValueChange, setValue, resetValue]
}

export default useInput
