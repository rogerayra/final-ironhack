import { useState } from 'react'

function useForm(initial) {
  if (!initial) initial = {}
  const [form, setForm] = useState(initial)

  const handleInput = e => {
    e.persist()
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleCascader = (values, field) => {
    setForm(prevState => ({
      ...prevState,
      [field]: values[0]
    }))
  }

  const handleLocCascader = (values, multiple) => {
    if (multiple) multipleSelection(values)
    else singleSelection(values)
  }

  const singleSelection = values => {
    let loc
    if (values && values.length > 0) {
      const [field, value] = values[values.length - 1].split('-')
      loc = { [field]: value }
    } else loc = {}

    setForm(prevState => ({
      ...prevState,
      loc
    }))
  }

  const multipleSelection = values => {
    let loc
    if (values && values.length > 0) {
      const [field, value] = values[values.length - 1].split('-')
      loc = { ...form.loc, [field]: value }
    }

    setForm({
      ...form,
      loc
    })
  }

  const handleDateRange = values => {
    let dates
    if (values && values.length === 2) {
      dates = {
        start: values[0],
        end: values[1]
      }
    } else dates = {}
    setForm(prevState => ({
      ...prevState,
      dates
    }))
  }

  return [form, handleInput, handleCascader, handleLocCascader, handleDateRange]
}

export default useForm
