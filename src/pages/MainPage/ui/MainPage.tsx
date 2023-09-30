import Logo from '../models/img/GitLogo.png'
import { ImgCustom, ImgCustomTheme } from 'share/ui/ImgCustom/ui/ImgCustom'
import cls from '../models/styles/mainPage.module.scss'
import { InputCustom, InputCustomTheme } from 'share/ui/InputCustom/ui/InputCustom'
import loop from '../models/img/search.png'

export const MainPage: React.FC = () => {
    return (<div className={cls.intro}>
        <div className={cls.introContainer}>
            <div className={cls.flexIntro}> <ImgCustom path={Logo} theme={ImgCustomTheme.INTROIMG}/>  <h1> / Diff</h1></div>
            <div className={cls.flexIntro}> <InputCustom placeholder='Search...' theme={ InputCustomTheme.INTROINPUT}> <ImgCustom path={loop} theme={ImgCustomTheme.SEARCHIMG}/></InputCustom></div>
        </div>
    </div>)
}
