import cls from '../models/windowLoader.module.scss'
import { Loader } from 'share/ui/Loader'

export const WindowLoader: React.FC = () => {
    return (<div className={cls.LoaderContainer}>
        <Loader/>
    </div>)
}
