import stylesObj from './Banner.module.css'
import Stack from '@components/entities/Stack/Stack';
import type { BannerProps, BannerVars } from './Banner.types';
import { VARIANT_ICONS } from './Banner.constants';
import { LucideX } from 'lucide-react';
import Button from '../Button/Button';

const Banner = ({ variant = 'hint', onClose, children, width = 'max', isClosable = true, ...props }: BannerProps) => {
    const Icon = VARIANT_ICONS[variant];
    return (
        <div
            className={stylesObj.banner}
            data-variant={variant}
            style={{ '--banner-width': width === 'max' ? '100%' : 'fit-content' } as BannerVars}
            {...props}
        >
            <Stack direction='row' justify='space-between' align='center'>
                <Stack direction='row' align='center' gap='sm'>
                    <Icon size={20} />
                    {children}
                </Stack>
                {
                    isClosable &&
                    <Button variant='transparent' onClick={onClose} radius='lg' size='sm' isHoverAnimated={false}>
                        <LucideX size={14} />
                    </Button>
                }
            </Stack>
        </div>
    );
}

export default Banner;