import { isValidElement } from "react";
import type { OptionType } from "./Option.types";
import EmojiPreview from "../../../Emoji/EmojiPreview/EmojiPreview";
import Stack from "../../../Stack/Stack";
import Text from "@/components/entities/Text/Text";

const Option = (props: OptionType) => {
    if (props.variant === 'custom')
        return <option value={props.id}>
            {props.children}
        </option>

    const emojiRender = props.emoji
        ? isValidElement(props.emoji)
            ? props.emoji
            : <EmojiPreview emoji={props.emoji} />
        : null;

    return <option value={props.id}>
        <Stack
            direction="row"
            align="center"
            gap="md"
            width="max"
        >
            {props.emoji && emojiRender}
            <Text>{props.label}</Text>
        </Stack>
    </option>
};

export default Option;