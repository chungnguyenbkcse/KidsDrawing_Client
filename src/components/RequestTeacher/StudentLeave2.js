import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { IoIosRemove } from 'react-icons/io'
import { setModificationState } from "../../store/actions/student_leave.action";
import { StudentLeaveModificationStatus } from "../../store/models/student_leave.interface";
import { putStudentLeaveByTeacher } from "../../common/service/StudentLeave/PutStudentLeaveByTeacher";

function StudentLeaveList2(props) {

    const dispatch = useDispatch();

    const student_leaves = useSelector((state) => state.student_leaves);
    const history = useHistory();

    const onChangeRoute = (student_leave) => {
        localStorage.removeItem("detail_resson")
        localStorage.setItem('detail_resson', student_leave.description)
        let path = '/student-leave/detail';
        history.push({
            pathname: path,
        });
    }

    const handleStudentLeave = (student_leave, status) => {
        const id = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        dispatch(putStudentLeaveByTeacher(student_leave.section_id, student_leave.student_id, {
            status: status
        }, id))
    }

    const datas = student_leaves.acceptLeaves

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
                    <button type="button" className="btn btn-primary" onClick={() => {
                        onChangeRoute(row)
                    }}><i class="fa fa-info-circle" aria-hidden="true"></i></button>
                </div>
                <div className="col-md-5">
                    <button type="button" className="btn btn-danger" onClick={() => {
                        localStorage.setItem('student_leave_section_id', row.section_id.toString())
                        localStorage.setItem('student_leave_student_id', row.student_id.toString())
                        if (props.onSelect) props.onSelect(row);
                        dispatch(setModificationState(StudentLeaveModificationStatus.Remove))
                    }}><IoIosRemove className="icon-remove" /></button>
                </div>
            </div>

        )
    }


    const columns = [
        {
            dataField: 'class_name',
            text: 'Lớp',
            filter: textFilter()
        },
        {
            dataField: 'section_name',
            text: 'Buổi học',
            filter: textFilter()
        },
        {
            dataField: 'student_name',
            text: 'Học sinh',
            filter: textFilter()
        },
        {
            dataField: 'section_number',
            text: 'Buổi thứ',
            filter: textFilter()
        },
        {
            dataField: '',
            text: '',
            style: {
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

export default StudentLeaveList2;
