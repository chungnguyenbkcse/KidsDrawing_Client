import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { UserRegisterTutorialModificationStatus } from "../../store/models/user_register_tutorial.interface";
import { setModificationState } from "../../store/actions/user_register_tutorial.action";
import { putSectionByAdmin } from "../../common/service/Section/PutSectionAdmin";

function TutorialEditRequestList(props) {

    const dispatch = useDispatch();

    const user_register_tutorials = useSelector((state) => state.user_register_tutorials);
  
    function approvedTutorial(ele) {
      const id = toast.info("Chấp nhận giáo án giáo viên!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      (putSectionByAdmin(dispatch, ele.id, {
        status: "Approved"
      }, id)) 
    }

    const history = useHistory();
    function handleView(ele) {
      localStorage.removeItem('section_id')
      localStorage.setItem('section_id', ele.id.toString())
      let path = '/tutorial-request/detail';
      history.push({
          pathname: path,
      });
    }


  const datas = user_register_tutorials.user_register_tutorial_not_approved_nows;

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
            if (props.onSelect) props.onSelect(row.id)    
            localStorage.removeItem('user_register_tutorials_id')
            localStorage.setItem('user_register_tutorials_id', row.id.toString())
            localStorage.removeItem('section_user_register_tutorials_id')
            localStorage.setItem('section_user_register_tutorials_id', row.section_id.toString())
            localStorage.removeItem('name_user_register_tutorials')
            localStorage.setItem('name_user_register_tutorials', row.name.toString())
            localStorage.removeItem('creator_user_register_tutorials_id')
            localStorage.setItem('creator_user_register_tutorials_id', row.creator_id.toString())
            dispatch(setModificationState(UserRegisterTutorialModificationStatus.Remove))
          }}>Xóa</button>
    );
  }

  function editButton(cell, row) {
    return (
        <button type="button" className="btn btn-primary" onClick={() => {
          approvedTutorial(row)
          }}>Chấp nhận</button>
    )
  }

  function detailButton(cell, row) {
    return (
        <button type="button" className="btn btn-primary" onClick={() => {
            handleView(row)
          }}>Chi tiết</button>
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
      dataField: 'name',
      text: 'Tên giáo án',
      filter: textFilter()
    },
    {
      dataField: 'class_name',
      text: 'Lớp',
      filter: textFilter()
    },
    {
        dataField: 'number',
        text: 'Buổi',
        filter: textFilter()
      },
      {
        dataField: 'teacher_name',
        text: 'Giáo viên',
        filter: textFilter()
      },
      {
        dataField: 'create_time',
        text: 'Thời gian',
        formatter: showStartTime,
      },
      
    {
      dataField: '',
      text: 'Hành động',
      formatter: editButton
    },
    {
      dataField: '',
      text: '',
      formatter: detailButton
    },
    {
      dataField: '',
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

export default TutorialEditRequestList;
