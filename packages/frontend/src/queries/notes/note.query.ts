import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { NotesService } from "./note.service";
import useToast from "@/components/entities/Toast/useToast";
import type { Note, NoteCreateInput, NoteDeleteInput, NoteUpdateInput } from "@showcase-mono/backend/routes/api/v1/notes/notes.types";

export const notesKeys = { all: ['notes'] as const };

export const getNotesQueryOptions = () => queryOptions({
    queryKey: notesKeys.all,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (index) => 1000 * (index * 2),
    queryFn: async () => {
        const [res] = await Promise.all([
            NotesService.getAll(),
            new Promise(resolve => setTimeout(resolve, 500))
        ]);
        return res;
    },
})

export const useGetNotesQuery = () => useQuery(getNotesQueryOptions());

export const useUpdateNotesQuery = () => {
    const queryClient = useQueryClient();
    const { pushToast } = useToast();

    return useMutation({
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: notesKeys.all });

            queryClient.setQueryData<Note[]>(notesKeys.all, prev =>
                prev?.map(
                    note => note.id === variables.id
                        ? { ...note, ...variables }
                        : note
                ))
        },
        mutationFn: async (data: { id: number } & NoteUpdateInput) => NotesService.updateNote(data),
        onSuccess: (data) => {
            pushToast({
                text: `Note "${data?.label}" updated`,
                type: 'popup',
                label: 'Note updated!',
                status: 'success'
            })
            return queryClient.invalidateQueries({ queryKey: notesKeys.all })
        },
        onError: (error) => pushToast({
            text: `${error}`,
            type: 'popup',
            label: 'Note updating failed',
            status: 'error'
        }),
    })
};

export const useCreateNoteQuery = () => {
    const queryClient = useQueryClient();
    const { pushToast } = useToast();

    return useMutation({
        mutationFn: async (data: NoteCreateInput) => await NotesService.createNote(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: notesKeys.all }),
        onError: (error) => pushToast({
            text: `${error}`,
            type: 'popup',
            label: 'Note creating failed',
            status: 'error'
        })
    });
}

export const useDeleteNoteQuery = () => {
    const queryClient = useQueryClient();
    const { pushToast } = useToast();

    return useMutation({
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: notesKeys.all });

            queryClient.setQueryData<Note[]>(notesKeys.all, prev =>
                prev?.filter(item => item.id !== variables.id))
        },
        mutationFn: async (data: NoteDeleteInput) => NotesService.deleteNote(data),
        onSuccess: (data) => {
            pushToast({
                text: `Note "${data.label}" deleted!`,
                type: 'popup',
                label: 'Note deleted',
                status: 'success'
            })
            return queryClient.invalidateQueries({ queryKey: notesKeys.all })
        },
        onError: (error) => pushToast({
            text: `${error}`,
            type: 'popup',
            label: 'Note deleting failed',
            status: 'error'
        })
    })
}