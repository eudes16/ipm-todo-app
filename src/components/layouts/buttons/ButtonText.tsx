import { DefaultColors, DefaultSizes } from '@/shared/base.types';
import { cloneElement, FC } from 'react';

interface ButtonTextProps {
    icon?: any;
    text?: string;
    title?: string;
    color?: DefaultColors;
    onClick?: (e: any) => void;
    size?: DefaultSizes;
    className?: string;
}

const ButtonText: FC<ButtonTextProps> = (props) => {
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
                btn-text btn-text-${props.color ?? 'default'}
                h-${size()}
                ${`text-${props.size ?? "base"}`}
                ${props.className ?? ""}
            `}
            title={props?.title}
            onClick={props.onClick}
        >
            <div className='flex flex-row justify-center items-center'>
                {renderIcon()}
                {props.text ? props.text : null}
            </div>
        </button>
    );
}

export default ButtonText;