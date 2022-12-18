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
import { IoIosRemove } from 'react-icons/io'

function TutorialEditRequestList(props) {

    const dispatch = useDispatch();

    const user_register_tutorials = useSelector((state) => state.user_register_tutorials);
  
    function approvedTutorial(ele) {
      const id = toast.info("Chấp nhận giáo án giáo viên!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
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

  function editButton(cell, row) {
    return (
      <div className="row mt-2">
        <div className="col-md-3 ml-2">
          <button type="button" className="btn btn-primary" onClick={() => {
            handleView(row)
          }}><i class="fa fa-info-circle" aria-hidden="true"></i></button>
        </div>
        <div className="col-md-3">
          <button type="button" className="btn btn-primary" onClick={() => {
          approvedTutorial(row)
          }}><i class="fa fa-check" aria-hidden="true"></i></button>
        </div>
        <div className="col-md-3"> 
          <button type="button" className="btn btn-danger" onClick={() => {  
            if (props.onSelect) props.onSelect(row.id)    
            localStorage.removeItem('user_register_tutorials_id')
            localStorage.setItem('user_register_tutorials_id', row.id.toString())
            dispatch(setModificationState(UserRegisterTutorialModificationStatus.Remove))
          }}><IoIosRemove className="icon-remove" /></button>
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
