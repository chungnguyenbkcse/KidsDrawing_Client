import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import { useHistory } from "react-router-dom";
import { setModificationState } from "../../store/actions/users.action";
import { UserModificationStatus, IUser } from "../../store/models/user.interface";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function TeacherList(props) {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const teacher_register_quantifications = useSelector((state) => state.teacher_register_quantifications);
  const history = useHistory();

  const routeChange = (user) => {
    let path = '/teachers/detail';
    history.push({
      pathname: path,
      state: { user: user }
    });
  }

  const datas = users.teachers;

  const options = {
    custom: true,
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
    totalSize: datas.length
  };

  function removeButton(cell, row) {
    return (
      <button type="button" className="btn btn-danger" onClick={() => {
        if (props.onSelect) props.onSelect(row);
        dispatch(setModificationState(UserModificationStatus.Remove))
      }}>Xóa</button>
    );
  }

  function editButton(cell, row) {
    return (
      <button type="button" className="btn btn-primary" onClick={() => {
        if(props.onSelect) props.onSelect(row);
        dispatch(setModificationState(UserModificationStatus.Edit))
      }}>Chỉnh sửa</button>
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
      text: 'Trình độ',
      formatter: totalQuatification
    },
    {
      dataField: 'dateOfBirth',
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
      <PaginationListStandalone {...paginationProps} />
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

  const userElements = users.teachers.filter((val) => {
    if (props.value === ""){
      return val;
    }
    else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.username).toLowerCase().includes(props.value.toLowerCase()) || val.username.toLowerCase().includes(props.value.toLowerCase()))){
      return val;
    }
    return null
  }).map((teacher, index) => {
    if (!teacher) { return null; }
    let total = 0;
    let teacher_level = 0;
    teacher_register_quantifications.not_approved_now.map((ele, index) => {
      if (ele.teacher_id === teacher.id){
        total ++;
      }
      return ele
    })
    teacher_register_quantifications.approveds.map((ele, index) => {
      if (ele.teacher_id === teacher.id){
        teacher_level ++;
      }
      return ele
    })
    return (<tr className={`table-row ${(users.selectedUser && users.selectedUser.id === teacher.id) ? "selected" : ""}`}

      key={`user_${index}`}>
      <th scope="row" onClick={() => {routeChange(teacher)}}>{index + 1}</th>
      <td onClick={() => {routeChange(teacher)}}>{teacher.firstName} {teacher.lastName}</td>
      <td onClick={() => {routeChange(teacher)}}>{teacher.username}</td>
      <td onClick={() => {routeChange(teacher)}}>{teacher.email}</td>
      <td>{teacher_level}</td>
      <td onClick={() => {
        onChangeRequest(teacher.id)
      }}>{total}</td> 
      {
        function () {
          console.log(teacher.status)
          if (teacher.status !== "" && teacher.status !== null){
            return (
              <td style={{color: "#18AB56"}}>Đang hoạt động</td>
            )
          }
          else { 
            return (
              <td style={{color:"#2F4F4F"}}>Không hoạt động</td>
            )
          }
        }()
      }

      <td>
        <button type="button" className="btn btn-primary" onClick={() => {
          if(props.onSelect) props.onSelect(teacher);
          dispatch(setModificationState(UserModificationStatus.Edit))
        }}>Chỉnh sửa</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() =>{
          if(props.onSelect) props.onSelect(teacher);
          dispatch(setModificationState(UserModificationStatus.Remove))
        }}>Xóa</button>
      </td>
    </tr>);
  });


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
