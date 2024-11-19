import './style.scss'
import Logo from '../../assets/logo.png';

export const LogoContainer = () => {
    return (
        <>
            <div className="__logo-container">
                <img className="logo" alt="Union" src={Logo} />
            </div>
        </>
    )
}