import Heading from '@/components/ui/Heading/Heading.tsx'
import Surface from '@/components/ui/Surface/Surface.tsx'
import { Grid } from '@components/ui/Grid/Grid'
import Button from '@components/ui/Button/Button'

export const Component = () => {
    return <Grid columns={3}>
        <Surface>
            <Heading level={4} variant='secondary'>Создать тег</Heading>
        </Surface>
        <Surface>
            <Heading level={4} variant='secondary'>Создать тег</Heading>
        </Surface>
        <Surface>
            <Heading level={4} variant='secondary'>Создать тег</Heading>
        </Surface>
        <Surface>
            <Heading level={4} variant='secondary'>Создать тег</Heading>
        </Surface>
        <Surface>
            <Heading level={4} variant='secondary'>Создать тег</Heading>
        </Surface>
        <Surface>
            <Heading level={4} variant='secondary'>Создать тег</Heading>
        </Surface>
        <Button variant='outline'>Add Tag</Button>
    </Grid >
}
