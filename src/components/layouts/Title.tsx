import { FC } from 'react';

interface TitleProps {
    title?: string;
    subtitle?: string;
    className?: string;
}

const Title: FC<TitleProps> = (props) => {
    return (
        <div>
            <h1
                className={`
                font-black text-3xl
                text-zinc-900 dark:text-zinc-100
            `}
            >
                {props.title}
            </h1>
            {props.subtitle && (
                <h2
                    className={`
                    font-light text-md
                    text-zinc-900 dark:text-zinc-100
                `}
                >
                    {props.subtitle}
                </h2>
            )}
        </div>
    );
}

export default Title;