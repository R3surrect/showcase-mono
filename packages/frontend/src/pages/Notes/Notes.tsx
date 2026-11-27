import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContentHeader } from '@/components/entities/ContentHeader/ContentHeader';
import Stack from '@/components/entities/Stack/Stack';
import { LucidePlusCircle } from 'lucide-react';
import Button from '@/components/entities/Button/Button';
import Banner from '@/components/entities/Banner/Banner';
import Text from '@/components/entities/Text/Text';
import Grid from '@/components/entities/Grid/Grid';
import NoteCard from '@/components/entities/NoteCard/NoteCard';
import Modal from '@/components/shared/Modal/Modal';
import Surface from '@/components/entities/Surface/Surface';
import Input from '@/components/entities/Input/Input';
import { useHintStore } from '@/store/useHintStore';

import { noteCreateInputValidation } from '@showcase-mono/backend/routes/api/v1/notes/validations/note.create';
import { useGetProjectsQuery } from '@/queries/projects/projects.query';
import Select from '@/components/entities/Select/Select';
import Option from '@/components/entities/Select/components/Option/Option';

import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from "@tiptap/starter-kit";

import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
} from 'lucide-react';

export const hintId = 'notes-page-hint';

const MOCK_NOTE_CARDS = [
    {
        id: 'note-1',
        title: "Discuss stealth approach and archer support with Legolas",
        details: "Hold a tactical briefing with Legolas as part of the Ascend to Mordor initiative. Confirm his scouting findings along the border of Mordor, align on the safest path toward Mount Doom, and ensure our long-range defense and ranged cover are fully coordinated before the final push.",
        color: { h: 230, s: 80, l: 56 },
        task: { label: 'Scouting & Recon' },
        project: {
            label: "💍 Ascend to Mordor",
            color: { h: 160, s: 50, l: 50 },
        },
        hasSurface: true,
        toolbar: null
    },
    {
        id: 'note-2',
        title: "Audit lembas bread rations and water supplies",
        details: "Check remaining inventory with Samwise before crossing the Dead Marshes. Ensure enough provisions are packed for the final stretch without slowing down our pace.",
        color: { h: 40, s: 90, l: 50 },
        task: { label: 'Provisions' },
        project: {
            label: "💍 Ascend to Mordor",
            color: { h: 160, s: 50, l: 50 },
        },
        hasSurface: true,
        toolbar: null
    },
    {
        id: 'note-3',
        title: "Reforge Narsil into Andúril",
        details: "Coordinate with the Elven smiths in Rivendell. Verify the inscriptions on the blade and schedule the handover ceremony with Aragorn.",
        color: { h: 200, s: 15, l: 45 },
        task: { label: 'Equipment' },
        project: {
            label: "👑 Return of the King",
            color: { h: 280, s: 60, l: 55 },
        },
        hasSurface: true,
        toolbar: null
    },
    {
        id: 'note-4',
        title: "Beacon lighting protocol for Gondor",
        details: "Confirm watchtower shifts along the White Mountains. Ensure dry firewood and oil reserves are stocked at Amon Dîn and Eilenach in case Minas Tirith calls for aid.",
        color: { h: 10, s: 85, l: 55 },
        task: { label: 'Emergency Comms' },
        project: {
            label: "🔥 Defense of Minas Tirith",
            color: { h: 15, s: 80, l: 50 },
        },
        hasSurface: true,
        toolbar: null
    },
    {
        id: 'note-5',
        title: "Review Minas Tirith archive scrolls",
        details: "Research Isildur's account of the One Ring. Look for specific mentions of the markings that appear when the band is exposed to fire.",
        color: { h: 0, s: 0, l: 0 }, // Чистый черный HSL
        task: { label: 'Lore Research' },
        project: {
            label: "🧙‍♂️ White Council",
            color: { h: 210, s: 20, l: 70 },
        },
        hasSurface: true,
        toolbar: null
    },
    {
        id: 'note-6',
        title: "Negotiate eagle airlift contingency",
        details: "Send a moth messenger to Gwaihir. Establish extraction coordinates near the Black Gate in case ground retreat becomes impossible.",
        color: { h: 190, s: 75, l: 48 },
        task: { label: 'Extraction Plan' },
        project: {
            label: "💍 Ascend to Mordor",
            color: { h: 160, s: 50, l: 50 },
        },
        hasSurface: true,
        toolbar: null
    },
    {
        id: 'note-7',
        title: "Fortify Helm's Deep outer wall",
        details: "Inspect the drainage culvert at the base of the Deeping Wall. Reinforce the gatehouse with heavy timber beams before Saruman's vanguard arrives.",
        color: { h: 120, s: 45, l: 40 },
        task: { label: 'Fortifications' },
        project: {
            label: "🐎 Rohan Defense",
            color: { h: 95, s: 55, l: 45 },
        },
        hasSurface: true,
        toolbar: null
    }
];

