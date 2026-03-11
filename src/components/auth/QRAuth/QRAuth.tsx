import styledObj from "./qrAuth.module.css"

const QrAuth = ({ text }: { text: string }) => {
    return <div className={styledObj.QrAuth}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/250px-QR_code_for_mobile_English_Wikipedia.svg.png" />
        <span>{text}</span>
    </div>
}

export default QrAuth;