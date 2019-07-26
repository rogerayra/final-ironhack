import { useState } from 'react'

function useForm() {
  const [form, setForm] = useState({})

  const handleInput = e => {
    e.persist()
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleCascader = (value, field) => {
    setForm(prevState => ({
      ...prevState,
      [field]: value[0]
    }))
  }

  return [form, handleInput, handleCascader]
}

export default useForm
