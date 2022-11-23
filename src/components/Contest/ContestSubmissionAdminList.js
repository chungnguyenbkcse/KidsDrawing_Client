import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const ContestSubmissionAdminList = () => {
    const contest_submission = useSelector((state) => state.contest_submissions);

    const history = useHistory();

    function handleViewContestSubmission(contest_submission) {
        if (contest_submission !== null && contest_submission !== undefined) {
                localStorage.removeItem('contest_submission_id');
                localStorage.setItem('contest_submission_id', contest_submission.id.toString())
                localStorage.removeItem('time_submit');
                localStorage.setItem('time_submit', contest_submission.update_time.toString())
                localStorage.setItem('contest_name', contest_submission.contest_name.toString())
                localStorage.removeItem('contest_id');
                localStorage.setItem('contest_id', contest_submission.contest_id.toString());
                localStorage.setItem('student_name', contest_submission.teacher_name);
                localStorage.setItem('url_conest_submission', contest_submission.image_url.toString());
                let path = '/contest/contest-submission';
                history.push({
                    pathname: path
                });
        }
    }

    const datas = contest_submission.contest_not_gradeds;

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
                handleViewContestSubmission(row)
            }}>Chi tiết</button>
        )
    }

    function showTime(cell, row) {
        var strDate = row.update_time;
        return (
            <span>{strDate.replaceAll("T", " ").substring(0,16)}</span>
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
            dataField: 'update_time',
            text: 'Thời gian nộp',
            formatter: showTime
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

export default ContestSubmissionAdminList;
