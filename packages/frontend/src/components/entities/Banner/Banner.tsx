import stylesObj from './Banner.module.css'
import Stack from '@components/entities/Stack/Stack';
import type { BannerProps, BannerVars } from './Banner.types';
import { VARIANT_ICONS } from './Banner.constants';
import { useHintStore } from '@/store/useHintStore';
import { LucideX } from 'lucide-react';
import Button from '../Button/Button';

const Banner = (props: BannerProps) => {
    const { width = 'max' } = props;
    const variant = props.variant || 'hint';
    const Icon = VARIANT_ICONS[variant];

    const isDismissed = useHintStore(store => store.isHintDismissed);
    const dismiss = useHintStore(store => store.dismissHint);

    if (props.variant === 'hint' && isDismissed(props.hintId)) return null;

    return (
        <div
            className={stylesObj.banner}
            data-variant={variant}
            style={{
                '--banner-width': width === 'max' ? '100%' : 'fit-content'
            } as BannerVars}
        >
            <Stack direction='row' justify='space-between' align='center'>
                <Stack direction='row' align='center'>
                    <Icon size={20} />
                    {props.children}
                </Stack>
                <Button variant='transparent'>
                    <LucideX
                        size={14}
                        onClick={() => {
                            console.log('test');
                            return props.variant === 'hint' && dismiss(props.hintId)
                        }}
                    />
                </Button>
            </Stack>
        </div>
    );
}

export default Banner;