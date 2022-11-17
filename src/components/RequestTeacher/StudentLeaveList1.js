import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { putStudentLeaveStatus } from "../../common/service/StudentLeave/PutStudentLeave";


function StudentLeaveList(props) {

    const dispatch = useDispatch();

    const student_leaves = useSelector((state) => state.student_leaves);
    const history = useHistory();

    const onChangeRoute = (student_leave) =>{ 
        localStorage.removeItem("detail_resson")
        localStorage.setItem('detail_resson', student_leave.description)
        let path = '/student-leave/detail'; 
        history.push({
            pathname: path,
        });
    }

    const handleStudentLeave = (student_leave, status) => {
        const id = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        dispatch(putStudentLeaveStatus(student_leave.id, {
            status: status
        }, id))
    }

  const datas = student_leaves.leaves

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
    return (
      <button type="button" className="btn btn-primary" onClick={() => {
        onChangeRoute(row)
      }}>Chi tiết</button>
    )
  }

  function acceptLeaveButton(cell, row) {
    return (
      <button type="button" className="btn btn-success" onClick={() => {
        handleStudentLeave(row, "Approved")
      }}>Chấp nhận</button>
    )
  }

  function removeLeaveButton(cell, row) {
    return (
      <button type="button" className="btn btn-warning" onClick={() => {
        handleStudentLeave(row, "Not approved")
      }}>Xóa </button>
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
      dataField: 'student_name',
      text: 'Học sinh',
      filter: textFilter()
    },
    {
      dataField: 'section_number',
      text: 'Buổi thứ',
      filter: textFilter()
    },
    {
      dataField: '',
      text: 'Hành động',
      formatter: viewDetailButton
    },
    {
      dataField: '',
      text: '',
      formatter: acceptLeaveButton
    },
    {
      dataField: '',
      text: '',
      formatter: removeLeaveButton
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

export default StudentLeaveList;
