import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SemesterClassModificationStatus } from "../../store/models/semester_class.interface";
import { setModificationStateSemesterClass } from "../../store/actions/semester_class.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { FaEdit } from 'react-icons/fa'
import { IoIosRemove } from 'react-icons/io'

function ClassSemesterList(props) {

    const dispatch = useDispatch();
    const semester_classes = useSelector((state) => state.semester_classes);
    const schedules = useSelector((state) => state.schedules);
    let schedule_list = []
    console.log(semester_classes.semesterClasses)
    if (schedules.schedules.length > 0){
      semester_classes.semesterClasses.map(ele => {
        let item = "";
        schedules.schedules.map(element => {
          if (element.semester_class_id === ele.id) {
            console.log(element.lesson_time)
            item += element.lesson_time
          }
          return element
        })
        return schedule_list.push({
          name: ele.name,
          value: item
        })
      })
    }


  const datas = semester_classes.semesterClasses;

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
    if (row.is_new == true) {
      return (
        <button type="button" className="btn btn-primary" onClick={()=> {
            if(props.onSelect) props.onSelect(row);
            dispatch(setModificationStateSemesterClass(SemesterClassModificationStatus.Edit))
          }}><FaEdit className="icon-edit"/></button>
    );
    }
    return ""
  }

  function removeButton(cell, row) {
    return (
        <button type="button" className="btn btn-danger" onClick={() =>{
            if(props.onSelect) props.onSelect(row);
            dispatch(setModificationStateSemesterClass(SemesterClassModificationStatus.Remove))
          }}><IoIosRemove className="icon-remove"/></button>
    )
  }

  function schduleShow(cell, row, rowIndex) {
    return (
        <span>
        {schedule_list.map((ele, idx) => {
          if (ele.name === row.name) {
            return ele.value
          }
        })}</span>
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
      text: 'Khóa học',
      filter: textFilter()
    },
    {
      dataField: 'semester_name',
      text: 'Học kì',
      filter: textFilter()
    },
    {
      dataField: 'total_register',
      text: 'Số hs đăng kí'
    },
    {
      dataField: 'max_participant',
      text: 'Số học sinh tối đa'
    },
    {
      dataField: '',
      text: 'Lịch học',
      formatter: schduleShow
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

export default ClassSemesterList;
