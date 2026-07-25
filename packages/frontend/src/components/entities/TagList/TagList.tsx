import Stack from "@components/entities/Stack/Stack"
import { PillPicker } from "@components/entities/PillPicker/PillPicker"
import { useGetTagsQuery } from "@/queries/tags/tags.query"
import type { TagType } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.schema"
import Input from "@components/entities/Input/Input";
import Tag from "../Tag/Tag";

interface TagPillData {
    type: TagType;
    category: string;
}

const TagList = () => {
    const { data: tags, isLoading: isTagsLoading, isError: isTagsLoadingError } = useGetTagsQuery();

    const tagPillData: TagPillData[] | undefined = !isTagsLoading
        ? tags?.map(item => ({ type: item.type, category: item.category }))
        : []

    return <Stack direction='column' gap="md">
        <Stack direction="row" gap="md">
            <Input />
            <PillPicker items={tagPillData} />
        </Stack>
        {
            !isTagsLoading && !isTagsLoadingError && tags?.map((item) => (
                <Tag
                    {...item}

                />
            ))
        }
    </Stack>
}

export default TagList;