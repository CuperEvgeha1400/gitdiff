import cls from '../models/model.module.scss'
import { useEffect, useState } from 'react'
import { useClassName } from 'share/lib/useClassName/useClassName'
interface ModelProps {
    children: React.ReactNode
    lazy?: boolean
    open: boolean
    onClick: () => void
}
export const Modal: React.FC<ModelProps> = ({ children, lazy, open, onClick }: ModelProps) => {
    const [hide, setHide] = useState<boolean>(true)
    useEffect(() => {
        if (open && lazy) {
            setHide(false)
        }
        if (!open && lazy) {
            setHide(true)
        }
    }, [open])
    if (hide && !open) {
        return null
    }
    return (<>
        <div data-testid= 'ModalTest' onClick={onClick} className={useClassName({ cls: cls.ModelContainer, mode: { [cls.Open]: open }, classes: [] })}>
            <div className={cls.ContentContainer}>
                {children}
            </div>
        </div>
    </>)
}
