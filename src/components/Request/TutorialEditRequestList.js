import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { putUserRegisterTutorial } from "../../common/service/UserRegisterTutorial/PutUserRegisterTutorial";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function TutorialEditRequestList(props) {

    const dispatch = useDispatch();

    const user_register_tutorials = useSelector((state) => state.user_register_tutorials);
  
    function approvedTutorial(ele) {
      const id = toast.info("Chấp nhận giáo án giáo viên!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      dispatch(putUserRegisterTutorial(ele.id, {
        status: "Approved",
        section_id: ele.section_id,
        name: ele.name,
        creator_id: ele.creator_id
      }, id))
    }
  
    function notApprovedTutorial(ele) {
      const id = toast.info("Chấp nhận giáo án giáo viên!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      dispatch(putUserRegisterTutorial(ele.id, {
        status: "Not approved",
        section_id: ele.section_id,
        name: ele.name,
        creator_id: ele.creator_id
      }, id))
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
            notApprovedTutorial(row)
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

  function showStartTime(cell, row) {
    var strDate = row.create_time;
    return (
        <span>{strDate.substring(0, 10) + " " + strDate.substring(11,19)}</span>
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
        dataField: 'section_number',
        text: 'Buổi',
        filter: textFilter()
      },
      {
        dataField: 'creator_name',
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

export default TutorialEditRequestList;
