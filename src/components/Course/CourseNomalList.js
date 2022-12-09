import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CourseModificationStatus } from "../../store/models/course.interface";
import { useHistory } from "react-router-dom";
import { setModificationState } from "../../store/actions/course.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import {MdAnalytics} from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { IoIosRemove } from 'react-icons/io'
import { AiOutlineFileAdd } from 'react-icons/ai'

function CourseNomalList(props) {

    const courses = useSelector((state) => state.courses);
    const history = useHistory();
    const dispatch = useDispatch();
  
  
  
    const routeChange = (course) => {
      localStorage.removeItem('course_id')
      localStorage.setItem('course_id', course.id.toString())
      localStorage.removeItem('number_of_sum')
      localStorage.setItem('number_of_sum', course.num_of_section.toString())
      localStorage.removeItem('course_name')
      localStorage.setItem('course_name', course.name)
      let path = '/courses/section-template';
      history.push({
        pathname: path
      })
      ;
    }

    const routeEdit = (course) => {
        dispatch(setModificationState(CourseModificationStatus.None));
        let path = `/courses/edit-course`;
        history.push(path);
      }



  const datas = courses.courses;

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
        <button type="button" className="btn btn-primary" onClick={() => {
            if(props.onSelect) props.onSelect(row);
            routeEdit(row)}}
          ><FaEdit className="icon-edit"/></button>
    );
  }

  function removeButton(cell, row) {
    return (
        <button type="button" className="btn btn-danger" onClick={() => {
            if(props.onSelect) props.onSelect(row);
            dispatch(setModificationState(CourseModificationStatus.Remove));
           }}
          ><IoIosRemove className="icon-remove"/></button>
    );
  }

  function editTutorialButton(cell, row) {
    return (
        <button type="button" className="btn btn-warning" onClick={() => {
            if (props.onSelect) props.onSelect(row);
            routeChange(row)
          }}
          ><AiOutlineFileAdd   className="icon-remove"/></button>
    )
  }

  const columns = [
    {
      dataField: 'name',
      text: 'Tên',
      filter: textFilter()
    },
    {
      dataField: 'art_type_name',
      text: 'Thể loại',
      filter: textFilter()
    },
    {
      dataField: 'art_age_name',
      text: 'Độ tuổi',
      filter: textFilter()
    },
    {
      dataField: 'art_level_name',
      text: 'Câp độ',
      filter: textFilter()
    },
    {
      dataField: '',
      text: 'Hành động',
      formatter: editButton
    },
    {
      dataField: '',
      text: '',
      formatter: editTutorialButton
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

export default CourseNomalList;
