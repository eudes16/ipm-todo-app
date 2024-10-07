import { IconX } from "@tabler/icons-react";

export interface ModalProps {
    open: boolean
    onClose: () => void
    children: any
}

export default function Modal(props: ModalProps) {

    const { open, onClose, children } = props

    return (
        // backdrop
        <div 
            onClick={onClose} 
            className={`
                fixed inset-0 flex justify-center items-center
                transition-colors 
                ${open ? "visible bg-black/70 backdrop-blur-md" : "invisible"}
            `}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`
                    bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow p-6 transition-all
                    ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
                `}
            >
                <button
                    className={`
                        absolute top-2 right-2
                        transition duration-300
                        hover:text-zinc-700 hover:bg-black/30 rounded-full p-1
                    `}
                    onClick={onClose}
                >
                    <IconX 
                        className={`
                            text-zinc-600
                        `}
                        size={24} 
                    />
                </button>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
