import Stack from '@components/entities/Stack/Stack';
import Text from '@components/entities/Text/Text';
import stylesObj from './Header.module.css';
import Button from '../../Button/Button';
import { useLogoutQuery } from '@/queries/auth/auth.query';

const Header = () => {
    const { mutate: logout } = useLogoutQuery();

    const date = new Date();
    const day = date.toLocaleString('ru-RU', { weekday: 'long' });
    const fullDay = day.charAt(0).toUpperCase() + day.slice(1);
    const fullDate = date.toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).replace(' г.', '');

    return (
        <div className={stylesObj.header}>
            <Stack direction='row' justify='space-between' align='center'>
                <div className={stylesObj.content}>
                    content
                </div>
                <Stack direction='column' gap='sm' align='center'>
                    <Text size={4} weight='bold'>{fullDay}</Text>
                    <Text size={5} weight='bolder'>{fullDate}</Text>
                </Stack>
                <Button variant='outline' onClick={() => logout()}>Logout</Button>
            </Stack>
        </div>
    )
}

export default Header;
