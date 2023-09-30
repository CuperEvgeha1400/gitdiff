import { fireEvent, render, screen } from '@testing-library/react'
import { NavBar } from 'widgets/NavBar'

describe('NavBar Test', () => {
    test('Initial Test', () => {
        render(<NavBar/>)
        const NavbarDiv = screen.getByTestId('NavbarDiv')
        expect(NavbarDiv).toBeInTheDocument()
    })
    test('Open Modal Test', () => {
        render(<NavBar/>)
        const button = screen.getByTestId('ButtonTest')
        expect(button).toBeInTheDocument()

        fireEvent.click(button)
        const Modal = screen.getByTestId('ModalTest')
        expect(Modal).toBeInTheDocument()
    })
})
