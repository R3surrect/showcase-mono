import stylesObj from './Banner.module.css'
import Stack from '@components/entities/Stack/Stack';
import type { BannerProps, BannerVars } from './Banner.types';
import { VARIANT_ICONS } from './Banner.constants';
import { useHintStore } from '@/store/useHintStore';
import { LucideX } from 'lucide-react';
import Button from '../Button/Button';

const Banner = (props: BannerProps) => {
    const { width = 'max' } = props;
    const Icon = VARIANT_ICONS[props.variant];
    const variant = props.variant || 'hint';

    const dismiss = useHintStore(store => store.dismissHint);

    const isDismissed = useHintStore(
        store => props.hintId
            ? store.data[props.hintId]
            : false
    );

    if (variant === 'hint' && isDismissed) return null;
    
    return (
        <div
            className={stylesObj.banner}
            data-variant={props.variant}
            style={{
                '--banner-width': width === 'max' ? '100%' : 'fit-content'
            } as BannerVars}
        >
            <Stack direction='row' justify='space-between' align='center'>
                <Stack direction='row' align='center' gap='sm'>
                    <Icon size={20} />
                    {props.children}
                </Stack>
                <Button
                    variant='transparent'
                    onClick={() => {
                        console.log('test');
                        if (variant === 'hint' && props.hintId) {
                            dismiss(props.hintId);
                        }
                    }}
                >
                    <LucideX size={14} />
                </Button>
            </Stack>
        </div>
    );
}

export default Banner;