import { DefaultColors, TextFieldTypes } from '@/components/shared/base.types';
import { FC } from 'react';

interface TextFieldProps {
    colors?: DefaultColors
    id?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    value?: any;
    type?: TextFieldTypes;
    className?: string;
    onInput?: (e: any) => void;
    helperText?: string;
    error?: boolean;
    textError?: string;
}

const TextField: FC<TextFieldProps> = (props) => {


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
                <input
                    className={`
                text-field
                text-field-${props.colors ?? "default"}
                ${props.error ? "text-field-error-active" : ""}
                ${props.className ?? ""}
                `}
                    id={props?.id}
                    name={props?.name}
                    placeholder={props?.placeholder}
                    value={props?.value}

                    type={props?.type ?? "text"}
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

export default TextField;