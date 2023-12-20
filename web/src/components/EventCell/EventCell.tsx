import type { FindEventQuery, FindEventQueryVariables } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindEventQuery($id: String!) {
    event: event(id: $id) {
      date
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  navigate(routes.newEvent())
}

export const Failure = ({
  error,
}: CellFailureProps<FindEventQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  event,
}: CellSuccessProps<FindEventQuery, FindEventQueryVariables>) => {
  const secToMs = 1000
  const minToMs = 60 * secToMs
  const hourToMs = 60 * minToMs
  const dayToMs = 24 * hourToMs

  const today = new Date()
  const thisYear = today.getFullYear()
  const thisDate = today.getDate()
  const thisMonth = today.getMonth()
  const todayAtMidnight = new Date(thisYear, thisMonth, thisDate, 0, 0, 0, 0)
  const todayAtMidnightMs = Date.parse(todayAtMidnight)

  const payloadToLocalMs = (isoDateString) => {
    const payloadSplit = isoDateString.split('-')
    const payloadYear = payloadSplit[0]
    const payloadIndexedMonth = payloadSplit[1] - 1
    const payloadDate = payloadSplit[2].split('T')[0]

    // It seems that the Date API defaults to the current timezone.
    // As such, we take the year, month, and day and set it to midnight local time
    const payloadToLocalDate = new Date(
      payloadYear,
      payloadIndexedMonth,
      payloadDate,
      0,
      0,
      0,
      0
    )

    return Date.parse(payloadToLocalDate)
  }

  const msUntil = payloadToLocalMs(event.date) - todayAtMidnightMs
  const totalDaysUntil = msUntil / dayToMs
  const weeksUntil = Math.floor(totalDaysUntil / 7)
  const daysRemaining = totalDaysUntil % 7

  const dayOrDays = daysRemaining > 1 ? 'days' : 'day'
  const weekOrWeeks = weeksUntil > 1 ? 'weeks' : 'week'

  let message
  if (daysRemaining === 0 && weeksUntil === 0) {
    message = `Today's the day for`
  } else if (daysRemaining === 0 && weeksUntil >= 1) {
    message = `${weeksUntil} ${weekOrWeeks} until`
  } else if (daysRemaining >= 1 && weeksUntil === 0) {
    message = `${daysRemaining} ${dayOrDays} until`
  } else if (daysRemaining >= 1 && weeksUntil >= 1) {
    message = `${weeksUntil} ${weekOrWeeks} and ${daysRemaining} ${dayOrDays} until`
  } else {
    message = `Looks like this event is finished!`
  }

  return (
    <section>
      <span className="font-handwriting text-2xl uppercase tracking-tighter dark:text-white">
        {message}
      </span>
      <h1 className="font-condensed text-5xl uppercase dark:text-white md:text-7xl lg:text-9xl">
        {event.name}
      </h1>
    </section>
  )
}
