import { DefaultColors } from '@/shared/base.types';
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
                flex bg-${props.color ?? 'primary'}-dropdown-item-hover 
                cursor-pointer p-2 rounded-md trasnsition duration-300 
                dark:hover:text-zinc-100 
                text-zinc-900
                ${selected ? `bg-${props.color ??  'primary'}` : ""}`}
            onClick={() => onClick(value)}
        >
            {children} 
        </div>
    );
}

export default DorpDownItem;