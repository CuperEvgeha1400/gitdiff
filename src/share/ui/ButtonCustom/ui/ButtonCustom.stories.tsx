import type { Meta, StoryObj } from '@storybook/react'

import { ButtonCustom, ButtonTheme } from './ButtonCustom'
import { AlignDecorator } from '../../../../../config/storybook/decorators/AlignDecorator'

const meta: Meta<typeof ButtonCustom> = {
    component: ButtonCustom
}

export default meta
type Story = StoryObj<typeof ButtonCustom>

export const ButtonNavbar: Story = {
    args: {
        children: 'View Button',
        theme: ButtonTheme.BUTTONNAVBAR
    },
    decorators: [
        (Story) => (
            <AlignDecorator>
                <Story/>
            </AlignDecorator>
        )
    ]
}

export const ButtonAuto: Story = {
    args: {
        children: 'View Button',
        theme: ButtonTheme.BUTTONAUTO
    },
    decorators: [
        (Story) => (
            <AlignDecorator>
                <Story/>
            </AlignDecorator>
        )
    ]
}
