import { ITableData } from './Table';


export interface IUseService {
    limit: number
    page: number
}

export interface IRequest {
    // sort
    sort?: "" | "asc" | "desc"
    sortColumn?: "" | "name" | "quantity" | "distance" | "date"

    // search
    searchColumn?: "" | "name" | "quantity" | "distance" | "date"
    type?: "" | "equally" | "contains" | "more" | "less"
    value?: string

    // pagination
    limit: number
    page: number
}

export interface ISuccess {
    max: number
    rows: ITableData[]
}

