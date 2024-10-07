import ContextTodo from '@/data/context/TodoProvider';
import useToggle from '@/data/hooks/useToggle';
import { Todo } from '@/data/models/Todo';
import { IconFilter, IconMenu, IconPlus, IconZoomExclamation } from '@tabler/icons-react';
import { FC, Reducer, useContext, useEffect, useReducer } from 'react';
import ButtonOutlined from '../layouts/buttons/ButtonOutlined';
import ButtonText from '../layouts/buttons/ButtonText';
import Page from '../layouts/Page';
import TodoItem from './TodoItem';
import TodosFilters from './TodosFilters';
import Loader from '../layouts/Loader';
import TodoEdit from './TodoEdit';
import { ContextTodos } from '@/app/todos/page';
import Pagination from '../layouts/Pagination';
import { Pagination as PaginationType } from '@/shared/base.types';
import LogoIPM from '../layouts/LogoIPM';


const todoEditReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SETUP':
            return {
                ...state,
                open: true,
            }
        case 'CLOSE':
            return {
                ...state,
                todo: {
                    title: '',
                    description: '',
                    due_date: '',
                } as Partial<Todo>,
                open: false,
            }
        case 'CHANGE': {
            return {
                ...state,
                ...action.payload
            }
        }
        default: action.payload
    }
}


const TodosPage: FC = () => {
    const { todos, fetchTodos, loading, add: saveTodo, pagination, filter } = useContext(ContextTodo);
    const [showFilters, toggleShowFilters] = useToggle(false);

    const { dispatchDialog } = useContext(ContextTodos);

    const validateDialog = (messages: string[]) => {

        dispatchDialog({
            type: 'SETUP',
            payload: {
                title: 'Aviso',
                content: messages.join('\n'),
                confirmText: 'Sim',
                cancelText: 'Não',
                notifyOnly: true,
                onConfirm: () => {
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

    const [todoEditState, dispatchTodoEdit] = useReducer<Reducer<any, any>>(todoEditReducer, {
        open: false,
        todo: {
            title: '',
            description: '',
            due_date: '',
        } as Partial<Todo>
    });

    const openEdit = () => {
        dispatchTodoEdit({
            type: 'SETUP',
            payload: {
                ...todoEditState,
                open: true,

            }
        });
    }

    const onChangeEdit = (editedTodo: Todo) => {
        dispatchTodoEdit({
            type: 'CHANGE',
            payload: {
                ...todoEditState,
                todo: editedTodo
            }
        });
    }

    const onCancelEdit = () => {
        dispatchTodoEdit({
            type: 'CLOSE',
            payload: {
                ...todoEditState,
                open: false
            }
        });
        fetchTodos();
    }

    const onSaveEdit = async (todo: Todo) => {
        const messages = [];

        if (todo?.title === '') {
            messages.push('O título é obrigatório');
        }


        if (todo?.due_date === '') {
            todo.due_date = null;
        }

        if (messages.length > 0) {
            validateDialog(messages);
            return;
        }

        await saveTodo(todo);
        await fetchTodos();
        onCancelEdit();
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <>
            <Loader open={loading} />
            <Page
            >
                <div className={`
                    flex flex-row gap-4 p-4 
                    w-full sm:w-10/12 md:w-3/4 lg:w-2/3 xl:w-5/6
                    border-2 border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg
                `}>
                    <div className={`
                        flex gap-2 text-3xl text-zinc-700 dark:text-zinc-500
                        justify-center 
                        items-center
                    `}>
                        <LogoIPM />
                        <span className='text-secondary dark:text-zinc-700 font-mono font-semibold'>
                            Tarefas
                        </span>
                    </div>
                </div>
                <div className={`
                    flex flex-col space-y-4 p-4
                    w-full sm:w-10/12 md:w-3/4 lg:w-2/3 xl:w-5/6
                    h-auto
                    overflow-y-auto
                    shadow-lg
                    border-2 border-zinc-200 dark:border-zinc-700 rounded-md
                `}>

                    <div className={`flex  flex-col-reverse sm:flex-row gap-4 flex-wrap `}>
                        <ButtonText
                            className={`w-full sm:w-auto md:w-auto lg:w-auto xl:w-auto`}  
                            icon={<IconFilter />}
                            text="Filtros"
                            onClick={toggleShowFilters}
                        />
                        <ButtonOutlined
                            className={``}
                            color="primary"
                            text='Adicionar Tarefa'
                            icon={<IconPlus />}
                            onClick={() => {
                                openEdit();
                            }}
                        />
                    </div>
                    <TodosFilters open={showFilters} />
                    <div className={`
                        scrollbar
                        overflow-y-auto   
                    `}>
                        {todos?.length === 0 ? <>
                            <div className="flex h-auto flex-col justify-center items-center text-center justify-items-center text-zinc-700 dark:text-zinc-500">
                                <IconZoomExclamation size={96} className='text-zinc-400 dark:text-zinc-500' />
                                Nenhuma tarefa encontrada
                            </div>
                        </> : <>

                            {todos?.map((todo: Todo) => {
                                return (
                                    <TodoItem
                                        key={todo.id}
                                        todo={todo}
                                    />
                                );
                            })}
                        </>}
                    </div>
                    <Pagination
                        pagination={pagination}
                        onChange={(page) => {
                            fetchTodos(filter, page);
                        }} />
                </div>
            </Page>
            <TodoEdit
                open={todoEditState.open}
                todo={todoEditState.todo}
                onChange={(editedTodo: Todo) => {
                    onChangeEdit(editedTodo)
                }}
                onCancel={() => {
                    onCancelEdit()
                }}
                onSave={(todoToSave: Todo) => {
                    onSaveEdit(todoToSave)
                }}

            />
        </>
    );
}

export default TodosPage;