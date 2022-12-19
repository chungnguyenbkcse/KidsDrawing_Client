import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setModificationState } from "../../store/actions/users.action";
import { UserModificationStatus } from "../../store/models/user.interface";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import {MdAnalytics} from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { IoIosRemove } from 'react-icons/io'


function TeacherList(props) {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const teacher_register_quantifications = useSelector((state) => state.teacher_register_quantifications);
  const history = useHistory();
  const routeChange = (teacher) => {
    let path = '/teacher/detail';
    localStorage.removeItem("teacher_id");
    localStorage.setItem("teacher_id", teacher.id.toString())
    history.push({
      pathname: path,
      state: { class_id: teacher.id }
    });
  }


  const datas = users.teachers;

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
        <div className="col-md-3 ml-2">
        <button type="button" className="btn btn-info" onClick={() => {
        routeChange(row)
      }}><MdAnalytics className="icon-remove" /></button>
        </div>
        <div className="col-md-3">
        <button type="button" className="btn btn-primary" onClick={() => {
        if(props.onSelect) props.onSelect(row);
        dispatch(setModificationState(UserModificationStatus.Edit))
      }}><FaEdit className="icon-edit"/></button>
        </div>
        <div className="col-md-3"> 
        <button type="button" className="btn btn-danger" onClick={() => {
        if (props.onSelect) props.onSelect(row);
        dispatch(setModificationState(UserModificationStatus.Remove))
      }}><IoIosRemove className="icon-remove"/></button>
        </div>
      </div>
        
    )
  }

  function totalQuatification(cell, row) {
    let total = 0;
    let teacher_level = 0;
    teacher_register_quantifications.not_approved_now.map((ele, index) => {
      if (ele.teacher_id === row.id){
        total ++;
      }
      return ele
    })
    teacher_register_quantifications.approveds.map((ele, index) => {
      if (ele.teacher_id === row.id){
        teacher_level ++;
      }
      return ele
    })
    return (
      <span onClick={() => {
        onChangeRequest(row.id)
      }}>
        <strong style={ { color: 'red', cursor: "pointer" } }>{teacher_level}/{total}</strong>
      </span>
    );
  }

  const columns = [
    {
      dataField: 'username',
      text: 'Tên đăng nhập',
      filter: textFilter()
    },
    {
      dataField: 'email',
      text: 'Email',
      filter: textFilter()
    },
    {
      dataField: 'firstName',
      text: 'Họ',
      filter: textFilter()
    },
    {
      dataField: 'lastName',
      text: 'Tên',
      filter: textFilter()
    },
    {
      dataField: 'phone',
      text: 'Số điện thoại',
      filter: textFilter()
    },
    {
      dataField: 'sex',
      text: 'Trình độ cần xác nhận',
      formatter: totalQuatification
    },
    {
      dataField: '',
      text: '',
      style:{
        width: '150px'
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

  const onChangeRequest = (teacher_id) => {
    let path = '/teachers/request-level';
    localStorage.removeItem("teacher_id");
    localStorage.setItem("teacher_id", teacher_id.toString())
    history.push({
      pathname: path
    });
  }


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

export default TeacherList;
