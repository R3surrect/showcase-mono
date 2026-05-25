import Heading from '@/components/ui/Heading/Heading'
import Surface from '@/components/ui/Surface/Surface';
import Stack from '@/components/ui/Stack/Stack';
import Hr from '@/components/ui/Hr/Hr';
import PropertyField from '@/components/ui/PropertyField/PropertyField';
import { Fragment } from 'react';

const fieldsData = [
    {
        title: 'Каналы уведомлений',
        body: [
            {
                title: 'Push-уведомления',
                subtitle: 'Уведомления в браузере или мобильном приложении'
            },
            {
                title: 'Email-уведомления',
                subtitle: 'Отправлять уведомления на вашу почту'
            },
            {
                title: 'Звуковые сигналы',
                subtitle: 'Воспроизводить звук при получении уведомлений'
            },
            {
                title: 'Вибрация',
                subtitle: 'Вибрировать при уведомлении на мобильных устройствах'
            },
        ]
    },
    {
        title: 'Время отчётов',
        body: [
            {
                title: 'Время ежедневного итог',
                subtitle: 'Когда отправлять утреннюю сводку'
            },
            {
                title: 'День еженедельного отчёта',
                subtitle: 'В какой день присылать отчёт за неделю'
            },
        ]
    },
    {
        title: 'Типы уведомлений',
        body: [
            {
                title: 'Напоминания о задачах',
                subtitle: 'Уведомлять за указанное время до дедлайна'
            },
            {
                title: 'Просроченные задачи',
                subtitle: 'Уведомлять о задачах с истёкшим сроком'
            },
            {
                title: 'Ежедневный итог',
                subtitle: 'Сводка задач на день каждое утро'
            },
            {
                title: 'Еженедельный отчёт',
                subtitle: 'Отчёт по продуктивности в конце недели'
            },
            {
                title: 'Только упоминания',
                subtitle: 'Уведомлять только при прямом обращении'
            },
        ]
    },

]

export const Component = () => {
    return <>
        {
            fieldsData.map((item) => (
                <Surface key={item.title}>
                    <Stack>
                        <Heading level={4} variant='secondary'>{item.title}</Heading>
                        {item.body.map(property => (
                            <Fragment key={property.title}>
                                <Hr variant='accent' thickness='thin' />

                                <PropertyField
                                    title={property.title}
                                    subtitle={property.subtitle}
                                >
                                    {(id) => <input
                                        id={id}
                                        type='checkbox'
                                        onChange={() => { console.log('it\'s me, Mario') }}
                                    />}
                                </PropertyField>
                            </Fragment>
                        ))}
                    </Stack>
                </Surface>
            ))
        }

    </>
}

// export default Component;
