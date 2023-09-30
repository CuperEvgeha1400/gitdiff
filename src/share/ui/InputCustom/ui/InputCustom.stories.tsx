import type { Meta, StoryObj } from '@storybook/react'

import { InputCustom, InputCustomTheme } from './InputCustom'
import { AlignDecorator } from '../../../../../config/storybook/decorators/AlignDecorator'

const meta: Meta<typeof InputCustom> = {
    component: InputCustom
}

export default meta
type Story = StoryObj<typeof InputCustom>

export const inputCustom: Story = {
    args: {
        placeholder: 'Search...',
        theme: InputCustomTheme.INTROINPUT
    },
    decorators: [
        (Story) => (
            <AlignDecorator>
                <Story/>
            </AlignDecorator>
        )
    ]
}
