import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function ScheduleForClassList(props) {

    const dispatch = useDispatch();

    const time_schedules = useSelector((state) => state.time_schedules);
  



  const datas = time_schedules.timeSchedules;

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


  function viewStartTime(cell, row) {
    return (
        <span>{row.start_time.replaceAll('T', " ")}</span>
    )
  }

  function viewEndTime(cell, row) {
    return (
        <span>{row.end_time.replaceAll('T', " ")}</span>
    )
  }

  function viewSection(cell, row, rowIndex) {
    return (
        <span>Buổi {rowIndex + 1}</span>
    )
  }




  const columns = [
    {
      dataField: 'name',
      text: 'Buổi học',
      filter: textFilter(),
      formatter: viewSection
    },
    {
      dataField: 'start_time',
      text: 'Thời gian bắt đầu',
      formatter: viewStartTime
    },
    {
        dataField: 'end_time',
        text: 'Thời gian kết thúc',
        formatter: viewEndTime
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

export default ScheduleForClassList;
