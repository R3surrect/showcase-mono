import { LucideSearch } from "lucide-react";
import Stack from "@components/entities/Stack/Stack"
import { useGetTagsQuery } from "@/queries/tags/tags.query"
import { TAG_TYPES, tagTypeConfigs, type TagType } from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.schema"
import Input from "@components/entities/Input/Input";
import Tag from "@components/entities/Tag/Tag";
import Surface from "@components/entities/Surface/Surface";
import Text from "@components/entities/Text/Text";
import ExpandButton from "../ExpandButton/ExpandButton";

interface TagPillData {
    type: TagType;
    category: string;
}

interface TagListProps {
    selectedTags: number[];
    setSelectedList: (items: number[]) => void;
}

const TagList = (props: TagListProps) => {

    // #region data
    const { data: tags, isLoading: isTagsLoading, isError: isTagsLoadingError } = useGetTagsQuery();

    const tagPillData: TagPillData[] | undefined = !isTagsLoading
        ? tags?.map(item => ({ type: item.type, category: item.category }))
        : [];
    // #endregion
    // #region ui behavior
    const { selectedTags, setSelectedList } = props;

    const onTagClickHandler = (id: number) => {
        const isIdSelected = selectedTags.includes(id);

        if (isIdSelected)
            setSelectedList(selectedTags.filter(item => item !== id));
        else
            setSelectedList([...selectedTags, id])
    }
    // const [isExpanded, setIsExpanded] = useState(false);

    const getTagWindowRender = (type: TagType) =>
        <Surface width="max" height="auto">
            <Stack>
                <Text size={6} color='var(--neutral-550)' weight='bolder'>{tagTypeConfigs[type].label}</Text>
                <Stack direction="row" gap="sm" align="center" wrap>
                    {
                        !isTagsLoading ? !isTagsLoadingError && tags?.map((item) =>
                            item.type === type &&
                            <Tag
                                {...item}
                                data-selected={props.selectedTags.includes(item.id)}
                                onClick={() => onTagClickHandler(item.id)}
                                data-interactive
                            />
                        )
                            : <Text>...loading</Text>
                    }
                </Stack>
            </Stack>
        </Surface>

    // #endregion

    return <Stack direction='column' gap="md">
        <Stack direction="row" gap="md" align="center">
            <Text size={6} color='var(--neutral-550)' weight='bolder'>Tags:</Text>
            <Input placeholder="Search" icon={LucideSearch} hasEmojiPicker />
            <ExpandButton onExpand={() => { }} />
        </Stack>
        <Stack direction="column" gap="md" align="start">
            {
                TAG_TYPES.map((item) => (
                    getTagWindowRender(item)
                ))
            }
        </Stack>
    </Stack>
}

export default TagList;