import { Link, type LinkProps } from 'react-router-dom'
import stylesObj from './AuthSwitcher.module.css';

interface AuthSwitcherProps extends LinkProps {
  mainText?: string;
  linkText: string;
}

const AuthSwitcher = ({ mainText, linkText, to }: AuthSwitcherProps) => {
  return <p className={stylesObj.switcher}>
    {mainText} <Link to={to}>{linkText}</Link>
  </p>
}

export default AuthSwitcher;
