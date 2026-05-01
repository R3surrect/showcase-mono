import Heading from '@/components/ui/Heading/Heading.tsx'
import Surface from '@/components/ui/Surface/Surface.tsx'
// import { Grid } from '@components/ui/Grid/Grid'
// import Button from '@components/ui/Button/Button'
import Input from '@components/ui/Input/Input'
import { ColorPicker } from '@components/ui/ColorPicker/ColorPicker'
import Stack from '@components/ui/Stack/Stack'
import { Tag } from '@components/ui/Tag/Tag'

const tagMock = [
    { id: '19452902136', label: 'Важное', emoji: '🎆', color: 'var(--warm-green-700)' },
    { id: '19456202376', label: 'Важное', emoji: '🥼', color: 'var(--warm-green-300)' },
    { id: '14562902386', label: 'Важное', emoji: '🥽', color: 'var(--warm-green-600)' },
    { id: '19456292356', label: 'Важное', emoji: '👗', color: 'var(--warm-orange-400)' },
    { id: '19456202356', label: 'Важное', emoji: '🧦', color: 'var(--warm-green-300)' },
    { id: '19462902256', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '14562902356', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '19456290356', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '19562902356', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '19452902356', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '19456290246', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '19456902356', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '194562490256', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '194565290256', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '194561290256', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '1945621902516', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '194562940256', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '194546290256', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '1945462902156', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '194562390256', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '194563290256', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
    { id: '194562190256', label: 'Важное', emoji: '🧩', color: 'var(--warm-green-300)' },
]

export const Component = () => {
    return <>
        <Surface>
            <Stack gap='md'>
                <Heading level={5} variant='secondary'>Создать тег</Heading>
                <Input labelText='Название' placeholder='Новый тег' type='text' />
                <ColorPicker />
            </Stack>
        </Surface>

        <Surface>
            <Stack gap='md'>
                <Heading level={5} variant='secondary'>Существующие теги</Heading>
                <Stack direction='row' gap='sm' wrap={true}>
                    {
                        tagMock.map((item) => (
                            <Tag {...item} key={item.id} />
                        ))
                    }
                </Stack>
            </Stack>
        </Surface>
    </>
}
