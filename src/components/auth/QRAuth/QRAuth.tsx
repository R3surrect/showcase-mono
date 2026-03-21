import styledObj from "./qrAuth.module.css"

const QrAuth = ({ text }: { text: string }) => {
    return <div className={styledObj.QrAuth}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Rickrolling_QR_code.png" />
        <span>{text}</span>
    </div>
}

export default QrAuth;
