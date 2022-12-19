import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModificationState } from "../../store/actions/users.action";
import { UserModificationStatus } from "../../store/models/user.interface";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { useHistory } from "react-router-dom";
import {MdAnalytics} from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { IoIosRemove } from 'react-icons/io'


function ParentList(props) {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const datas = users.parents;

  const history = useHistory();
  const routeChange = (teacher) => {
    let path = '/parent/detail';
    localStorage.removeItem("parent_id");
    localStorage.setItem("parent_id", teacher.id.toString())
    history.push({
      pathname: path,
      state: { parent_id: teacher.id }
    });
  }

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
        <button type="button" className="btn btn-info" onClick={() => {
        routeChange(row)
      }}><MdAnalytics className="icon-remove"/></button>
        </div>
        <div className="col-md-5"> 
        <button type="button" className="btn btn-danger" onClick={() => {
        if (props.onSelect) props.onSelect(row);
        dispatch(setModificationState(UserModificationStatus.Remove))
      }}><IoIosRemove className="icon-remove"/></button>
        </div>
      </div>
        
    )
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
      dataField: 'sex',
      text: 'Giới tính',
      filter: textFilter()
    },
    {
      dataField: 'phone',
      text: 'Số điện thoại',
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
    </div>
  );



/*   const userElements = users.parents.filter((val) => {
    if (props.value === "") {
      return val;
    }
    else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.username).toLowerCase().includes(props.value.toLowerCase()) || val.username.toLowerCase().includes(props.value.toLowerCase()))) {
      return val;
    }
    return null
  }).map((parent, index) => {
    if (!parent) { return null; }
    return (<tr className={`table-row ${(users.selectedUser && users.selectedUser.id === parent.id) ? "selected" : ""}`}

      key={`user_${index}`}>
      <th scope="row">{index + 1}</th>
      <td onClick={() => {
        if (props.onSelect) props.onSelect(parent);
        routeChange()
      }}
      >
        {parent.firstName} {parent.lastName}
      </td>
      <td>{parent.username}</td>
      {
        function () {
          if (parent.status !== "" && parent.status !== null) {
            return (
              <td style={{ color: "#18AB56" }}>Đang hoạt động</td>
            )
          }
          else {
            return (
              <td style={{ color: "#2F4F4F" }}>Không hoạt động</td>
            )
          }
        }()
      }
      <td>
        <button type="button" className="btn btn-danger" onClick={() => {
          if (props.onSelect) props.onSelect(parent);
          dispatch(setModificationState(UserModificationStatus.Remove))
        }}>Xóa</button>
      </td>
    </tr>);
  }); */


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

export default ParentList;
