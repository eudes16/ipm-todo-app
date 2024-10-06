import useWindowSize from '@/data/hooks/useWindowSize';
import useOutsideClick from '@/data/hooks/useOutsideClick';
import { IconCaretDown, IconCaretUp } from '@tabler/icons-react';
import { FC, useEffect, useRef, useState } from 'react';
import DorpDownItem from './DropDownItem';
import { DefaultColors } from '@/components/shared/base.types';

interface DropDownSpaceProps {
    open: boolean
    rec: DOMRect
}

interface DropDownProps {
    value?: any
    color?: DefaultColors
    open: boolean
    fullWidth?: boolean
    options: any[]
    onChange: (value: any) => void
    onClose: () => void
    onOpen: () => void
    className?: string
    label?: string
    textField?: string
    valueField?: string
    variation?: "filled" | "outlined" | "text"
}

export interface IOptions {
    value: any
    text: string
}

const DropDown: FC<DropDownProps> = (props) => {
    const { width, offset } = useWindowSize();
    const { open } = props;
    const [listProps, setListProps] = useState<DropDownSpaceProps>({
        open: false,
        rec: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            toJSON: () => { return {} }
        }
    });

    const internalRef = useRef<HTMLDivElement>(null);

    const _textField:any = props.textField ?? "text"
    const _valueField:any = props.valueField ?? "value"

    const selectedOption:any = props.options.find((opt) => opt?.[_valueField] === props?.value?.[_valueField])

    const ref = useOutsideClick(() => {
        if (open) {
            props.onClose()
        }
    })

    const getRec = () => {
        if (internalRef.current) {
            return internalRef.current.getBoundingClientRect()
        }
        return {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            toJSON: () => { return {} }
        }
    }

    

    const toggleOpen = () => {
        const rect = getRec();
        setListProps(prevState => {
            return {
                ...prevState,
                rec: rect
            }
        })
        if (!open) {
            props.onOpen()
        } else {
            props.onClose()
        }

    }

    const handleChange = (value: IOptions) => {
        props.onChange(value)
    }

    const renderItens = () => {
        const _props:any = props
        return props.options.map((option: any) => {
            return (
                <DorpDownItem
                    color={_props.color}
                    key={option[_valueField]}
                    selected={_props?.value?.[_valueField] === option?.[_valueField]}
                    onClick={(_value) => {
                        handleChange(_value)
                    }}
                    value={option}
                >
                    {option[_textField]}
                </DorpDownItem>
            )
        })
    }

    useEffect(() => {
        if (open) {
            const rect = getRec();
            setListProps(prevState => {
                return {
                    ...prevState,
                    rec: rect
                }
            })
        }
    }, [ref, ref.current?.offsetTop, open, width, offset])
    
    return (
        <div ref={ref} className="cursor-pointer">
            <label className="text-sm text-zinc-900 dark:text-zinc-100">{props.label ?? ""}</label>
            <div
                ref={internalRef}
                className={`
                    flex rounded-md h-10 
                    text-sm
                    gap-1
                    items-center
                    text-zinc-900 dark:text-zinc-100
                    ${props.variation === "filled" ? "bg-zinc-200" : ""}
                    ${props.variation === "outlined" ? "bg-transparent border-2 border-zinc-700 hover:border-zinc-500" : ""}
                    ${props.variation === "text" ? "bg-transparent" : ""}
                    ${props.className ?? ""}
                    ${props.fullWidth ? "w-full" : "min-w-max"}
                `}
                style={{
                    overflowY: "hidden"
                }}
            >

                <div className={`flex flex-grow h-full items-center pl-2`} onClick={toggleOpen}>
                    {selectedOption?.[_textField] ?? "Selecione uma opção"}
                </div>
                <div className={`flex flex-grow-0 flex-shrink items-center`}>
                    <button
                        className="flex items-center justify-center hover:bg-zinc-500 p-2 rounded-full h-8 w-8 trasnsition duration-300 mr-1"
                        onClick={toggleOpen}
                    >
                        {props.open ? <IconCaretUp /> : <IconCaretDown />}
                    </button>
                </div>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`
                    flex flex-col gap-1 max-h-48 p-1 
                    text-zinc-900 bg-zinc-100/10 rounded-md shadow-md backdrop-blur-xl
                    transition-colors  fixed duration-300 
                    overflow-y-auto scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin
                    ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
                `}
                    style={{
                        top: listProps.rec.y + 3 + listProps.rec.height,
                        left: listProps.rec.x + 1,
                        width: listProps.rec.width - 3,
                        zIndex: open ? 50 : -1
                    }}
                >
                    {renderItens()}
                </div>
            </div>
        </div>
    );
}

export default DropDown;