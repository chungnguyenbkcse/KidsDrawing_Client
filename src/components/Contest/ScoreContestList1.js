import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const ScoreContestList1 = () => {
    const user_grade_contest_submissions = useSelector((state) => state.user_grade_contest_submissions);

    const history = useHistory();
    const onRouteChange = () => {
        let path = '/contest/result-analytis';
        history.push({
            pathname: path
        });
    }

    function handleViewResult(user_graded_contest_submission) {
        if (user_grade_contest_submissions !== null && user_grade_contest_submissions !== undefined) {
                localStorage.removeItem('contest_submission_id');
                localStorage.setItem('contest_submission_id', user_graded_contest_submission.contest_submission_id.toString())
                localStorage.removeItem('time_submit');
                localStorage.setItem('time_submit', user_graded_contest_submission.time.toString())
                localStorage.removeItem('score')
                localStorage.removeItem('feedback')
                if (user_graded_contest_submission.score !== undefined && user_graded_contest_submission.score !== null) {
                    localStorage.setItem('score', user_graded_contest_submission.score.toString());
                }
                if (user_graded_contest_submission.feedback !== undefined && user_graded_contest_submission.feedback !== null) {
                    localStorage.setItem('feedback', user_graded_contest_submission.feedback.toString());
                }
                localStorage.setItem('contest_name', user_graded_contest_submission.contest_name.toString())
                localStorage.removeItem('contest_id');
                localStorage.setItem('contest_id', user_graded_contest_submission.contest_id.toString());
                localStorage.setItem('teacher_name', user_graded_contest_submission.teacher_name);
                localStorage.setItem('url_conest_submission', user_graded_contest_submission.url_conest_submission.toString());
                localStorage.setItem('art_type_name', user_graded_contest_submission.art_type_name);
                localStorage.setItem('art_age_name', user_graded_contest_submission.art_age_name);
                localStorage.setItem('start_time', user_graded_contest_submission.start_time);
                localStorage.setItem('end_time', user_graded_contest_submission.end_time);
                localStorage.setItem('student_name', user_graded_contest_submission.student_name);
                let path = '/contest/score';
                history.push({
                    pathname: path
                });
        }
    }


    function handleEditScoreResult(user_graded_contest_submission) {
        if (user_grade_contest_submissions !== null && user_grade_contest_submissions !== undefined) {
                localStorage.removeItem('contest_submission_id');
                localStorage.setItem('contest_submission_id', user_graded_contest_submission.contest_submission_id.toString())
                localStorage.removeItem('time_submit');
                localStorage.setItem('time_submit', user_graded_contest_submission.time.toString())
                localStorage.removeItem('score')
                localStorage.removeItem('feedback')
                if (user_graded_contest_submission.score !== undefined && user_graded_contest_submission.score !== null) {
                    localStorage.setItem('score', user_graded_contest_submission.score.toString());
                }
                if (user_graded_contest_submission.feedback !== undefined && user_graded_contest_submission.feedback !== null) {
                    localStorage.setItem('feedback', user_graded_contest_submission.feedback.toString());
                }
                localStorage.setItem('contest_name', user_graded_contest_submission.contest_name.toString())
                localStorage.removeItem('contest_id');
                localStorage.setItem('contest_id', user_graded_contest_submission.contest_id.toString());
                localStorage.setItem('teacher_name', user_graded_contest_submission.teacher_name);
                localStorage.setItem('url_conest_submission', user_graded_contest_submission.url_conest_submission.toString());
                localStorage.setItem('art_type_name', user_graded_contest_submission.art_type_name);
                localStorage.setItem('art_age_name', user_graded_contest_submission.art_age_name);
                localStorage.setItem('start_time', user_graded_contest_submission.start_time);
                localStorage.setItem('end_time', user_graded_contest_submission.end_time);
                localStorage.setItem('student_name', user_graded_contest_submission.student_name);
                let path = '/contest/edit-score';
                history.push({
                    pathname: path
                });
        }
    }

    const datas = user_grade_contest_submissions.userGradeContestSubmissions;

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
            <span>{rowIndex+ 1}</span>
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
                handleViewResult(row)
            }}>Chi tiết</button>
        )
    }

    function editScoreButton(cell, row) {
        return (
            <button type="button" className="btn btn-primary" onClick={() => {
                handleEditScoreResult(row)
            }}>Chỉnh điểm</button>
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
            text: 'Điểm',
            sort: true
        },
        {
            dataField: '',
            text: 'Hành động',
            formatter: editScoreButton
        },
        {
            dataField: '',
            text: '',
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

export default ScoreContestList1;
