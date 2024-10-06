import { DefaultColors, DefaultSizes } from '@/components/shared/base.types';
import { cloneElement, FC } from 'react';

interface ButtonOutlinedProps {
    icon?: any;
    text?: string;
    color?: DefaultColors;
    onClick?: (e: any) => void;
    size?: DefaultSizes;
    className?: string;
}

const ButtonOutlined: FC<ButtonOutlinedProps> = (props) => {
    function size(): number {
        switch (props.size) {
            case "xs":
                return 9;
            case "lg":
                return 14;
            case "xl":
                return 16;
            case "2xl":
                return 20;
            case "3xl":
                return 24;
            default:
                return 11;
        }
    }

    const renderIcon = () => {
        if (!props.icon) {
            return null;
        }

        const icon = cloneElement(props.icon, {
            size: size() * 2,
        });

        return icon;
    }

    return (
        <button
            className={`
                btn-outlined btn-outlined-${props.color ?? 'default'}
                h-${size()}
                ${`text-${props.size ?? "base"}`}
                ${props.className ?? ""}
            `}
            onClick={props.onClick}
        >
            <div className='flex flex-row justify-center items-center'>
                {renderIcon()}
                {props.text ? props.text : null}
            </div>
        </button>
    );
}

export default ButtonOutlined;