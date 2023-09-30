import { useClassName } from 'share/lib/useClassName/useClassName'
import cls from '../models/imgCustom.module.scss'
export enum ImgCustomTheme {
    INTROIMG = 'introImg',
    SEARCHIMG = 'searchImg'
}
interface ImgCustomProps {
    classe?: string
    path: string
    theme: ImgCustomTheme
}
export const ImgCustom: React.FC<ImgCustomProps> = ({ classe, path, theme }: ImgCustomProps) => {
    return (<img className={ useClassName({ cls: cls.imgC, mode: {}, classes: [classe, cls[theme]] })} src={ path }/>)
}
