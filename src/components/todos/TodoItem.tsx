import { Todo } from '@/data/models/Todo';
import { FC, useContext } from 'react';
import { IconCalendar, IconCheck, IconCheckbox, IconExclamationCircle, IconProgressAlert, IconQuestionMark, IconSquare, IconTrash } from '@tabler/icons-react';
import ButtonText from '../layouts/buttons/ButtonText';
import ContextTodo from '@/data/context/TodoProvider';
import { ContextTodos } from '@/app/todos/page';
import { DefaultColors } from '@/shared/base.types';

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: FC<TodoItemProps> = (props) => {
    const { setCompleted, exclude } = useContext(ContextTodo);

    const { dispatchDialog } = useContext(ContextTodos);

    const confirmCompleted = () => {
        dispatchDialog({
            type: 'SETUP',
            payload: {
                title: 'Confirmação',
                content: 'Deseja realmente concluir essa tarefa?',
                confirmText: 'Sim',
                cancelText: 'Não',
                infoOnly: false,
                onConfirm: () => {
                    setCompleted(props.todo);
                    dispatchDialog({ type: 'CLOSE', payload: { open: false } });
                },
                onCancel: () => {
                    dispatchDialog({ type: 'CLOSE', payload: { open: false } });
                },
                onClose: () => {
                    dispatchDialog({ type: 'CLOSE', payload: { open: false } });
                }
            }
        });
    }

    const confirmDelete = () => {
        dispatchDialog({
            type: 'SETUP',
            payload: {
                title: 'Confirmação',
                content: 'Deseja realmente excluir essa tarefa?',
                confirmText: 'Sim',
                cancelText: 'Não',
                onConfirm: () => {
                    exclude(props.todo);
                    dispatchDialog({ type: 'CLOSE', payload: { open: false } });
                },
                onCancel: () => {
                    dispatchDialog({ type: 'CLOSE', payload: { open: false } });
                },
                onClose: () => {
                    dispatchDialog({ type: 'CLOSE', payload: { open: false } });
                }
            }
        });
    }

    const resolveDueDate = (label: string, dateField?: string | null, color?: DefaultColors): any => {
        let dateTimeString: any = <IconQuestionMark size={12} className='text-warning' />;
        if (dateField) {
            const date = new Date(dateField).toLocaleDateString();
            const time = new Date(dateField).toLocaleTimeString();
            dateTimeString = `${date} - ${time}`;
        }
        return <div className={`
                flex flex-col gap-2
        `}>
            <div className={`
                    flex flex-row gap-2 items-center
                    ${color ? `text-${color}` : ''}
                `}>
                <IconCalendar size={12} /> {label}: {dateTimeString}
            </div>

        </div>
    }

    return (
        <div
            className={`
                flex flex-col
                justify-items-start
                border-b-2 border-zinc-200 dark:border-zinc-700
                mb-4
            `}
        >
            <div className='flex gap-4 flex-row items-center'>
                <div className={`p-4 todo-status-${props.todo.status} shrink-1 rounded-full`}>
                    {props.todo.status === 'open' ? <IconProgressAlert size={24} /> : <IconCheck size={24} />}
                </div>
                <div className='flex flex-col flex-auto'>
                    <div
                        className={`
                            flex
                            font-bold text-lg
                        `}
                    >
                        {props.todo.title}
                    </div>
                    <div className={`
                            flex
                            italic font-light text-sm
                            text-zinc-700 dark:text-zinc-300
                        `}
                    >
                        {props.todo.description}
                    </div>
                </div>

            </div>
            <div className='flex gap-4 justify-items-center justify-end w-full flex-wrap'>
                <div className={`
                    flex flex-row p-4 gap-4 flex-auto flex-wrap
                    justify-start
                    text-zinc-700 dark:text-zinc-300 text-xs  font-semibold italic
                `}>
                    {resolveDueDate('Criação', props.todo.created_at,)}
                    {resolveDueDate('Previsão', props.todo.due_date, 'secondary')}
                    {props.todo.status == 'close' ? resolveDueDate('Conclusão', props.todo.updated_at, 'success') : null}
                </div>
                <div className={`
                    flex flex-row p-4 gap-4 flex-auto
                    justify-end
                    text-zinc-700 dark:text-zinc-300 text-xs
                `}>

                </div>
                <div>

                    <ButtonText
                        title='Concluir tarefa'
                        color={props.todo.status === 'open' ? 'success' : undefined}
                        size='xs'
                        icon={props.todo.status === 'open' ? <IconCheckbox /> : <IconSquare />}
                        onClick={() => {
                            if (props.todo.status === 'open') {
                                confirmCompleted();
                            }
                        }}
                    />
                    <ButtonText
                        title='Excluir tarefa'
                        color='danger'
                        size='xs'
                        icon={<IconTrash />}
                        onClick={() => {
                            confirmDelete();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default TodoItem;