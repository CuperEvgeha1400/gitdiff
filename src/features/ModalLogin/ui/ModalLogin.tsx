import { InputCustom, InputCustomTheme } from 'share/ui/InputCustom/ui/InputCustom'
import { ButtonCustom } from 'share/ui/ButtonCustom'
import { ButtonTheme } from 'share/ui/ButtonCustom/ui/ButtonCustom'
import cls from '../models/modalLogin.module.scss'
export const ModalLogin: React.FC = () => {
    return (<div onClick={(e) => { e.stopPropagation() } } className= {cls.modalLoginContainer}>
        <h1>Inter the token</h1>
        <InputCustom theme={InputCustomTheme.INTROINPUT}/>
        <ButtonCustom classe={ cls.buttonModal } theme={ButtonTheme.BUTTONAUTO}>Auto</ButtonCustom>
    </div>)
}
