import React, { FC, memo } from 'react';
import { ITableData } from '../../types/Table';

interface ITableItemComponent {
    item: ITableData
};

const TableItem: FC<ITableItemComponent> = ({ item }) => {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.distance}</td>
            <td>{item.date.split('T')[0]}</td>
        </tr>
    );
};

export default memo(TableItem);