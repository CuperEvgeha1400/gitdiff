import cls from '../models/loader.module.scss'
import { useClassName } from 'share/lib/useClassName/useClassName'
interface LoaderProps {
    classe?: string
}
export const Loader: React.FC<LoaderProps> = ({ classe }: LoaderProps) => {
    return (<div className={ useClassName({ cls: cls.ldsRing, mode: {}, classes: [classe] })}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>)
}
