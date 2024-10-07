import { Todo } from '@/data/models/Todo';
import { FC } from 'react';
import Modal from '../layouts/Modal';
import ButtonOutlined from '../layouts/buttons/ButtonOutlined';
import ButtonContained from '../layouts/buttons/ButtonContained';
import TextField from '../layouts/inputs/TextField';
import TextArea from '../layouts/inputs/TextArea';

interface TodoEditProps {
    open: boolean
    todo: Todo
    onChange: (todo: Todo) => void
    onCancel: () => void
    onSave: (todo: Todo) => void
}

const TodoEdit: FC<TodoEditProps> = (props) => {
    return (
        <Modal open={props.open} onClose={() => props.onCancel()} >
            <div className="text-zinc-900 dark:text-zinc-100 text-sm">
                Adicionar uma nova tarefa
            </div>
            <div className='flex flex-col '>
                <div className="flex flex-col gap-4 justify-start">

                    <TextField
                        label={'Título *'}
                        value={props.todo?.title || ''}
                        onInput={(e) => {
                            props.onChange({ ...props.todo, title: e.target.value })
                        }}

                    />

                    <TextArea
                        className='h-48'
                        label={'Descrição'}
                        value={props.todo?.description || ''}
                        onInput={(e) => props.onChange({ ...props.todo, description: e.target.value })}
                    />

                    <TextField
                        label={'Previsão para conclusão'}
                        value={props.todo?.due_date || ''}
                        onInput={(e) => props.onChange({ ...props.todo, due_date: e.target.value })}
                        type='datetime-local'
                    />
                </div>
                <div className="flex gap-4">
                    <ButtonOutlined
                        className='flex-grow w-auto'
                        text={'Cancelar'}
                        color='primary'
                        onClick={() => {
                            if (props?.onCancel) {
                                props.onCancel()
                            }
                        }}
                    />

                    <ButtonContained
                        className='flex-grow w-auto'
                        text={'Salvar'}
                        color='success'
                        onClick={() => {
                            if (props?.onSave) {
                                props.onSave(props.todo)
                            }
                        }}
                    />

                </div>
            </div>
        </Modal>
    );
}

export default TodoEdit;