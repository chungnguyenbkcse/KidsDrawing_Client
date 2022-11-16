import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CourseModificationStatus } from "../../store/models/course.interface";
import { useHistory } from "react-router-dom";
import { setModificationState } from "../../store/actions/course.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function ExerciseStudentList(props) {

    const user_grade_exercise_submission = useSelector((state) => state.user_grade_exercise_submissions);
    const history = useHistory();
    const dispatch = useDispatch();
  
  
  
    const onChangeRoute = (exercise) =>{ 
      localStorage.removeItem('image_url_exercise')
      localStorage.setItem('image_url_exercise', exercise.image_url)
      localStorage.removeItem('score')
      localStorage.setItem('score', exercise.score.toString())
      localStorage.removeItem('description')
      localStorage.setItem('description', exercise.description)
      localStorage.removeItem('time_submit')
      localStorage.setItem('time_submit', exercise.time_submit)
      localStorage.removeItem('feedback')
      localStorage.setItem('feedback', exercise.feedback)
      let path = '/exercise/detail'; 
      history.push({
          pathname: path,
      });
  }


  const datas = user_grade_exercise_submission.user_grade_exercise_submissions;

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
        <button type="button" className="btn btn-warning" onClick={() => {
            if (props.onSelect) props.onSelect(row);
            onChangeRoute(row)
          }}
          >Chi tiết</button>
    )
  }

  const columns = [
    {
      dataField: 'exercise_name',
      text: 'Tên',
      filter: textFilter()
    },
    {
      dataField: 'deadline',
      text: 'Thời hạn nộp',
      filter: textFilter()
    },
    {
      dataField: 'time_submit',
      text: 'Thời gian nộp',
      filter: textFilter()
    },
    {
      dataField: 'score',
      text: 'Điểm',
      filter: textFilter()
    },
    {
      dataField: '',
      text: 'Hành động',
      formatter: editButton
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

export default ExerciseStudentList;
