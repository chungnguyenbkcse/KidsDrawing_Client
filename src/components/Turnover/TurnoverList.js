import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

function TurnoverList() {

    const userRegisterJoinSemesters = useSelector((state) => state.user_register_join_semesters);


  const datas = userRegisterJoinSemesters.completed;

  const options = {
    paginationSize: 5,
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
    totalSize: datas.length,
    onSizePerPageChange: (sizePerPage, page) => {
      console.log('Size per page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    },
    onPageChange: (page, sizePerPage) => {
      console.log('Page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    }
  };

  function showStartTime(cell, row) {
    var strDate = row.time;
    return (
        <span>{strDate.replaceAll("T", " ").substring(0,16)}</span>
    )
  }

  const columns = [
    {
      dataField: 'payer_name',
      text: 'Phụ huynh',
      filter: textFilter()
    },
    {
      dataField: 'student_name',
      text: 'Học sinh',
      filter: textFilter()
    },
    {
        dataField: 'course_name',
        text: 'Khóa học',
        filter: textFilter()
      },
      {
        dataField: 'price',
        text: 'Số tiền',
        filter: textFilter()
      },
    {
      dataField: 'time',
      text: 'Thời gian',
      formatter: showStartTime
    },
  ];

  const contentTable = ({ paginationProps, paginationTableProps }) => (
    <div>
      {/* <PaginationListStandalone {...paginationProps} /> */}
      <div>
        <div>
          <BootstrapTable
            hover
            keyField="id"
            data={datas}
            columns={columns}
            filter={filterFactory()}
            {...paginationTableProps}
          />
        </div>
      </div>
      {/* <PaginationListStandalone {...paginationProps} /> */}
    </div>
  );


  return (
      <Fragment>
      <div>
        <PaginationProvider
          pagination={
            paginationFactory(options)
          }
        >
          {contentTable}
        </PaginationProvider>
      </div >
    </Fragment>

  );
}

export default TurnoverList;
