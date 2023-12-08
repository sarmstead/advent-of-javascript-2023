import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const EventInvitePage = () => {
  return (
    <>
      <MetaTags title="EventInvite" description="EventInvite page" />

      <h1>EventInvitePage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/EventInvitePage/EventInvitePage.tsx</code>
      </p>
      <p>
        My default route is named <code>eventInvite</code>, link to me with `
        <Link to={routes.eventInvite()}>EventInvite</Link>`
      </p>
    </>
  )
}

export default EventInvitePage
