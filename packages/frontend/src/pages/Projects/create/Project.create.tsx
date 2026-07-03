import ColorList from "@/components/entities/ColorList/ColorList";
import Heading from "@/components/entities/Heading/Heading";
import Input from "@/components/entities/Input/Input";
import Stack from "@/components/entities/Stack/Stack";

const ProjectCreateForm = () => {
    return <Stack gap="md">
        <Heading level={3} variant="secondary" weight="bolder">Новый проект</Heading>
        <Input labelText="Label" placeholder="Project label" />
        <Input labelText="Description" placeholder="Description..." />

        <ColorList />
    </Stack>
}

export default ProjectCreateForm;