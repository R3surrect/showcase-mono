import { api } from "@/shared/api/api"
import type { NoteCreateInput, NoteDeleteInput, NoteUpdateInput } from "@showcase-mono/backend/routes/api/v1/notes/notes.types";

export const NotesService = {
    async getAll() {
        const res = await api.notes.$get();
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}: ${res.statusText}`)

        return await res.json();
    },

    async createNote(noteData: NoteCreateInput) {
        const res = await api.notes.$post({ json: noteData });
        if (!res.ok) throw new Error(`Creating failed: ${res.status}: ${res.statusText}`);

        return await res.json();
    },

    async updateNote({id, ...data}: { id: number } & NoteUpdateInput) {
        if (!id) return;

        const res = await api.notes[':id'].$patch({
            param: { id: id.toString() },
            json: data
        });

        if (!res.ok) throw new Error(`Updating failed: ${res.status}: ${res.statusText}`);

        const result = await res.json();
        return result;
    },

    async deleteNote(note: NoteDeleteInput) {
        const res = await api.notes[':id'].$delete({
            param: { id: String(note.id) }
        });

        if (!res.ok) throw new Error(`Deleting failed: ${res.status}: ${res.statusText}`);
        const result = await res.json();
        return result;
    }
}