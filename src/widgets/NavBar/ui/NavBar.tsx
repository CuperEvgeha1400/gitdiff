import cls from '../models/NavBar.module.scss'
import { ButtonCustom } from 'share/ui/ButtonCustom'
import { ButtonTheme } from 'share/ui/ButtonCustom/ui/ButtonCustom'
import { Portal } from 'share/ui/Portal'
import { Modal } from 'widgets/Modal'
import { useState } from 'react'
import { ModalLogin } from 'features/ModalLogin'

export const NavBar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const clickHandler = () => {
        setOpen((prevState) => !prevState)
    }
    return (<>
        <div data-testid='NavbarDiv' className={cls.Navbar}>
            <div className={cls.NavbarContainer}>
                <ButtonCustom onClick={clickHandler} theme={ButtonTheme.BUTTONNAVBAR}>login</ButtonCustom>
            </div>
        </div>
        <Portal parent={document.body}> <Modal onClick={clickHandler} open={open}><ModalLogin/></Modal> </Portal>

    </>)
}
