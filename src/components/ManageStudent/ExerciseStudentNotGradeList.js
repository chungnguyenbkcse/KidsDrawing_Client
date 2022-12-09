import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CourseModificationStatus } from "../../store/models/course.interface";
import { useHistory } from "react-router-dom";
import { setModificationState } from "../../store/actions/course.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function ExerciseStudentNotGradeList(props) {

    const exercise_submissions = useSelector((state) => state.exercise_submissions);
    const history = useHistory();
    const dispatch = useDispatch();
  
    var role = localStorage.getItem('role')
    var rolePrivilege = []
    var roleUser = ""
    if (role !== null) {
        rolePrivilege = role.split(',')
        roleUser = rolePrivilege[0]
    }
  
  
    const onChangeRoute = (user_grade_exercise_submission) =>{ 
      localStorage.setItem('student_name', user_grade_exercise_submission.student_name)
      localStorage.setItem('image_url_exercise_submission', user_grade_exercise_submission.image_url)
      localStorage.setItem('exercise_name', user_grade_exercise_submission.exercise_name)
      localStorage.setItem('exercise_submission_id', user_grade_exercise_submission.exercise_submission_id.toString())
      localStorage.setItem('time_submit', user_grade_exercise_submission.time_submit)
      let path = '/exercise/detail'; 
      history.push({
          pathname: path,
      });
  }

  const onChangeRoute1 = (user_grade_exercise_submission) => {
    let path = '/exercise/student'; 
    localStorage.setItem('feedback', "")
    localStorage.setItem('score_exercise', "0")
    localStorage.setItem('student_name', user_grade_exercise_submission.student_name)
    localStorage.setItem('image_url_exercise_submission', user_grade_exercise_submission.image_url)
    localStorage.setItem('exercise_name', user_grade_exercise_submission.exercise_name)
    localStorage.setItem('exercise_submission_id', user_grade_exercise_submission.id.toString())
    localStorage.removeItem('deadline');
    localStorage.setItem('exercise_id', user_grade_exercise_submission.exercise_id.toString())
    localStorage.setItem('student_id', user_grade_exercise_submission.student_id.toString())
    localStorage.setItem('deadline', user_grade_exercise_submission.exercise_deadline);
    history.push({
        pathname: path,
    });
  }


  const datas = exercise_submissions.exercise_not_gradeds;

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


  function gradeButton(cell, row) {
    if (roleUser === "TEACHER") {
      return (
        <button type="button" className="btn btn-primary" onClick={() => {
            if (props.onSelect) props.onSelect(row);
            onChangeRoute1(row)
          }}
          >Chấm điểm</button>
    )
    }
    else if (roleUser === "STUDENT" || roleUser === "PARENT") {
      return (
        <button type="button" className="btn btn-primary" onClick={() => {
            if (props.onSelect) props.onSelect(row);
            onChangeRoute(row)
          }}
          >Chi tiết</button>
      )
    }
    
  }

  function deadlineButton(cell, row) {
    return (
        <span>{row.exercise_deadline.replaceAll("T", " ").substring(0,16)}</span>
    )
  }

  const columns = [
    {
      dataField: 'exercise_name',
      text: 'Tên',
      filter: textFilter()
    },
    {
        dataField: 'exercise_level_name',
        text: 'Tỉ lệ',
        sort: true
      },
    {
      dataField: 'exercise_deadline',
      text: 'Thời hạn nộp',
      formatter: deadlineButton
    },
    {
      dataField: '',
      text: 'Hành động',
      formatter: gradeButton
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

export default ExerciseStudentNotGradeList;
