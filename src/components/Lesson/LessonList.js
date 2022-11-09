import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LessonModificationStatus } from "../../store/models/lesson.interface";
import { setModificationState } from "../../store/actions/lesson.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';


function LessonList(props) {

    const dispatch = useDispatch();
    const lessons = useSelector((state) => state.lessons);


  const datas = lessons.lessons;

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
    var strDate = row.start_time;
    return (
        <span>{strDate.substring(0, 10) + " " + strDate.substring(11,19)}</span>
    )
  }

  function showEndTime(cell, row) {
    var strDate = row.start_time;
    return (
        <span>{strDate.substring(0, 10) + " " + strDate.substring(11,19)}</span>
    )
  }

  function removeButton(cell, row) {
    return (
        <button type="button" className="btn btn-danger" onClick={() =>{
            if(props.onSelect) props.onSelect(row);
            dispatch(setModificationState(LessonModificationStatus.Remove))
          }}>Xóa</button>
    );
  }

  function editButton(cell, row) {
    return (
        <button type="button" className="btn btn-primary" onClick={()=> {
            if(props.onSelect) props.onSelect(row);
            dispatch(setModificationState(LessonModificationStatus.Edit))
          }}>Chỉnh sửa</button>
    )
  }

  const columns = [
    {
      dataField: 'start_time',
      text: 'Thời gian bắt đầu',
      formatter: showStartTime
    },
    {
      dataField: 'end_time',
      text: 'Thời gian kết thúc',
      formatter: showEndTime
    },
    {
      dataField: '',
      text: 'Hành động',
      formatter: editButton
    },
    {
      dataField: '',
      text: '',
      formatter: removeButton
    },
  ];

  const contentTable = ({ paginationProps, paginationTableProps }) => (
    <div>
      <PaginationListStandalone {...paginationProps} />
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

export default LessonList;