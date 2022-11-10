import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { putTeacherLeaveStatus } from "../../common/service/TeacherLeave/PutTeacherLeave";
import { updateCurrentPath } from "../../store/actions/root.actions";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function TeacherRequestList(props) {

    const teacher_leaves = useSelector((state) => state.teacher_leaves);
    const dispatch = useDispatch();
    dispatch(updateCurrentPath("Yêu cầu nghỉ dạy", ""));
    const history = useHistory();
    const routeChange1 = (teacher_leave) => {
      localStorage.removeItem('resson_off_teacher')
      localStorage.setItem('resson_off_teacher', teacher_leave.description)
      let path = '/teacher-request/detail';
      history.push({
          pathname: path,
      });
    }
  
    const handleTeacherLeave = (teacher_leave, status) => {
      const id = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
        position: toast.POSITION.TOP_CENTER
      });
      dispatch(putTeacherLeaveStatus(teacher_leave.id, {
        status: status
      }, id))
    }


  const datas = teacher_leaves.leaves;

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

  function removeButton(cell, row) {
    return (
        <button type="button" className="btn btn-danger" onClick={() => {handleTeacherLeave(row, "Not approved")}}>Xóa</button>
    );
  }

  function editButton(cell, row) {
    return (
        <button type="button" className="btn btn-primary" onClick={() => {handleTeacherLeave(row, "Approved")}}>Chấp nhận</button>
    )
  }

  function viewButton(cell, row) {
    return (
        <button type="button" className="btn btn-primary" onClick={() => {routeChange1(row)}}>Xem chi tiết</button>
    )
  }

  function showStartTime(cell, row) {
    var strDate = row.create_time;
    return (
        <span>{strDate.substring(0, 10) + " " + strDate.substring(11,19)}</span>
    )
  }

  const columns = [
    {
      dataField: 'teacher_name',
      text: 'Giáo viên',
      filter: textFilter()
    },
    {
      dataField: 'class_name',
      text: 'Lớp',
      filter: textFilter()
    },
    {
        dataField: 'section_name',
        text: 'Buổi',
        filter: textFilter()
      },
      {
        dataField: 'create_time',
        text: 'Thời gian',
        formatter: showStartTime,
      },
      {
        dataField: 'substitute_teacher_name',
        text: 'Giáo viên dạy thay',
        filter: textFilter()
      },

    {
      dataField: '',
      text: 'Hành động',
      formatter: viewButton
    },
    {
      dataField: '',
      text: '',
      formatter: editButton
    },
    {
      dataField: 'address',
      text: '',
      formatter: removeButton
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

export default TeacherRequestList;
