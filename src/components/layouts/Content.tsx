import { FC } from 'react';
import Flex from './Flex';

interface ContentProps {
    children?: any
}

const Content: FC<ContentProps> = (props) => {
    return (
        <Flex col centerCross className="flex-1">
            {props.children}
        </Flex>
    );
}

export default Content;