import { FC, useContext, useState } from 'react';
import Flex from '../layouts/Flex';
import TextField from '../layouts/inputs/TextField';
import ButtonContained from '../layouts/buttons/ButtonContained';
import { IconClearAll, IconEraser, IconFilter, IconSearch } from '@tabler/icons-react';
import DropDown, { IOptions } from '../layouts/DropDown';
import useToggle from '@/data/hooks/useToggle';
import ContextTodo, { TodoProvider } from '@/data/context/TodoProvider';
import ButtonOutlined from '../layouts/buttons/ButtonOutlined';

interface TodosFiltersProps {
    open: boolean;
}

const criteriaTitle: IOptions[] = [
    { value: '', text: 'Selecione' },
    { value: 'title_eq', text: 'Igual' },
    { value: 'title_like', text: 'Contem' },
]

const criteriaDescription: IOptions[] = [
    { value: '', text: 'Selecione' },
    { value: 'description_like', text: 'Contem' },
    { value: 'description_not_eq', text: 'Diferente' }
]

const statusOptions: IOptions[] = [
    { value: '', text: 'Todos' },
    { value: 'open', text: 'Pendente' },
    { value: 'close', text: 'Concluída' }
]


const TodosFilters: FC<TodosFiltersProps> = (props) => {
    const { filterIntial, filter, setFilter, fetchTodos } = useContext(ContextTodo)

    const [criteriaTitleOpen, setCriteriaTitleOpen] = useState(false);
    const [criteriaTitleValue, setCriteriaTitleValue] = useState<any>(null);

    const [criteriaDescriptionOpen, setCriteriaDescriptionOpen] = useState(false);
    const [criteriaDescriptionValue, setCriteriaDescriptionValue] = useState<any>(null);

    const [criteriaStatusOpen, setCriteriaStatusOpen] = useState(false);
    const [criteriaStatusValue, setCriteriaStatusValue] = useState<any>(null);

    const handleClear = () => {
        setFilter(filterIntial);
        setCriteriaTitleValue(null);
        setCriteriaDescriptionValue(null);
        setCriteriaStatusValue(null);
    }

    return (
        <div className={`
            justify-center items-center
            transition-all duration-300 ease-linear
            bg-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 dark:border-2 p-4
            rounded-md
            ${props.open ? 'visible' : 'invisible'}
            ${props.open ? " opacity-100 h-18" : "opacity-0 h-0"}
        `}>
            <div className={`
                flex flex-row gap-1 flex-wrap sm:gap-4 mb-8 sm:mb-0
            `}>
                <div className='flex w-full sm:w-auto sm:flex-grow'>
                    <TextField
                        label="Título"
                        placeholder="Título"
                        className="flex w-full"
                        value={filter?.title}
                        onInput={(e) => {
                            setFilter({
                                ...filter,
                                title: e.target.value
                            })
                        }
                        }
                    />
                </div>

                <div className='flex w-full sm:w-auto sm:flex-shrink '>
                    <DropDown
                        fullWidth
                        label="Critério"
                        options={criteriaTitle}
                        value={criteriaTitle?.find((item: any) => item.value === filter.title_criteria)}
                        onChange={(_value) => {
                            setFilter((prevValue: any) => {
                                return {
                                    ...prevValue,
                                    title_criteria: _value.value,
                                }
                            })
                            setCriteriaTitleOpen(!criteriaTitleOpen)
                        }}
                        onOpen={() => setCriteriaTitleOpen(true)}
                        onClose={() => setCriteriaTitleOpen(false)}
                        open={criteriaTitleOpen}
                        variation='outlined'
                    />
                </div>
            </div>

            <div className={`
                flex flex-row gap-1 flex-wrap sm:gap-4 mb-8 sm:mb-0
            `}>
                <div className='flex w-full sm:w-auto sm:flex-grow'>
                    <TextField
                        label="Descrição"
                        placeholder="Descrição"
                        className="w-full"
                        value={filter?.description}
                        onInput={(e) => {
                            setFilter({ ...filter, description: e.target.value })
                        }}
                    />
                </div>
                <div className='flex w-full sm:w-auto sm:flex-shrink '>
                    <DropDown
                        fullWidth
                        label="Critério"
                        options={criteriaDescription}
                        value={criteriaDescription?.find((item: any) => item.value === filter.description_criteria)}
                        onChange={(_value) => {
                            setFilter((prevValue: any) => {
                                return {
                                    ...prevValue,
                                    description_criteria: _value.value,
                                }
                            })

                            setCriteriaDescriptionOpen(!criteriaDescriptionOpen)
                        }}
                        onOpen={() => setCriteriaDescriptionOpen(true)}
                        onClose={() => setCriteriaDescriptionOpen(false)}
                        open={criteriaDescriptionOpen}
                        variation='outlined'
                    />
                </div>
            </div>
            <div className={`
                flex flex-col sm:flex-row gap-4 flex-wrap
            `}>
                <div className='flex flex-auto'>
                    <DropDown
                        fullWidth
                        label="Situação"
                        options={statusOptions}
                        value={statusOptions.find((item: any) => item.value === filter.status)}
                        onChange={(_value) => {
                            setFilter((prevValue: any) => {
                                return {
                                    ...prevValue,
                                    status: _value.value,
                                }
                            })
                            setCriteriaStatusOpen(!criteriaStatusOpen)
                        }}
                        onOpen={() => setCriteriaStatusOpen(true)}
                        onClose={() => setCriteriaStatusOpen(false)}
                        open={criteriaStatusOpen}
                        variation='outlined'
                    />
                </div>
                <div className='flex mt-5 gap-4 flex-auto justify-center sm:justify-end'>

                    <ButtonOutlined
                        className={`w-full sm:w-auto`}
                        color="primary"
                        icon={<IconEraser />}
                        onClick={() => {
                            handleClear();
                        }}

                    />

                    <ButtonContained
                        className={`w-full sm:w-auto`}
                        color="secondary"
                        icon={<IconSearch />}
                        onClick={() => {
                            fetchTodos(filter);
                        }}

                    />

                </div>
            </div>
        </div>
    );
}

export default TodosFilters;