export const Component = () => {
    const isDismissed = useHintStore(store => store.data[hintId]);
    const dismiss = useHintStore(store => store.dismissHint);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: projects = [], isLoading: isProjectsLoading } = useGetProjectsQuery();

    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting, isDirty }
    } = useForm({
        resolver: zodResolver(noteCreateInputValidation),
        mode: 'onChange',
    })

    const editor = useEditor({
        immediatelyRender: true,
        content: "",
        extensions: [
            StarterKit,
        ],
        editorProps: {
            attributes: {
                style: 'outline: none;',
            },
        },
    });

    const editorState = useEditorState({
        editor,
        selector: (ctx) => ({
            isBold: editor.isActive('bold'),
            isItalic: editor.isActive('italic'),
            isStrike: editor.isActive('strike'),
            isCode: editor.isActive('code'),
            isBulletList: editor.isActive('bulletList'),
            isOrderedList: editor.isActive('orderedList'),
            isBlockquote: editor.isActive('blockquote'),
            canUndo: editor.can().undo(),
            canRedo: editor.can().redo(),
        }),
    })

    return (
        <>
            <Stack gap="md">
                <ContentHeader title='Notes'>
                    <Button
                        size="sm"
                        variant={"outline"}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Stack align="center" direction="row" gap="md">
                            <LucidePlusCircle />
                            Create
                        </Stack>
                    </Button>
                </ContentHeader>
                {!isDismissed &&
                    <Banner
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
                    </Banner>
                }
                <Grid columns={MOCK_NOTE_CARDS.length < 5 ? MOCK_NOTE_CARDS.length : 5} autoRows='1fr'>
                    {
                        MOCK_NOTE_CARDS.map(
                            ({ id, ...noteProps }) => <NoteCard key={id} {...noteProps} />
                        )
                    }
                </Grid>
            </Stack >
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Surface width='50vw'>
                    <form>
                        <Stack direction='column' gap='md'>
                            <Text size={4} color='var(--neutral-850)'>Create note</Text>
                            <Stack direction='column'>

                                <Input labelText='Label: ' {...register('label')} />

                                <Controller
                                    name="projectId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            name={field.name}
                                            onBlur={field.onBlur}
                                            ref={field.ref}
                                            disabled={field.disabled}
                                            value={String(field.value ?? 0)}
                                            // value={field.value}
                                            labelText="Project"
                                            setValue={(id) => field.onChange(id)}
                                        >
                                            <Option emoji={String.fromCodePoint(0x1F4E5)} id={0} label="None" key={0} />
                                            {
                                                !isProjectsLoading &&
                                                projects.map(item =>
                                                    <Option
                                                        emoji={item.emoji}
                                                        label={item.label}
                                                        id={item.id}
                                                        key={item.id}
                                                    />
                                                )
                                            }
                                        </Select>
                                    )}
                                />

                                <Stack direction='row' gap='sm' justify='start'>

                                    <Button
                                        type="button"
                                        size='sm'
                                        variant={editorState.isBold ? 'accent' : 'outline'}
                                        onClick={() => editor.chain().focus().toggleBold().run()}
                                    >
                                        <Bold size="14" />
                                    </Button>
                                    <Button
                                        type="button"
                                        size='sm'
                                        variant={editorState.isItalic ? 'accent' : 'outline'}
                                        onClick={() => editor.chain().focus().toggleItalic().run()}
                                    >
                                        <Italic size="14" />
                                    </Button>
                                    <Button
                                        type="button"
                                        size='sm'
                                        variant={editorState.isStrike ? 'accent' : 'outline'}
                                        onClick={() => editor.chain().focus().toggleStrike().run()}
                                    >
                                        <Strikethrough size="14" />
                                    </Button>
                                    <Button
                                        type="button"
                                        size='sm'
                                        variant={editorState.isCode ? 'accent' : 'outline'}
                                        onClick={() => editor.chain().focus().toggleCode().run()}
                                    >
                                        <Code size="14" />
                                    </Button>
                                    <Button
                                        type="button"
                                        size='sm'
                                        variant={editorState.isBulletList ? 'accent' : 'outline'}
                                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                                    >
                                        <List size="14" />
                                    </Button>
                                    <Button
                                        type="button"
                                        size='sm'
                                        variant={editorState.isOrderedList ? 'accent' : 'outline'}
                                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                    >
                                        <ListOrdered size="14" />
                                    </Button>
                                    <Button
                                        type="button"
                                        size='sm'
                                        variant={editorState.isBlockquote ? 'accent' : 'outline'}
                                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                    >
                                        <Quote size="14" />
                                    </Button>
                                    <Button
                                        type="button"
                                        size='sm'
                                        variant="outline"
                                        disabled={!editorState.canUndo}
                                        onClick={() => editor.chain().focus().undo().run()}
                                    >
                                        <Undo size="14" />
                                    </Button>
                                    <Button
                                        type="button"
                                        size='sm'
                                        variant="outline"
                                        disabled={!editorState.canRedo}
                                        onClick={() => editor.chain().focus().redo().run()}
                                    >
                                        <Redo size="14" />
                                    </Button>

                                </Stack>

                                <Surface>
                                    <EditorContent style={{ outline: 'none' }} editor={editor} />
                                </Surface>

                            </Stack>
                        </Stack>
                    </form>
                </Surface>
            </Modal>
        </>
    );
};
