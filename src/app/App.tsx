import './styles/index.scss'
import { NavBar } from 'widgets/NavBar'
import { MainPage } from 'pages/MainPage'

export const App: React.FC = () => {
    return (<>
        <NavBar/>
        <MainPage/>
    </>)
}
