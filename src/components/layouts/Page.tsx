import { FC } from 'react';
import Header from './Header';
import Flex from './Flex';
import Content from './Content';

interface PageProps {
    title?: string;
    subtitle?: string;
    className?: string;
    children?: any;
}

const Page: FC<PageProps> = (props) => {
    return (
        <div className={`
        page
        ${props.className ?? ""}
    `}>
            <Flex col
                className={`
                    flex-1 p-7 h-auto overflow-y-auto
                    scrollbar
                    trasnsition duration-300
                `}
            >
                <Header title={props.title} subtitle={props.subtitle} />
                <Content>
                    {props.children}
                </Content>
            </Flex>
        </div>
    );
}

export default Page;