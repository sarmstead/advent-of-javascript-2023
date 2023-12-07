import type { Meta, StoryObj } from '@storybook/react'

import NewEventPage from './NewEventPage'

const meta: Meta<typeof NewEventPage> = {
  component: NewEventPage,
}

export default meta

type Story = StoryObj<typeof NewEventPage>

export const Primary: Story = {}
