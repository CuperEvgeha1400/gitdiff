import type { Meta, StoryObj } from '@storybook/react'

import { ModalLogin } from './ModalLogin'
import { AlignDecorator } from '../../../../config/storybook/decorators/AlignDecorator'

const meta: Meta<typeof ModalLogin> = {
    component: ModalLogin
}

export default meta
type Story = StoryObj<typeof ModalLogin>

export const ButtonNavbar: Story = {
    args: {
        children: 'View Button'
    },
    decorators: [
        (Story) => (
            <AlignDecorator>
                <Story/>
            </AlignDecorator>
        )
    ]
}
