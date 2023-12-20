import { MetaTags } from '@redwoodjs/web'

import EventCell from 'src/components/EventCell/EventCell'
import InteriorLayout from 'src/layouts/InteriorLayout/InteriorLayout'

const EventInvitePage = ({ id }) => {
  return (
    <>
      <MetaTags title="EventInvite" description="EventInvite page" />

      <InteriorLayout>
        <EventCell id={id} />
      </InteriorLayout>
    </>
  )
}

export default EventInvitePage
