import { ISuccess } from './../types/Service';
import axios from "../axios";
import { useCallback, useEffect, useState } from "react";
import { IRequest } from "../types/Service";
import { ITableData } from "../types/Table";

export const url = "http://localhost:4444"

const generateParams = ({ limit, page, searchColumn, sort, sortColumn, type, value }: IRequest): string => {
    return `/api?limit=${limit}&page=${page}&sort=${sort}&sortColumn=${sortColumn}&searchColumn=${searchColumn}&type=${type}&value=${value}`
}

export const useService = (data: IRequest) => {
    const [max, setMax] = useState<number>(0);
    const [rows, setRows] = useState<ITableData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const request = useCallback(async () => {
        setIsLoading(true)

        const response = await axios.get<ISuccess>(generateParams(data))

        if (response.data) {
            setMax(response.data.max)
            setRows(response.data.rows)
        }

        setIsLoading(false)
    }, [data])


    useEffect(() => {
        request()
    }, [data, request]);

    return {
        // столбцы 
        rows,
        // загрузка данных
        isLoading,
        // Максимальное число столбцов
        max
    }
};