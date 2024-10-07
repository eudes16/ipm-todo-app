import { createContext, useCallback, useEffect, useState } from "react"
import { Todo } from "../models/Todo"
import { DataRequestInterface } from "@/shared/http/domain/types";
import { httpClient } from "@/shared/http/HttpClient";
import { Pagination } from "@/shared/base.types";

interface TodoProviderProps {
    children: any
}

interface TodoFilter {
    title: string;
    title_criteria: string;
    description: string;
    description_criteria: string;
    status: string;
}

const filterIntial: TodoFilter = {
    title: '',
    title_criteria: '',
    description: '',
    description_criteria: '',
    status: ''
}


const ContextTodo = createContext({} as any)

export const TodoProvider = (props: TodoProviderProps) => {
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState(filterIntial);
    const [todos, setTodos] = useState<Todo[]>([])
    const [pagination, setPagination] = useState<Pagination | null>({
        total: 0,
        page: 1,
        limit: 5,
        pages: 1,
        next: null,
        prev: null
    })

    const fetchTodos = useCallback(async (queryFilter?: any, page?: number, order?: string) => {

        try {
            setLoading(true);

            const query: string[] = [];
            const queryOrder = 'order=' + (order ?? 'status,id_desc');
            let url = '/todos';

            query.push(queryOrder);

            const limit = pagination?.limit ?? 5;


            query.push(`limit=${limit}`);

            if (page) {
                query.push(`page=${page}`);
            }


            if (queryFilter?.title.length > 0) {
                const criterio = queryFilter.title_criteria === '' ? 'title_like' : queryFilter.title_criteria;
                query.push(`${criterio}=${queryFilter.title}`);
            }

            if (queryFilter?.description.length > 0) {
                const criterio = queryFilter.description_criteria === '' ? 'title_like' : queryFilter.description_criteria;
                query.push(`${queryFilter.criterio}=${queryFilter.description}`);
            }

            if (queryFilter?.status.length > 0) {
                query.push(`status_eq=${queryFilter.status}`);
            }


            if (query.length > 0) {
                url += `?${query.join('&')}`;
            }

            const request: DataRequestInterface = {
                url
            }
            const response = await httpClient.get<Todo[]>(request);

            if (response.status === 200) {
                setTodos(response.data?.data ?? []);
                setPagination(response.data?.pagination ?? null);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }, []);

    const setCompleted = useCallback(async (todo: Todo) => {
        try {
            setLoading(true);
            const request: DataRequestInterface = {
                url: `/todos/${todo.id}`,
                data: {
                    status: 'close'
                }
            }
            const response = await httpClient.put<Todo>(request);

            if (response.status === 200) {
                await fetchTodos();
            }

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }, [])

    const exclude = useCallback(async (todo: Todo) => {
        try {
            setLoading(true);
            const request: DataRequestInterface = {
                url: `/todos/${todo.id}`,
                data: {
                    status: 'close'
                }
            }
            const response = await httpClient.delete<Todo>(request);

            if (response.status === 200) {
                await fetchTodos();
            }

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }, [])

    const add = useCallback(async (todo: Todo) => {
        try {
            setLoading(true);

            let todoToSave = {
                ...todo,
            } as Partial<Todo>

            if (todoToSave?.due_date?.length && typeof todoToSave.due_date === 'string') {
                todoToSave.due_date = todoToSave.due_date?.replace('T', ' ') + ':00';
            }

            const request: DataRequestInterface = {
                url: `/todos`,
                data: todo
            }
            const response = await httpClient.post<Todo>(request);

            if (response.status === 200) {
                await fetchTodos();
            }

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }, [])


    const ctx = {
        loading,
        filterIntial,
        filter,
        setFilter,
        todos,
        setTodos,
        fetchTodos,
        setCompleted,
        exclude,
        add,
        pagination,
        setPagination,
    } as any

    return <ContextTodo.Provider value={ctx}>
        {props.children}
    </ContextTodo.Provider>
}

export default ContextTodo