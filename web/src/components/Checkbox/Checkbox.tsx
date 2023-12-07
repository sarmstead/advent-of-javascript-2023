import { CheckboxField, Label } from '@redwoodjs/forms'

const Checkbox = ({ name }) => {
  return (
    <>
      <CheckboxField name={name} />
      <Label name={name} className="dark:text-white">
        Send out a reminder for an event
      </Label>
    </>
  )
}

export default Checkbox
