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
        localStorage.removeItem('class_name');
        localStorage.setItem('class_name', class_teacher.name);
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


  let datas = [
    {
      id: 0,
      name: "",
      course_id: 0,
      review_star: 0,
      link_url: "",
      semester_class_id: 0,
      user_register_teach_semester: 0,
      security_code: "",
      total_student: 0,
      num_of_section: 0,
      course_name: "",
      semester_name: "",
      art_type_name: "",
      art_level_name: "",
      art_age_name: "",
      schedule: ""
  }
  ];

  if (class_teachers.class_doing.length > 0 && class_teachers !== undefined && class_teachers !== null) {
    datas = class_teachers.class_doing
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
        {
          function () {
            if (row.id != 0) {
              return (
                  <button type="button" className="btn btn-primary" onClick={() => {
                      if(props.onSelect) props.onSelect(row);
                      routeViewSchedule(row)}}
                    ><i class="fa fa-info-circle" aria-hidden="true"></i></button>
              )
            }
          }()
        }
        </div>
        <div className="col-md-5"> 
          {
            function (){
              if (row.id != 0) {
                return (
                    <button type="button" className="btn btn-info" onClick={() => {
                        if(props.onSelect) props.onSelect(row);
                        routeChange(row)}}
                      ><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                )
              }
            }()
          }
        </div>
      </div>
        
    )
  }

  function viewName(cell, row) {
    if (row.id != 0) {
      return (
        <span>{row.name}</span>
      )
    }
  }

  function viewCourseName(cell, row) {
    if (row.id != 0) {
      return (
        <span>{row.course_name}</span>
      )
    }
  }

  function viewTotalStudent(cell, row) {
    if (row.id != 0) {
      return (
        <span>{row.total_student}</span>
      )
    }
  }

  function viewNumOfSection(cell, row) {
    if (row.id != 0) {
      return (
        <span>{row.num_of_section}</span>
      )
    }
  }



  const columns = [
    {
      dataField: 'name',
      text: 'Tên',
      filter: textFilter(),
      formatter: viewName
    },
    {
        dataField: 'course_name',
        text: 'Thuộc khóa học',
        filter: textFilter(),
        formatter: viewCourseName
      },
      {
        dataField: 'total_student',
        text: 'Số học sinh',
        filter: textFilter(),
        formatter: viewTotalStudent
      },
      {
        dataField: 'num_of_section',
        text: 'Số buổi học',
        filter: textFilter(),
        formatter: viewNumOfSection
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
