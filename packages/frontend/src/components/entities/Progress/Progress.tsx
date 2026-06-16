import stylesObj from './Progress.module.css';
import { DEFAULT_HSL_COLOR } from '../_shared/system.constants';
import { getHslString } from '../ColorList/ColorList.constants';
import type { ProgressProps, ProgressVars } from './Progress.types';

const Progress = ({ color, all, value }: ProgressProps) => {
    const valuePercentage = (value / all) * 100;

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
            style={{
                '--progress-value-width': `${valuePercentage}%`,
                '--progress-color': getHslString(color || DEFAULT_HSL_COLOR),
            } as ProgressVars}
        ></div>
    </div>
}

export default Progress;