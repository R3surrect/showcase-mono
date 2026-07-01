import ColorList from "@/components/entities/ColorList/ColorList";
import Input from "@/components/entities/Input/Input";

const ProjectCreateForm = () => {
    return <>
        <Input labelText="Label" placeholder="Project label"/>
        <Input labelText="Description" placeholder="Description..."/>

        <ColorList/>
    </>
}

export default ProjectCreateForm;