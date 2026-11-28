import { getSchema, type JSONContent } from '@tiptap/core';
import { Node } from '@tiptap/pm/model';
import { extensions } from '../editor/extensions.js';

const schema = getSchema(extensions);

export const isValidEditorDoc = (json: unknown): json is JSONContent => {
    try {
        Node.fromJSON(schema, json).check();
        return true;
    } catch {
        return false;
    }
};