import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../../common/components/Loading";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const ResultGradeExamTeacher1 = () => {
    const user_grade_exercise_submissions  = useSelector((state) => state.exercise_submissions);


    const history = useHistory();
    const routeChange = (user_grade_exercise_submission) => {
        let path = '/exercise/student';
        localStorage.setItem('feedback', user_grade_exercise_submission.feedback)
        localStorage.setItem('score_exercise', user_grade_exercise_submission.score.toString())
        localStorage.setItem('student_name', user_grade_exercise_submission.student_name)
        localStorage.setItem('student_id', user_grade_exercise_submission.student_id.toString())
        localStorage.setItem('image_url_exercise_submission', user_grade_exercise_submission.image_url)
        localStorage.setItem('exercise_name', user_grade_exercise_submission.exercise_name)
        localStorage.setItem('exercise_id', user_grade_exercise_submission.exercise_id.toString())
        localStorage.setItem('time_submit', user_grade_exercise_submission.time)
        history.push(path);
    }

    const datas = user_grade_exercise_submissions.exercise_gradeds;

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

    function numberCountButton(cell, row, rowIndex) {
        return (
            <span>{rowIndex + 3 + 1}</span>
        );
    }

    function nameButton(cell, row) {
        return (
            <div className="avatar-table table-text-size mx-auto top-text-color">
                <img src="https://cdn.imgbin.com/10/1/7/imgbin-avatar-child-computer-icons-user-profile-smiling-boy-9cW3FmLduX6iZNLs1pg3cA3YM.jpg"
                    alt="avatar mx-auto" className="rounded-circle img-fluid mr-3" />
                {row.student_name}
            </div>
        );
    }

    function viewDetailButton(cell, row) {
        return (
            <button type="button" className="btn btn-primary" onClick={() => {
                routeChange(row)
            }}>Chi tiết</button>
        )
    }

    const columns = [
        {
            dataField: '',
            text: 'STT',
            formatter: numberCountButton
        },
        {
            dataField: 'student_name',
            text: 'Học sinh',
            filter: textFilter(),
            formatter: nameButton
        },
        {
            dataField: 'score',
            text: 'Điểm'
        },
        {
            dataField: '',
            text: 'Hành động',
            formatter: viewDetailButton
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
};

export default ResultGradeExamTeacher1;
