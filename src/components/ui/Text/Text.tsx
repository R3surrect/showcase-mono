import stylesObj from './Text.module.css'
import { type As, type TextProps } from './Text.types';

const Text = ({
    as = 'p',
    weight = 'regular',
    color = 'darkgray',
    size = 4,
    children,
    align = 'start',
    ...props
}: TextProps) => {

    const Tag: As = as;
    return (
        <Tag
            className={stylesObj.text}
            data-size={size}
            data-color={color}
            data-weight={weight}
            style={{
                textAlign: align
            }}

            {...props}
        >
            {children}
        </Tag>
    )
}

export default Text;