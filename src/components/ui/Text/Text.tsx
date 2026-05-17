import stylesObj from './Text.module.css'
import { textSizeMap, weightsMap, type As, type FontVariables, type TextProps } from './Text.types';

const Text = ({ as = 'p', weight = 'regular', textSize = 4, children, ...props }: TextProps) => {
    const Tag: As = as;
    const renderElement = <Tag
        className={stylesObj.textWrapper}
        style={{
            '--text-weight': weightsMap[weight],
            '--text-size': textSizeMap[textSize],
        } as FontVariables}
        
        {...props}
    >
        {children}
    </Tag>

    return renderElement;
}

export default Text;