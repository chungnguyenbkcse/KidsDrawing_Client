import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { putTeacherLeaveStatus } from "../../common/service/TeacherLeave/PutTeacherLeave";
import { updateCurrentPath } from "../../store/actions/root.actions";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { setModificationState } from "../../store/actions/student_leave.action";
import { StudentLeaveModificationStatus } from "../../store/models/student_leave.interface";
import { IoIosRemove } from 'react-icons/io'


function TeacherRequestList2(props) {

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


  const datas = teacher_leaves.acceptLeaves;

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



  function editButton(cell, row) {
    return (
      <div className="row mt-2">
        <div className="col-md-5 ml-2">
          <button type="button" className="btn btn-primary" onClick={() => {routeChange1(row)}}><i class="fa fa-info-circle" aria-hidden="true"></i></button>
        </div>
        <div className="col-md-5"> 
          <button type="button" className="btn btn-danger" onClick={() => {
            if(props.onSelect) props.onSelect();
            localStorage.setItem('teacher_leave_id', row.id)
            dispatch(setModificationState(StudentLeaveModificationStatus.Remove))
          }}><IoIosRemove className="icon-remove"/></button>
        </div>
      </div>
        
    )
  }

  function showStartTime(cell, row) {
    var strDate = row.create_time;
    return (
        <span>{strDate.replaceAll("T", " ").substring(0,16)}</span>
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
        text: '',
        style:{
          width: '120px'
        },
        formatter: editButton
      }
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

export default TeacherRequestList2;
