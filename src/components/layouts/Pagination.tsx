import { Pagination as PagintationType } from '@/shared/base.types';
import { FC } from 'react';
import ButtonContained from './buttons/ButtonContained';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import ButtonOutlined from './buttons/ButtonOutlined';

interface PaginationProps {
    pagination: PagintationType | null
    onChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = (props) => {

    if (!props.pagination) {
        return null;
    }


    return (
        <div className={`
            flex flex-row justify-between items-center
            gap-2
            px-2
        `}>
            <div>
                <span>
                    Total de registros: {props.pagination.total} | Página {props.pagination.page} de {props.pagination.pages}
                </span>
            </div>
            <div className='flex gap-2'>
                <ButtonOutlined
                    color={props.pagination?.prev ? 'primary' : undefined}
                    size='xs'
                    icon={<IconArrowLeft />}
                    onClick={() => {
                        if (props.pagination?.prev) {
                            props.onChange(props.pagination.prev);
                            return;
                        }
                        return;
                    }}
                    />

                <ButtonOutlined
                    color={props.pagination?.next ? 'primary' : undefined}
                    size='xs'
                    icon={<IconArrowRight />}
                    onClick={() => {
                        if (props.pagination?.next) {
                            props.onChange(props.pagination.next);
                            return;
                        }
                        return;
                    }}
                />
            </div>
        </div>
    );
}

export default Pagination;