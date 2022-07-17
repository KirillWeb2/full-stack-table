import React, { FC, memo, useCallback, useContext, useEffect, useState } from 'react';
import { ServiceContext } from '../../context/Service';
import { IPagination } from '../../types/Pagination';
import { IRequest } from '../../types/Service';

interface IPaginationComponent {
    max: number
};


const Pagination: FC<IPaginationComponent> = ({ max }) => {
    const { query, setQuery } = useContext(ServiceContext)

    // массив объектов 
    const [pagination, setPagination] = useState<IPagination[]>([])


    const createPagination = useCallback((query: IRequest) => {
        // фукнция, которая принимает объект запроса
        // на его основании строит массив пагинации

        const result = []

        // определение минимума и максимума
        let min = query.page - 2 >= 1 ? query.page - 2 : 1
        let maximum = ((query.page + 2) * 10) <= max ? query.page + 2 : Math.ceil(max / 10)

        // итерация от минимума, до максимума
        for (let i = min; i <= maximum; i++) {
            if (i === query.page) {
                result.push({
                    value: i,
                    active: true
                })
            } else {
                result.push({
                    value: i,
                    active: false
                })
            }
        }

        setPagination(result)
    }, [max])

    const back = () => {
        if (query.page === 1) return

        setQuery({ ...query, page: query.page - 1 })
    }

    const forward = () => {
        if (query.page * query.limit >= max) return

        setQuery({ ...query, page: query.page + 1 })
    }

    // мгновенный переход на страницу
    const paginationClick = (page: number) => setQuery({ ...query, page: page })

    useEffect(() => {
        // следит за актуальным телом запроса и генерирует актуальную пагинацию
        if (query) createPagination(query)
    }, [query, createPagination])

    return (
        <div className='buttons'>
            <button onClick={back} className="button button--hyperion"><span><span>Back</span></span></button>

            <ul className="pagination">
                {pagination && pagination.map(i =>
                    <li
                        onClick={() => paginationClick(i.value)}
                        key={i.value}
                        className={i.active ? "pagination__item active" : "pagination__item"}>
                        {i.value}
                    </li>
                )
                }
            </ul>

            <button onClick={forward} className="button button--hyperion"><span><span>Forward</span></span></button>
        </div>
    );
};

export default memo(Pagination);