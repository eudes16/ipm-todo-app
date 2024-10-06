import { DefaultColors } from '@/components/shared/base.types';
import { FC } from 'react';

interface DorpDownItemProps {
    color?: DefaultColors
    selected: boolean
    value?: any
    children?: any
    onClick: (value: any) => void
}

const DorpDownItem: FC<DorpDownItemProps> = (props) => {
    const { value, onClick, children, selected} = props;

    return (
        <div 
            className={`
                flex bg-${props.color}-hover dark:hover:text-zinc-100 cursor-pointer p-2 rounded-md trasnsition duration-300 text-zinc-900 dark:text-white
                ${selected ? `bg-${props.color}` : ""}`}
            onClick={() => onClick(value)}
        >
            {children} 
        </div>
    );
}

export default DorpDownItem;