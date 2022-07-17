import { createContext } from "react";
import { IRequest } from "../types/Service";

export interface IServiceContext {
    query: IRequest
    setQuery: (data: IRequest) => void
}

export const ServiceContext = createContext<IServiceContext>({
    query: {
        limit: 10,
        page: 1,
        searchColumn: "",
        sort: "",
        sortColumn: "",
        type: "",
        value: ""
    },
    setQuery: () => { },
})
