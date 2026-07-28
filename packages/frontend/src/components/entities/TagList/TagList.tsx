import Stack from "@components/entities/Stack/Stack"
import { useGetTagsQuery } from "@/queries/tags/tags.query"
import type { TagType } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.schema"
import Input from "@components/entities/Input/Input";
import Tag from "@components/entities/Tag/Tag";
import Surface from "@components/entities/Surface/Surface";
import Text from "@components/entities/Text/Text";
import { useState } from "react";

interface TagPillData {
    type: TagType;
    category: string;
}

const TagList = () => {
    // #region data
    const { data: tags, isLoading: isTagsLoading, isError: isTagsLoadingError } = useGetTagsQuery();
    const tagPillData: TagPillData[] | undefined = !isTagsLoading
        ? tags?.map(item => ({ type: item.type, category: item.category }))
        : [];
    // #endregion
    // #region ui behavior
    const [isExpanded, setIsExpanded] = useState(false);
    
    // #endregion

    return <Stack direction='column' gap="md">
        <Stack direction="row" gap="md" align="center">
            <Text size={6} color='var(--neutral-550)' weight='bolder'>Available tags:</Text>
            <Input placeholder="Search" />
        </Stack>
        <Surface width="250px" height="250px">
            <Stack>
                <Text size={6} color='var(--neutral-550)' weight='bolder'>Available tags:</Text>
                <Stack direction="row" gap="sm" align="center" wrap>
                    {
                        !isTagsLoading && !isTagsLoadingError && tags?.map((item) => (
                            <Tag {...item} />
                        ))
                    }
                </Stack>
            </Stack>
        </Surface>
    </Stack>
}

export default TagList;