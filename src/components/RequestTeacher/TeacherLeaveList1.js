import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { putTeacherLeaveStatus } from "../../common/service/TeacherLeave/PutTeacherLeave";
import { setModificationState } from "../../store/actions/student_leave.action";
import { StudentLeaveModificationStatus } from "../../store/models/student_leave.interface";
import { IoIosRemove } from 'react-icons/io'

function TeacherLeaveList(props) {

    const dispatch = useDispatch();

    const teacher_leaves = useSelector((state) => state.teacher_leaves);
    const history = useHistory();

    const onChangeRoute = (student_leave) =>{ 
        localStorage.removeItem("detail_resson")
        localStorage.setItem('detail_resson', student_leave.description)
        let path = '/student-leave/detail'; 
        history.push({
            pathname: path,
        });
    }

    var id_x = localStorage.getItem('id');
    var id = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    const updateStatusTeacherLeave = (row, status) => {
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });

        (putTeacherLeaveStatus(dispatch, row.id, {
            status: status
        }, idx))
    }

  const datas = teacher_leaves.leaves.filter((e) => e.status == "Not approve now" || e.status === "Admin approved")

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
      }}><i class="fa fa-info-circle" aria-hidden="true"></i></button>
    )
  }

  function acceptLeaveButton(cell, row) {
    return (
      <button type="button" className="btn btn-success" onClick={() => {
        updateStatusTeacherLeave(row, "Teacher approved")
      }}><i class="fa fa-check" aria-hidden="true"></i></button>
    )
  }

  function removeLeaveButton(cell, row) {
    return (
      <button type="button" className="btn btn-danger" onClick={() => {
        if(props.onSelect) props.onSelect(row.id);
        localStorage.setItem('teacher_leave_id', row.id)
        dispatch(setModificationState(StudentLeaveModificationStatus.Remove))
      }}><IoIosRemove className="icon-remove"/></button>
    )
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

export default TeacherLeaveList;
