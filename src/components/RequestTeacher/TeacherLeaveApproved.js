import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function TeacherLeaveApprovedList(props) {

    const dispatch = useDispatch();

    const teacher_leaves = useSelector((state) => state.teacher_leaves);
    const history = useHistory();

    const onChangeRoute = (section) => {
      let path = "/classes/section";
      localStorage.removeItem('section_id')
      localStorage.setItem('section_id', section.section_id.toString())
      localStorage.removeItem('class_id')
      localStorage.setItem('class_id', section.class_id.toString())
      history.push({
          pathname: path
      })
  }

  const datas = teacher_leaves.acceptLeaves

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

  function viewDetailButton(cell, row) {
    var start_date = new Date(row.start_time);
    var end_date = new Date(row.end_time);
    var date_now = new Date();

    if ((start_date.getTime() - date_now.getTime()) / 1000 > 86400) {
        localStorage.setItem('is_active', "not_active_now")
        return (
          <button type="button" className="btn btn-primary" onClick={() => {
            onChangeRoute(row)
          }}>Tham gia</button>
        )
    }
    else if ((start_date.getTime() - date_now.getTime()) / 1000 < 86400 && (date_now.getTime() - start_date.getTime()) / 1000 < 0) {
      localStorage.setItem('is_active', "pre_active_now")
      return (
        <button type="button" className="btn btn-primary" onClick={() => {
          onChangeRoute(row)
        }}>Tham gia</button>
      )
    }
    else if ((date_now.getTime() - start_date.getTime()) / 1000 > 0 && (end_date.getTime() - date_now.getTime()) / 1000 > 0) {
      localStorage.setItem('is_active', "active_now")
      return (
        <button type="button" className="btn btn-primary" onClick={() => {
          onChangeRoute(row)
        }}>Tham gia</button>
      )
    }
    else {
      localStorage.setItem('is_active', "not_active")
      return (
        <span></span>
      )
    }
  }

  function endTimeButton(cell, row) {
    return (
        <span>{row.end_time.replaceAll("T", " ").substring(0,16)}</span>
    )
  }

  function startTimeButton(cell, row) {
    return (
        <span>{row.start_time.replaceAll("T", " ").substring(0,16)}</span>
    )
  }


  const columns = [
    {
      dataField: 'class_name',
      text: 'Lớp',
      filter: textFilter()
    },
    {
      dataField: 'section_name',
      text: 'Buổi học',
      filter: textFilter()
    },
    {
      dataField: 'teacher_name',
      text: 'Giáo viên',
      filter: textFilter()
    },
    {
      dataField: 'section_number',
      text: 'Buổi thứ',
      filter: textFilter()
    },
    {
      dataField: 'start_time',
      text: 'Thời gian bắt đầu',
      formatter: startTimeButton
    },
    {
      dataField: 'end_time',
      text: 'Thời gian kết thúc',
      formatter: endTimeButton
    },
    {
      dataField: '',
      text: 'Hành động',
      formatter: viewDetailButton
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

export default TeacherLeaveApprovedList;
