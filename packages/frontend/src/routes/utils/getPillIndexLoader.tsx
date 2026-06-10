import type { PillPickerItem } from '@/components/entities/PillPicker/PillPicker.types';
import { redirect } from 'react-router-dom';

export const getPillIndexLoader = (parentPath: string, items: PillPickerItem[]) => {

    return () => {
        if (!items) throw new Error(`Items of ${parentPath} are empty`)
        else if (items.length === 0) throw new Error(`${<code>[...route.items]</code>} doesn't provided correctly`)

        const defaultItem = items.find(item => item.isDefault)?.to ?? items[0].to;

        const targetPath = `${parentPath}/${defaultItem}`.replace(/\/+/g, '/');

        return redirect(targetPath);
    }
};
