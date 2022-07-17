import React, { FC, memo, useContext, useState } from 'react';
import { ServiceContext } from '../../context/Service';
import { IHeader, ITableData } from '../../types/Table';
import TableItem from '../tableItem/TableItem';

interface ITableComponent {
    rows: ITableData[]
};



const Table: FC<ITableComponent> = ({ rows }) => {
    const { query, setQuery } = useContext(ServiceContext)


    const [headers, setHeaders] = useState<IHeader[]>([
        { type: "", value: "name" },
        { type: "", value: "quantity" },
        { type: "", value: "distance" },
        { type: "", value: "date" },
    ])

    const sort = (column: IHeader) => {
        if (column.value === "date") return

        setHeaders(headers.map(i => {
            if (i.value === column.value) {
                return { ...i, type: i.type === "asc" ? "desc" : "asc" }
            } else {
                return i
            }
        }))

        setQuery({
            ...query,
            sort: column.type === "asc" ? "desc" : "asc",
            sortColumn: column.value
        })
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    {headers.map(i => <th key={i.value} onClick={() => sort(i)}>{i.value}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map(i => <TableItem key={i._id} item={i} />)}
            </tbody>
        </table>
    );
};

export default memo(Table);