

export interface ITableData {
    _id: string
    name: string
    quantity: number
    distance: number
    date: string
}

export interface IHeader {
    type: "" | "asc" | "desc"
    value: "" | "name" | "quantity" | "distance" | "date"
}