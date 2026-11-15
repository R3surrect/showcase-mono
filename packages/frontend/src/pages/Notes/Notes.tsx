import { ContentHeader } from '@/components/entities/ContentHeader/ContentHeader';
import Stack from '@/components/entities/Stack/Stack';
import { LucidePlusCircle, LucideStickyNote } from 'lucide-react';
import Button from '@/components/entities/Button/Button';
import Banner from '@/components/entities/Banner/Banner';
import Text from '@/components/entities/Text/Text';
import { useHintStore } from '@/store/useHintStore';
import Grid from '@/components/entities/Grid/Grid';
import Surface from '@/components/entities/Surface/Surface';
import Tag from '@/components/entities/Tag/Tag';
import { colord, type HslColor } from 'colord';
import SegmentedPicker from '@/components/entities/SegmentedPicker/SegmentedPicker';

const MOCK_COLOR: HslColor = { h: 230, s: 80, l: 56 };

export const hintId = 'notes-page-hint';

export const Component = () => {
    const isDismissed = useHintStore(store => store.data[hintId])
    const dismiss = useHintStore(store => store.dismissHint);
    const notesCount = 10;

    return (
        <>
            <Stack gap="md">
                {!isDismissed && <Banner
                    isClosable
                    variant="hint"
                    onClose={() => dismiss(hintId)}
                    color='var(--warm-green-500)'
                >
                    <Text
                        color='var(--warm-green-500)'
                        weight='bolder'
                        size={6}
                    >
                        Quick access to the Notes:
                    </Text>
                    <Text
                        color='var(--warm-green-500)'
                        size={6}
                        weight='bold'
                    >
                        Click on a note card to open the full view and editor. Use projects and tasks to organize your notes.
                    </Text>
                </Banner>}
                <ContentHeader
                    title='Notes'
                // subElement={<Text color="var(--warm-green-500)">All tasks</Text>}
                >
                    <Button
                        size="sm"
                        variant={"outline"}
                        onClick={() => { }}
                    >
                        <Stack align="center" direction="row" gap="md">
                            <LucidePlusCircle />
                            Create
                        </Stack>
                    </Button>
                </ContentHeader>
                <Grid columns={notesCount < 5 ? notesCount : 5}>

                    <Surface data-interactive>
                        <Stack direction='column'>
                            <Stack direction='row' justify='space-between'>
                                <Stack direction='row' gap='sm' align='center'>
                                    <LucideStickyNote size="32" color="var(--warm-green-500)" />
                                    <Text size={5} color="var(--warm-green-700)" weight='bolder'>Discuss stealth approach and archer support with Legolas</Text>
                                </Stack>
                                {/* //TODO Toolbar children */}
                            </Stack>

                            <Text color='var(--neutral-850)' weight='bold' truncate wrap truncateAfter={5}>
                                Hold a tactical briefing with Legolas as part of the Ascend to Mordor initiative. Confirm his scouting findings along the border of Mordor, align on the safest path toward Mount Doom, and ensure our long-range defense and ranged cover are fully coordinated before the final push.
                            </Text>
                            <Stack gap='sm'>
                                <SegmentedPicker label='Task' justify='start'>
                                    <Tag color={MOCK_COLOR} type='priority' width='fit' innerJustify='start'>
                                        <Text width='fit-content' weight='bold' color='white'>🧝‍♂️ Talk to Legolas</Text>
                                    </Tag>
                                </SegmentedPicker>
                                <SegmentedPicker label='Project' justify='start'>
                                    <Tag color={colord(MOCK_COLOR).desaturate(0.3).darken(0.3).toHsl()} type='priority' width='fit' innerJustify='start'>
                                        <Text width='fit-content' weight='bold' color='white'>💍 Ascend to Mordor</Text>
                                    </Tag>
                                </SegmentedPicker>
                            </Stack>
                        </Stack>
                    </Surface>

                </Grid>
            </Stack>
        </>
    )
}
