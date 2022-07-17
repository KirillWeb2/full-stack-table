import React, { FC, useState } from 'react';
import Filtering from './components/filtering/Filtering';
import Pagination from './components/pagination/Pagination';
import Table from './components/table/Table';
import { ServiceContext } from './context/Service';
import { useService } from './hook/useService';
import { IRequest } from './types/Service';


const App: FC = () => {
  const [query, setQuery] = useState<IRequest>({
    limit: 10,
    page: 1,
    searchColumn: "",
    sort: "",
    sortColumn: "",
    type: "",
    value: ""
  })

  // хук, отправляющий запрос каждый раз, когда меняется query
  const { isLoading, max, rows } = useService(query);

  return (
    <div className="container">
      <ServiceContext.Provider value={{ query, setQuery }}>
        <Filtering isLoading={isLoading} />
        <Table rows={rows} />
        <Pagination max={max} />
      </ServiceContext.Provider>
    </div>
  );
}

export default App;
