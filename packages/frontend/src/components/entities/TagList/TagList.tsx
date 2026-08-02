import { useState } from "react";
import { LucideSearch, LucideTags } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import Stack from "@components/entities/Stack/Stack";
import { useGetTagsQuery } from "@/queries/tags/tags.query";
import {
    TAG_TYPES,
    TAG_TYPE_CONFIGS,
    tagTypeSchema,
    type TagType
} from "@showcase-mono/backend/routes/api/v1/templates/tags/tag.schema";
import Input from "@components/entities/Input/Input";
import Tag from "@components/entities/Tag/Tag";
import Surface from "@components/entities/Surface/Surface";
import Text from "@components/entities/Text/Text";
import { isValidLucideIcon } from "@components/entities/_shared/system.utils";
import Select from "../Select/Select";

interface TagListProps {
    selectedTags: number[];
    setSelectedList: (items: number[]) => void;
}

const TagList = (props: TagListProps) => {
    const { data: tags, isLoading: isTagsLoading, isError: isTagsLoadingError } = useGetTagsQuery();

    // #region ui behavior
    const { selectedTags, setSelectedList } = props;
    const [selectedType, setSelectedType] = useState<TagType | 'All'>('All');

    const onTagClickHandler = (id: number) => {
        const isIdSelected = selectedTags.includes(id);

        if (isIdSelected) setSelectedList(selectedTags.filter(item => item !== id));
        else setSelectedList([...selectedTags, id]);
    };

    const currentConfig = selectedType !== 'All' ? TAG_TYPE_CONFIGS[selectedType] : null;
    // #endregion
    return (
        <Stack direction='column' gap="md">
            <Stack direction="row" gap="md" align="center">
                <Text size={6} color='var(--neutral-550)' weight='bolder'>Tags:</Text>
                <Input placeholder="Search" icon={LucideSearch} hasEmojiPicker />

                <Select
                    name='type'
                    value={selectedType}
                    setValue={(val: string) => {
                        if (val === 'All') {
                            setSelectedType('All');
                            return;
                        }
                        const parsed = tagTypeSchema.safeParse(val);
                        if (parsed.success) setSelectedType(parsed.data);
                    }}
                >
                    <option value="All">All</option>
                    {TAG_TYPES.map(item => (
                        <option key={item} value={item}>
                            {TAG_TYPE_CONFIGS[item].label}
                        </option>
                    ))}
                </Select>
            </Stack>

            <Stack direction="column" gap="md" align="start">
                <Surface width="max" height="auto">
                    <Stack gap="md">
                        <Stack direction="row" align="center" gap="sm">
                            {currentConfig?.icon && isValidLucideIcon(currentConfig.icon) ? (
                                <DynamicIcon
                                    name={currentConfig.icon}
                                    color='var(--cold-blue-gray-400)'
                                    size={16}
                                />
                            ) : (
                                <LucideTags color='var(--cold-blue-gray-400)' size={16} />
                            )}

                            <Text
                                size={6}
                                color='var(--cold-blue-gray-400)'
                                weight='bolder'
                            >
                                {currentConfig?.label ?? 'All Tags'}
                            </Text>
                        </Stack>

                        <Stack direction="row" gap="sm" align="center" wrap>
                            {!isTagsLoading ? (
                                !isTagsLoadingError && tags?.map((item) => {
                                    const isTypeMatched = selectedType === 'All' || item.type === selectedType;
                                    if (!isTypeMatched) return null;

                                    const isSystem = item.category.trim().toLowerCase() === 'system';

                                    if (isSystem) {
                                        return (
                                            <Tag
                                                key={item.id}
                                                isSystem={true}
                                                color={item.color}
                                                type={item.type}
                                                data-interactive
                                                onClick={() => onTagClickHandler(item.id)}
                                                data-selected={selectedTags.includes(item.id)}
                                            >
                                                <span>{item.label}</span>
                                            </Tag>
                                        );
                                    }

                                    return (
                                        <Tag
                                            id={item.id}
                                            isSystem={false}
                                            createdAt={item.createdAt}
                                            category={item.category}
                                            color={item.color}
                                            key={item.id}
                                            type={item.type}
                                            data-interactive
                                            onClick={() => onTagClickHandler(item.id)}
                                            data-selected={selectedTags.includes(item.id)}
                                        >
                                            <span>{item.label}</span>
                                        </Tag>
                                    );
                                })
                            ) : (
                                '...loading'
                            )}
                        </Stack>
                    </Stack>
                </Surface>
            </Stack>
        </Stack>
    );
};

export default TagList;