import { render, screen } from '@testing-library/react'
import { ButtonCustom } from 'share/ui/ButtonCustom'
import { ButtonTheme } from 'share/ui/ButtonCustom/ui/ButtonCustom'

describe('ButtonCustom Test', () => {
    test('Button initial test', () => {
        render(<ButtonCustom theme={ButtonTheme.BUTTONNAVBAR}>Test</ButtonCustom>)
        const button = screen.getByText('Test')
        expect(button).toBeInTheDocument()
    })
})
