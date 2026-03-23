import stylesObj from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({message} : ErrorMessageProps) => {
  return <span className={stylesObj.ErrorMessage} role='alert'>{message || ''}</span>
}

export default ErrorMessage;
