import React, { FC, memo, useContext, useState } from 'react';
import { ServiceContext } from '../../context/Service';
import { IFilters, IIsDisabled } from '../../types/Filters';


const columns = [
    "name",
    "quantity",
    "distance",
    "date"
];

const conditions = [
    "contains",
    "equally",
    "more",
    "less"
];

const isDisabled = ({ column, type }: IIsDisabled) => {
    if (column === "name" && (type === "less" || type === "more")) {
        return true
    }
    if (column === "quantity" && (type === "contains")) {
        return true
    }
    if (column === "distance" && (type === "contains")) {
        return true
    }
    if (column === "distance"){
        return true
    }
}



interface IFilteringComponent {
    isLoading: boolean
};


const Filtering: FC<IFilteringComponent> = ({ isLoading }) => {
    const { query, setQuery } = useContext(ServiceContext);

    const [filters, setFilters] = useState<IFilters>({
        searchColumn: "",
        type: "",
        value: ""
    });

    // если все поля заполнены
    const valid = !filters.searchColumn || !filters.type || !filters.value;


    const searchSubmit = () => setQuery({
        ...query,
        searchColumn: filters.searchColumn as "",
        type: filters.type as "",
        value: filters.value
    });

    const reset = () => {
        setFilters({
            searchColumn: "",
            type: "",
            value: ""
        })
        setQuery({
            ...query,
            searchColumn: "",
            type: "",
            value: ""
        })
    };

    return (
        <div className='filtering'>
            <div className='filtering__loading'>
                {isLoading && "Loading..."}
            </div>
            <div className='filters'>
                <select
                    className='filters__select'
                    value={filters.searchColumn}
                    onChange={e => setFilters({ ...filters, searchColumn: e.target.value })}
                >
                    <option value="">Select a column</option>
                    {columns.map(i => <option key={i} disabled={i === 'date'} value={i}>{i}</option>)}
                </select>
                <select
                    className='filters__select'
                    value={filters.type}
                    onChange={e => setFilters({ ...filters, type: e.target.value })}
                >
                    <option value="">Select the sort type</option>
                    {conditions.map(i => <option key={i} disabled={isDisabled({ column: filters.searchColumn, type: i })} value={i}>{i}</option>)}
                </select>
                <input
                    className='filters__input'
                    type="text"
                    placeholder='Search value'
                    value={filters.value}
                    onChange={e => setFilters({ ...filters, value: e.target.value })}
                />
                <button onClick={searchSubmit} disabled={valid} className="button button--hyperion filters__btn"><span><span>Search</span></span></button>
                <button onClick={reset} className="button button--hyperion filters__btn"><span><span>Reset</span></span></button>
            </div>

        </div>
    );
};

export default memo(Filtering);