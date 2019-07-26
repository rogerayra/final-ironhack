import React, { useState } from 'react'
import { DatePicker, Cascader } from 'antd'
// import useForm from '../../hooks/useForm'

function VisitDetail({ visit }) {
  // const [form, handleInput, handleCascader] = useForm({})
  const [startValue, setStartValue] = useState(null)
  const [endValue, setEndValue] = useState(null)
  const [endOpen, setEndOpen] = useState(false)

  const customerOptions = []

  // state = {
  //   startValue: null,
  //   endValue: null,
  //   endOpen: false
  // }

  const disabledStartDate = startValue => {
    // const { endValue } = this.state
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  const disabledEndDate = endValue => {
    const { startValue } = this.state
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  // const onChange = (field, value) => {
  //   this.setState({
  //     [field]: value
  //   })
  // }

  const onStartChange = value => {
    setStartValue(value)
    // onChange('startValue', value)
  }

  const onEndChange = value => {
    setEndValue(value)
    // onChange('endValue', value)
  }

  const handleStartOpenChange = open => {
    if (!open) {
      setEndOpen(true)
      // this.setState({ endOpen: true })
    }
  }

  const handleEndOpenChange = open => {
    setEndOpen(open)
    // this.setState({ endOpen: open })
  }

  return (
    <div className="detail">
      {visit && (
        <div>
          <DatePicker
            disabledDate={disabledStartDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={startValue}
            placeholder="Start"
            onChange={onStartChange}
            onOpenChange={handleStartOpenChange}
          />
          <DatePicker
            disabledDate={disabledEndDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={endValue}
            placeholder="End"
            onChange={onEndChange}
            open={endOpen}
            onOpenChange={handleEndOpenChange}
          />
          <Cascader
            name="customer"
            options={customerOptions}
            // onChange={values => handleCascader(values, 'customer')}
            changeOnSelect
          />
        </div>
      )}
    </div>
  )
}

export default VisitDetail
