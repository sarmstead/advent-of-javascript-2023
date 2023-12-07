import { MetaTags } from '@redwoodjs/web'

import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

const NewEventPage = () => {
  return (
    <>
      <MetaTags title="NewEvent" description="NewEvent page" />
      <AuthLayout></AuthLayout>
    </>
  )
}

export default NewEventPage
