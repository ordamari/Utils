import ReadMoreLess, { ReadMoreLessProps } from "../components/ReadMoreLess/ReadMoreLess";

export default {
    title: "Components/ReadMoreLess",
    component: ReadMoreLess,
    argTypes: {
        sideEffect: { action: "sideEffect" },
    }
}



const Template = (args:ReadMoreLessProps) => <ReadMoreLess {...args}/>

export const Default = Template.bind({});
Default.args = {
    max:100,
    min:80,
    children:  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio necessitatibus impedit mollitia minima error eos dolores harum corporis aperiam pariatur?'

} as ReadMoreLessProps;
