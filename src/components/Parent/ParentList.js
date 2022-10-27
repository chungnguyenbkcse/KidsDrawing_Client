import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setModificationState } from "../../store/actions/users.action";
import { UserModificationStatus } from "../../store/models/user.interface";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function ParentList(props) {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const history = useHistory();

  const datas = users.parents;
  function routeChange() {
    let path = '/parents/detail';
    history.push(path);
  }

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
      dataField: 'dateOfBirth',
      text: 'Ngày sinh',
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
      dataField: 'address',
      text: 'Hành động',
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
