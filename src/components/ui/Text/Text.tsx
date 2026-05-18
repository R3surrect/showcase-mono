// #region Imports
import stylesObj from './Text.module.css'
import {
    colorsMap,
    sizeMap,
    weightsMap,
    type As,
    type FontVariables,
    type TextProps
} from './Text.types';

// #endregion

const Text = ({
    as = 'p',
    weight = 'regular',
    color = 'darkgray',
    size = 4,
    children,
    ...props
}: TextProps) => {
    const Tag: As = as;
    const renderElement = <Tag
        className={stylesObj.textWrapper}
        style={{
            '--text-weight': weightsMap[weight],
            '--text-size': sizeMap[size],
            '--text-color': colorsMap[color],
        } as FontVariables}
        {...props}
    >
        {children}
    </Tag>

    return renderElement;
}

export default Text;