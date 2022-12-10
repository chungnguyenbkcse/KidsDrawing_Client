import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const ScoreContestAdminList = () => {
    const contest_submissions = useSelector((state) => state.contest_submissions);
    let x = []
    x.push(...contest_submissions.contest_gradeds)
    x.push(...contest_submissions.contest_not_gradeds)

    const history = useHistory();
    const onRouteChange = () => {
        let path = '/contest/result-analytis';
        history.push({
            pathname: path
        });
    }

    function handleViewResult(user_graded_contest_submission) {
        if (contest_submissions !== null && contest_submissions !== undefined) {
            localStorage.removeItem('contest_submission_id');
                
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
            localStorage.setItem('student_id', user_graded_contest_submission.student_id.toString());
            localStorage.removeItem('contest_id');
            localStorage.setItem('contest_id', user_graded_contest_submission.contest_id.toString());
            localStorage.setItem('url_conest_submission', user_graded_contest_submission.image_url.toString());
            localStorage.setItem('start_time', user_graded_contest_submission.start_time);
            localStorage.setItem('end_time', user_graded_contest_submission.end_time);
            localStorage.setItem('student_name', user_graded_contest_submission.student_name);
                let path = '/contest/score';
                history.push({
                    pathname: path
                });
        }
    }

    function handleViewResult1(user_graded_contest_submission) {
        if (contest_submissions !== null && contest_submissions !== undefined) {
            localStorage.removeItem('contest_submission_id');
            localStorage.removeItem('feedback');
            localStorage.removeItem('score');
            localStorage.removeItem('time_submit');
            localStorage.setItem('time_submit', user_graded_contest_submission.update_time.toString())
            localStorage.setItem('student_id', user_graded_contest_submission.student_id.toString());
            localStorage.setItem('teacher_name', user_graded_contest_submission.teacher_name)
            localStorage.removeItem('contest_id');
            localStorage.setItem('contest_id', user_graded_contest_submission.contest_id.toString());
            localStorage.setItem('url_conest_submission', user_graded_contest_submission.image_url.toString());
            localStorage.setItem('start_time', user_graded_contest_submission.start_time);
            localStorage.setItem('end_time', user_graded_contest_submission.end_time);
            localStorage.setItem('student_name', user_graded_contest_submission.student_name);
                let path = '/contest/score';
                history.push({
                    pathname: path
                });
        }
    }

    const datas = x;

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
        if (row.score != null) {
            return (
                <button type="button" className="btn btn-primary" onClick={() => {
                    handleViewResult(row)
                }}><i class="fa fa-info-circle" aria-hidden="true"></i></button>
            )
        }
        else {
            return (
                <button type="button" className="btn btn-primary" onClick={() => {
                    handleViewResult1(row)
                }}><i class="fa fa-info-circle" aria-hidden="true"></i></button>
            )
        }
        
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
            dataField: 'teacher_name',
            text: 'Giáo viên chấm',
            filter: textFilter()
        },
        {
            dataField: 'score',
            text: 'Điểm',
            sort: true
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

export default ScoreContestAdminList;
