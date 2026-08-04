import type { HslColor } from 'colord'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, type SubmitErrorHandler } from 'react-hook-form'
import Tag from '@components/entities/Tag/Tag'
import Grid from '@/components/entities/Grid/Grid'
import Input from '@components/entities/Input/Input'
import Stack from '@components/entities/Stack/Stack'
import Button from '@/components/entities/Button/Button'
import useToast from '@/components/entities/Toast/Toast.hook'
import Heading from '@/components/entities/Heading/Heading.tsx'
import Surface from '@/components/entities/Surface/Surface.tsx'
import ColorList from '@/components/entities/ColorList/ColorList'
import { DEFAULT_COLOR } from '@/components/entities/ColorList/ColorList.constants'
import SegmentedPicker from '@/components/entities/SegmentedPicker/SegmentedPicker'
import { TAG_TYPE_CONFIGS, TAG_TYPES } from '@showcase-mono/backend/routes/api/v1/templates/tags/tag.schema'
import { tagCreateInputValidation } from '@showcase-mono/backend/routes/api/v1/templates/tags/validations/tag.create'
import type { TagCreateInput } from '@showcase-mono/backend/routes/api/v1/templates/tags/tag.types'
import { useCreateTagQuery } from '@/queries/tags/tags.query'
import TagList from '@/components/entities/TagList/TagList'
// import TagList from '@/components/entities/TagList/TagList'

// TODO Отработать ситуацию с легкой тенью текста и внутренней тени,
// TODO чтобы если юзер решил создать тег под цвет фона - все равно было видно

export const Component = () => {
    const { pushToast, clearToasts } = useToast()

    const { register, handleSubmit, control, formState: { isSubmitting: isTagSubmitting } } = useForm({
        resolver: zodResolver(tagCreateInputValidation),
        mode: 'onBlur',
        defaultValues: { color: DEFAULT_COLOR.color }
    })

    const { mutate: createMutation } = useCreateTagQuery();

    const onSubmit = (data: TagCreateInput) => {
        clearToasts();
        createMutation(data)
    }

    const onError: SubmitErrorHandler<TagCreateInput> = (errors) => {
        clearToasts();

        Object.entries(errors).forEach(([fieldName, error]) => {
            if (error?.message) {
                pushToast({
                    text: `${fieldName}: ${error.message}`,
                    type: 'popup',
                    label: 'Validation error',
                    status: 'error'
                });
            }
        });
    }

    return <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid columns={2} autoRows='1fr' height='max'>
            <Surface height='fit'>
                <Stack gap='md'>
                    <Heading level={3} variant='secondary'>Create Tag</Heading>
                    <Input
                        {...register('label')}
                        labelText='Название'
                        placeholder='Новый тег'
                        autoComplete='off'
                        inputMode='text'
                        hasEmojiPicker
                    />
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <SegmentedPicker label='Selected type:'>
                                {
                                    TAG_TYPES.map((tagType) => {
                                        const config = TAG_TYPE_CONFIGS[tagType];

                                        return (
                                            <Tag
                                                key={tagType}
                                                color={config.color}
                                                data-interactive
                                                data-selected={tagType === field.value}
                                                onClick={() => field.onChange(tagType)}
                                                variant='system'
                                                isSystem
                                                type={tagType}
                                            >
                                                {config.label}
                                            </Tag>
                                        );
                                    })
                                }
                            </SegmentedPicker>
                        )}
                    />
                    <Input
                        labelText='Категория'
                        placeholder='Наименование категории'
                        inputMode='text'
                        {...register('category')}
                    />
                    <Controller
                        name="color"
                        control={control}
                        render={({ field }) => (
                            <ColorList
                                value={field.value}
                                onColorChange={(color: HslColor) => field.onChange(color)}
                            />
                        )}
                    />
                    <Button type='submit' width='max' disabled={isTagSubmitting}>Send new tag</Button>
                </Stack>
            </Surface>

            <Surface height='max'>
                <Stack gap='md' height='max'>
                    <Heading level={3} variant='secondary'>Existing tags</Heading>
                    <Stack direction='row' gap='sm' wrap={true} align='start' height='max' >
                        <TagList isEditable />
                    </Stack>
                </Stack>
            </Surface>
        </Grid>
    </form>
}