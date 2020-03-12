/* eslint-env jest */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SimulationForm } from './SimulationForm'
import { act } from 'react-dom/test-utils'

function inputChange(dom, id, value) {
  fireEvent.change(dom.container.querySelector(`#${id}`), { target: { value } });
}

test('should invoke callback with form input on submit', async () => {
  const submitPromise = Promise.resolve();
  const onSubmit = jest.fn(() => submitPromise);
  const dom = render(<SimulationForm onSubmit={onSubmit} />)

  inputChange(dom, "input-number-of-runs", "123")

  fireEvent.click(dom.container.querySelector("#checkbox-change-door"));
  fireEvent.click(dom.getByText('Run'))

  await act(() => submitPromise);

  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit.mock.calls[0][0]).toEqual({
    numberOfRuns: 123,
    changeDoor: true
  });
})
