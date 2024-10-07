import { FC } from 'react';
import Modal from '../layouts/Modal';
import { IconExclamationCircle } from '@tabler/icons-react';
import ButtonOutlined from '../layouts/buttons/ButtonOutlined';
import ButtonContained from '../layouts/buttons/ButtonContained';

interface DialogProps {
    open: boolean;
    notifyOnly: boolean;
    title?: string;
    content?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose: () => void;
}



const Dialog: FC<DialogProps> = (props) => {
    return (
        <Modal open={props.open} onClose={() => props.onClose()} >
            <div className="text-center w-56">
                <IconExclamationCircle size={56} className="mx-auto text-orange-500" />
                <div className="mx-auto my-4 w-48">
                    <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                        {props?.title || 'Atenção'}
                    </h3>
                    <p className="text-sm text-zinc-900 dark:text-zinc-100">
                        {props?.content || 'Tem certeza que deseja realizar essa ação?'}
                    </p>
                </div>
                <div className="flex gap-4">
                    {!props.notifyOnly ? <ButtonOutlined
                        className='flex-grow'
                        text={props?.cancelText || 'Cancelar'}
                        color='primary'
                        onClick={() => {
                            if (props?.onCancel) {
                                props.onCancel()
                            }
                        }}
                    /> : null}

                    <ButtonContained
                        className='flex-grow'
                        text={props?.confirmText || 'Confirmar'}
                        color='success'
                        onClick={() => {
                            if (props?.onConfirm) {
                                props.onConfirm()
                            }
                        }}
                    />

                </div>
            </div>
        </Modal>
    );
}

export default Dialog;