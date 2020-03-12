import React, { useState } from "react";
import "./SimulationForm.css"

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue)
  return { value, onChange: setValue }
}

function Input({ id, label, type, value, onChange }) {
  function handleChange(e) {
    return onChange(parseInt(e.currentTarget.value))
  }

  return (
      <div className="form-group">
        <label className="form-label" htmlFor={id}>{label}</label>
        <input type={type} id={id} className="form-input" value={value} onChange={handleChange} />
      </div>
  )
}

function Checkbox({ id, label, value, onChange }) {
  function handleChange(e) {
    onChange(e.currentTarget.checked)
  }

  return (
    <div className="form-group">
      <input type="checkbox" id={id} className="checkbox-input" value={value} onChange={handleChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export function SimulationForm({ onSubmit }) {
  const runsInput = useInput(100);
  const changeDoorInput = useInput(false);

  const [isSubmitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({ numberOfRuns: runsInput.value, changeDoor: changeDoorInput.value });
    } finally {
      setSubmitting(false)
    }
  }
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Input type="number" id="input-number-of-runs" label="Number of simulations" {...runsInput} />
        <Checkbox id="checkbox-change-door" label="Change door after reveal" {...changeDoorInput} />
        <button type="submit" className="form-button" disabled={!onSubmit || isSubmitting}>Run</button>
      </form>
    )
  }

