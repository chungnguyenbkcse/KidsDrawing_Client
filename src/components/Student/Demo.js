import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { useState } from 'react';

const selectOptions = {
  0: 'good',
  1: 'Bad',
  2: 'unknown'
};

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'username',
  text: 'Tên đăng nhập',
  filter: textFilter()
}, {
  dataField: 'email',
  text: 'Email',
  formatter: cell => selectOptions[cell],
  filter: selectFilter({
    options: selectOptions,
    defaultValue: 0
  })
}];


export function  Demo (props) {
    const [products, setProducts] = useState(props.data)

    const options = {
      custom: true,
      paginationSize: 4,
      pageStartIndex: 1,
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: 'Next',
      lastPageText: 'Last',
      nextPageTitle: 'First page',
      prePageTitle: 'Pre page',
      firstPageTitle: 'Next page',
      lastPageTitle: 'Last page',
      showTotal: true,
      totalSize: products.length
    };
    const contentTable = ({ paginationProps, paginationTableProps }) => (
      <div>
        <PaginationListStandalone { ...paginationProps } />
        <div>
          <div>
            <BootstrapTable
              striped
              hover
              keyField="id"
              data={ products }
              columns={ columns }
              filter={ filterFactory() }
              { ...paginationTableProps }
            />
          </div>
        </div>
        <PaginationListStandalone { ...paginationProps } />
      </div>
    );

    return (
      <div>
        <PaginationProvider
          pagination={
            paginationFactory(options)
          }
        >
          { contentTable }
        </PaginationProvider>
      </div >
    );
}