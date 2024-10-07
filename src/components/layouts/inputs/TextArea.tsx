import { DefaultColors } from '@/shared/base.types';
import { FC } from 'react';

interface TextAreaProps {
    colors?: DefaultColors
    id?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    value?: any;
    className?: string;
    onInput?: (e: any) => void;
    helperText?: string;
    error?: boolean;
    textError?: string;
}

const TextArea: FC<TextAreaProps> = (props) => {


    return (
        <div>
            <label
                className='text-field-label'
                htmlFor={props?.name}
            >

                <span className={`
                    text-field-label-${props.colors ?? "default"}
                `}>
                    {props?.label}
                </span>
                <textarea
                    className={`
                text-field
                text-field-${props.colors ?? "default"}
                w-full
                ${props.error ? "text-field-error-active" : ""}
                ${props.className ?? ""}
                `}
                    id={props?.id}
                    name={props?.name}
                    placeholder={props?.placeholder}
                    value={props?.value}

                    onInput={props?.onInput}
                />
                <div className='flex flex-row w-full'>
                    <div className='text-field-helper'>
                        &nbsp;{props?.helperText ?? ""}
                    </div>
                    <div className='text-field-error'>
                        {props?.error ? props?.textError : ""}&nbsp;
                    </div>
                </div>
            </label>
        </div>
    );
}

export default TextArea;