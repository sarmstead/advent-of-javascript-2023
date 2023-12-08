import {
  DateField,
  FieldError,
  Form,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Checkbox from 'src/components/Checkbox/Checkbox'
import HeaderWithRulers from 'src/components/HeaderWithRulers/HeaderWithRulers'
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEventMutation(
    $name: String!
    $date: DateTime!
    $sendReminder: Boolean!
  ) {
    createEvent(
      input: { name: $name, date: $date, sendReminder: $sendReminder }
    ) {
      id
    }
  }
`

const NewEventPage = () => {
  const [createEvent, { loading }] = useMutation(CREATE_EVENT_MUTATION, {
    onCompleted: (data) => {
      navigate(routes.eventInvite({ id: data.createEvent.id }))
    },
    onError: (error) => {
      console.error({ error })
      toast.error(error.message)
    },
  })
  const handleSubmit = (data) => {
    createEvent({
      variables: {
        name: data.name,
        date: data.date,
        sendReminder: data.sendReminder,
      },
    })
  }
  return (
    <>
      <MetaTags title="Create a New Event" />
      <AuthLayout>
        <HeaderWithRulers
          className="mb-8 text-white"
          heading="set up your event"
        />
        <Form onSubmit={handleSubmit}>
          <fieldset
            disabled={loading}
            className="m-auto flex max-w-[661px] flex-col gap-4"
          >
            <Label
              name="name"
              className="inline-flex max-h-[100px] w-full items-center gap-10 bg-white p-5"
            >
              <div className="min-w-[200px] bg-white text-3xl">Group Name</div>
              <TextField name="name" className="w-full" />
              <FieldError name="name" className="dark:text-white" />
            </Label>
            <Label
              name="date"
              className="flex max-h-[100px] w-full items-center gap-10 bg-white p-5"
            >
              <span className="min-w-[200px] bg-white text-3xl">
                Event Date
              </span>
              <DateField
                name="date"
                className="min-h-[100px] w-full pl-7 font-sans"
              />
              <FieldError name="date" className="dark:text-white" />
            </Label>
            <Label name="sendReminder" className="mt-2">
              <Checkbox name="sendReminder" />
            </Label>
            <Submit>Submit</Submit>
          </fieldset>
        </Form>
      </AuthLayout>
    </>
  )
}

export default NewEventPage
