import { useClassName } from 'share/lib/useClassName/useClassName'
import cls from '../models/inputCustom.module.scss'
import { memo } from 'react'

export enum InputCustomTheme {
    INTROINPUT = 'introInput'
}
interface InputCustomProps {
    children?: React.ReactNode
    theme: InputCustomTheme
    placeholder?: string
}
export const InputCustom: React.FC<InputCustomProps> = memo(({ children, theme, placeholder }: InputCustomProps) => {
    return (
        <div className={cls.inputContainer}>
            <label>{children}</label>
            <input placeholder={placeholder} className={useClassName({ cls: cls.inputC, mode: {}, classes: [cls[theme]] })}></input>
        </div>

    )
})
