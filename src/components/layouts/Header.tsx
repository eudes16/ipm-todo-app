import { FC } from 'react';
import Title from './Title';
import Flex from './Flex';

interface HeaderProps {
    title?: string;
    subtitle?: string;
    className?: string;
}

const Header: FC<HeaderProps> = (props) => {
    return (
        <Flex centerCross className="justify-between">
            {props?.title ? <Title title={props.title} subtitle={props.subtitle} /> : <div></div>}
        </Flex>
    );
}

export default Header;