import Heading from '@/components/ui/Heading/Heading.tsx';
import stylesObj from './ContentHeader.module.css';

interface ContentHeaderProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export const ContentHeader = ({ title, subtitle, children }: ContentHeaderProps) => {
    return <div className={stylesObj.wrapper}>
        <Heading
            variant='secondary'
            level={2}
            subtitle={subtitle}
        >
            {title}
        </Heading>
        <div className={stylesObj.content}>
            {children}
        </div>
    </div>

}
