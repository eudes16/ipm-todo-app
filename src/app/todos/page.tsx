'use client';

import Dialog from '@/components/notifications/Dialog';
import TodosPage from '@/components/todos/TodoPage';
import { ThemeProvider } from '@/data/context/ContextTheme';
import { TodoProvider } from '@/data/context/TodoProvider';
import { FC, Reducer, createContext, useReducer } from 'react';

interface ContextTodosProps {
    dispatchDialog: any;
}

export const ContextTodos = createContext<ContextTodosProps>({ dispatchDialog: {} } as ContextTodosProps);

const PageTodos: FC = () => {

    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case 'OPEN':
                return { ...state, open: true }
            case 'CLOSE':
                return { ...state, open: false }
            case 'SETUP':
                return { ...action.payload, open: true }
            default:
                return state
        }
    }

    const [dialogState, dispatchDialog] = useReducer<Reducer<any, any>>(reducer, {
        open: false,
        title: '',
        content: '',
        notifyOnly: false,
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
        onConfirm: () => { },
        onCancel: () => { },
    });

    const ctx = {
        dispatchDialog
    } as any
    return <ThemeProvider>
        <TodoProvider>
            <ContextTodos.Provider value={ctx}>
                <TodosPage />
                <Dialog
                    open={dialogState.open}
                    notifyOnly={dialogState.notifyOnly}
                    title={dialogState.title}
                    content={dialogState.content}
                    confirmText={dialogState.confirmText}
                    cancelText={dialogState.cancelText}
                    onClose={() => dispatchDialog({ type: 'CLOSE', payload: '' })}
                    onConfirm={() => {
                        dialogState.onConfirm()
                    }}
                    onCancel={() => {
                        dialogState.onCancel()
                    }}
                />
            </ContextTodos.Provider>
        </TodoProvider>
    </ThemeProvider>
}

export default PageTodos;