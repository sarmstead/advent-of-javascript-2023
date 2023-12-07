import {
  DateField,
  FieldError,
  Form,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

import Checkbox from 'src/components/Checkbox/Checkbox'
import HeaderWithRulers from 'src/components/HeaderWithRulers/HeaderWithRulers'
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

const NewEventPage = () => {
  return (
    <>
      <MetaTags title="NewEvent" description="NewEvent page" />
      <AuthLayout>
        <HeaderWithRulers
          className="mb-8 text-white"
          heading="set up your group"
        />
        <Form className="m-auto flex max-w-[661px] flex-col gap-4">
          <Label
            name="name"
            className="inline-flex max-h-[100px] w-full items-center gap-10 bg-white p-5"
          >
            <div className="min-w-[200px] bg-white text-3xl">Group Name</div>
            <TextField name="name" validation={{ required: true }} />
            <FieldError name="name" className="dark:text-white" />
          </Label>
          <Label
            name="date"
            className="flex max-h-[100px] w-full items-center gap-10 bg-white p-5"
          >
            <span className="min-w-[200px] bg-white text-3xl">Event Date</span>
            <DateField
              name="date"
              className="min-h-[100px] w-full pl-7 font-sans"
              validation={{ required: true }}
            />
            <FieldError name="date" className="dark:text-white" />
          </Label>
          <Label name="reminder" className="mt-2">
            <Checkbox name="reminder" />
          </Label>
          <Submit>Submit</Submit>
        </Form>
      </AuthLayout>
    </>
  )
}

export default NewEventPage
