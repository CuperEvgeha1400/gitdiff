import type { Meta, StoryObj } from '@storybook/react'

import { Loader } from './Loader'
import { AlignDecorator } from '../../../../../config/storybook/decorators/AlignDecorator'

const meta: Meta<typeof Loader> = {
    component: Loader
}

export default meta
type Story = StoryObj<typeof Loader>

export const ButtonNavbar: Story = {
    args: {
    },
    decorators: [
        (Story) => (
            <AlignDecorator>
                <Story/>
            </AlignDecorator>
        )
    ]
}
