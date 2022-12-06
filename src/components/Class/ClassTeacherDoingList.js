import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MyClassModificationStatus } from "../../store/models/my_class.interface";
import { setModificationState } from "../../store/actions/my_class.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function ClassTeacherDoingList(props) {

    const dispatch = useDispatch();

    const class_teachers = useSelector((state) => state.class_teachers);
  
    const history = useHistory();
  
    
    const routeChange = (class_teacher) => {
        let path = '/classes/detail-student';
        localStorage.removeItem("class_id");
        localStorage.setItem("class_id", class_teacher.id.toString())
        localStorage.removeItem('class_end');
        localStorage.setItem('class_end', 'false');
        history.push({
          pathname: path,
          state: { class_id: class_teacher.id }
        });
      }


  const routeViewSchedule = (classes) =>{ 
    localStorage.removeItem('class_id')
    localStorage.setItem('class_id', classes.id.toString())
    localStorage.removeItem('class_name')
    localStorage.setItem('class_name', classes.name)
    localStorage.removeItem('class_end');
    localStorage.setItem('class_end', 'false');
    let path = '/class/detail'; 
    history.push({
      pathname: path,
      state: { class_id: classes.id }
    });
  }


  const datas = class_teachers.class_doing;

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



  function viewScheduleButton(cell, row) {
    return (
        <button type="button" className="btn btn-primary" onClick={() => {
            if(props.onSelect) props.onSelect(row);
            routeViewSchedule(row)}}
          >Chi tiết</button>
    )
  }

  function detailClassButton(cell, row) {
    return (
        <button type="button" className="btn btn-info" onClick={() => {
            if(props.onSelect) props.onSelect(row);
            routeChange(row)}}
          >Vào lớp</button>
    )
  }



  const columns = [
    {
      dataField: 'name',
      text: 'Tên',
      filter: textFilter()
    },
    {
        dataField: 'course_name',
        text: 'Thuộc khóa học',
        filter: textFilter()
      },
      {
        dataField: 'total_student',
        text: 'Số học sinh',
        filter: textFilter()
      },
      {
        dataField: 'num_of_section',
        text: 'Số buổi học',
        filter: textFilter()
      },
    {
      dataField: '',
      text: 'Hành động',
      formatter: viewScheduleButton
    },
    {
      dataField: '',
      text: '',
      formatter: detailClassButton
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

export default ClassTeacherDoingList;
