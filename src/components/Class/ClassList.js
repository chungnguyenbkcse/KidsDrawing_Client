import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MyClassModificationStatus } from "../../store/models/my_class.interface";
import { setModificationState } from "../../store/actions/my_class.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function ClassList(props) {

    const dispatch = useDispatch();

    const myclasss = useSelector((state) => state.myclasses);
  
    const history = useHistory();
  
    
    const routeChange = (class_id) =>{ 
      let path = '/class/detail'; 
      history.push({
        pathname: path,
        state: { class_id: class_id }
      });
    }


  const routeViewSchedule = (class_id, class_name) =>{ 
    localStorage.removeItem('class_id')
    localStorage.setItem('class_id', class_id.toString())
    localStorage.removeItem('class_name')
    localStorage.setItem('class_name', class_name)
    let path = '/class/schedule'; 
    history.push({
      pathname: path,
      state: { class_id: class_id }
    });
  }


  const datas = myclasss.myClasses;

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
        <button type="button" className="btn btn-primary" onClick={()=> {
            if(props.onSelect) props.onSelect(row);
            dispatch(setModificationState(row))
          }}>Chỉnh sửa</button>
    );
  }

  function removeButton(cell, row) {
    return (
        <button type="button" className="btn btn-danger" onClick={() =>{
            if(props.onSelect) props.onSelect(row);
            dispatch(setModificationState(MyClassModificationStatus.Remove))
          }}>Xóa</button>
    )
  }

  function viewScheduleButton(cell, row) {
    return (
        <button type="button" className="btn btn-primary" onClick={() => {
            if(props.onSelect) props.onSelect(row);
            routeViewSchedule(row.id, row.name)}}
          >Chi tiết</button>
    )
  }

  function detailClassButton(cell, row) {
    return (
        <button type="button" className="btn btn-primary" onClick={() => {
            if(props.onSelect) props.onSelect(row);
            routeChange(row.id)}}
          >Chi tiết</button>
    )
  }



  const columns = [
    {
      dataField: 'name',
      text: 'Tên',
      filter: textFilter()
    },
    {
      dataField: '',
      text: 'Lịch học',
      formatter: viewScheduleButton
    },
    {
        dataField: '',
        text: 'Thống kê',
        formatter: detailClassButton
      },
    {
      dataField: '',
      text: 'Hành động',
      formatter: editButton
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

export default ClassList;
