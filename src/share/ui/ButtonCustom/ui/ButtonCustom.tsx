import cls from '../models/buttonCustom.module.scss'
import { useClassName } from 'share/lib/useClassName/useClassName'
import { type HTMLAttributes } from 'react'
export enum ButtonTheme {
    BUTTONNAVBAR = 'NavBarButton',
    BUTTONAUTO = 'AutoButton'
}
type button = Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'>
interface ButtonCustomProps extends button {
    classe?: string
    children?: React.ReactNode
    theme: ButtonTheme
    onClick?: () => void
}
export const ButtonCustom: React.FC<ButtonCustomProps> = ({ classe, theme, children, onClick, ...otherProps }: ButtonCustomProps) => {
    return (<button data-testid= 'ButtonTest' onClick={onClick} className={useClassName({ cls: cls.but, mode: {}, classes: [classe, cls[theme]] })}>
        {children}
    </button>)
}
