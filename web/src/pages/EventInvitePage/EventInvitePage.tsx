import { MetaTags } from '@redwoodjs/web'

import InteriorLayout from 'src/layouts/InteriorLayout/InteriorLayout'

const EventInvitePage = ({ id }) => {
  console.log({ id })
  return (
    <>
      <MetaTags title="EventInvite" description="EventInvite page" />

      <InteriorLayout></InteriorLayout>
    </>
  )
}

export default EventInvitePage
