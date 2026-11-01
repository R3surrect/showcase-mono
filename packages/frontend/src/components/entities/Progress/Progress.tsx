import stylesObj from './Progress.module.css';
import { DEFAULT_HSL_COLOR } from '../_shared/system.constants';
import type { ProgressProps, ProgressVars } from './Progress.types';
import { colord } from 'colord';

const Progress = ({ color, all, value }: ProgressProps) => {
    const valuePercentage = (value / all) * 100;
    const style: ProgressVars = {
        '--progress-value-width': `${valuePercentage}%`,
        '--progress-color': colord(color || DEFAULT_HSL_COLOR.color).toHslString(),
    };
    
    return <div
        role="progressbar"
        aria-valuenow={Math.round(valuePercentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={stylesObj.progress}
    >
        <div
            className={stylesObj.value}
            id='value'
            style={style}
        ></div>
    </div>
}

export default Progress;