import Paginator from "../components/Paginator/Paginator";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
    title: "Components/Paginator",
    component: Paginator,
    argTypes: {
        handlePageChange: { action: "handlePageChange" },
    }
}  as ComponentMeta<typeof Paginator>;

const Template: ComponentStory<typeof Paginator> = (args) => <Paginator {...args} />;

export const Default = Template.bind({});
Default.args = {
    pages: 10,
    page: 0,
} 