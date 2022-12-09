import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { putTeacherRegisterLevelAdmin } from "../../common/service/TeacherRegisterQuantification/PutTeacherRegisterLevelAdmin";
import { addNotification } from "../../store/actions/notifications.action";
import { toast } from "react-toastify";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { IoIosRemove } from 'react-icons/io'


function RequestConfirmLevelList(props) {

  const dispatch = useDispatch();
  const teacher_register_quantifications = useSelector((state) => state.teacher_register_quantifications);
  const history = useHistory();
  const routeChange = (degree_photo_url) => {
    let path = '/teachers/request-level/degree-photo';
    localStorage.removeItem("degree_photo_url")
    localStorage.setItem("degree_photo_url", degree_photo_url)
    history.push({
      pathname: path,
      state: { degree_photo_url: degree_photo_url }
    });
  }

  function approvedTeacherLevel(ele) {
    const id = toast.info("Chấp nhận trình độ cho giáo viên", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    (putTeacherRegisterLevelAdmin(dispatch, ele.id, ele.teacher_id, {
      status: "Approved"
    }, id))
  }

  function notApprovedTeacherLevel(ele) {
    const id = toast.info("Không chấp nhận trình độ cho giáo viên", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
    (putTeacherRegisterLevelAdmin(dispatch, ele.id, ele.teacher_id, {
      status: "Not approved"
    }, id))
    dispatch(addNotification("Trình độ ", `${ele.course_name} - Đã được chấp nhận bởi bạn`));
  }


  const datas = teacher_register_quantifications.not_approved_now;

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
      <button type="button" className="btn btn-danger" onClick={() => {
        notApprovedTeacherLevel(row)
      }}><IoIosRemove className="icon-remove"/></button>
    );
  }

  function editButton(cell, row) {
    return (
      <button type="button" className="btn btn-primary" onClick={() => {
        approvedTeacherLevel(row)
      }}><i class="fa fa-check" aria-hidden="true"></i></button>
    )
  }

  function detailButton(cell, row) {
    return (
      <button type="button" className="btn btn-primary" onClick={() => {
        routeChange(row.degree_photo_url)
      }}><i class="fa fa-info-circle" aria-hidden="true"></i></button>
    )
  }

  const columns = [
    {
      dataField: 'teacher_name',
      text: 'Giáo viên',
      filter: textFilter()
    },
    {
      dataField: 'course_name',
      text: 'Đăng kí',
      filter: textFilter()
    },

    {
      dataField: '',
      text: 'Hành động',
      formatter: editButton
    },
    {
      dataField: 'address',
      text: '',
      formatter: removeButton
    },
    {
      dataField: '',
      text: '',
      formatter: detailButton
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

export default RequestConfirmLevelList;
