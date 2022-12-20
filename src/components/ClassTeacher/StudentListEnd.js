import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { useHistory } from "react-router-dom";


function StudentListEnd(props) {

    const dispatch = useDispatch();

    const students = useSelector((state) => state.users);


    const history = useHistory();

    var id_x = localStorage.getItem('class_end');
    let class_end = false;
    if (id_x !== null) {
        if (id_x === 'true') {
            class_end = true;
        }
        else {
            class_end = false;
        }
    }

    const routeChange = (student_id, parent_id) => {
        localStorage.removeItem('student_id');
        localStorage.setItem('student_id', student_id.toString());
        localStorage.removeItem('parent_id');
        localStorage.setItem('parent_id', parent_id.toString());
        if (class_end === true) {
            let path = '/manage-student-end';
            history.push(path);
        }else {
            let path = '/manage-student';
            history.push(path);
        }
    }


    const datas = students.students;

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

    function viewSex(cell, row, rowIndex) {
        if (row.sex === "Male") {
            return (
                <span>Nam</span>
            )
        }
        else if (row.sex === "Famale") {
            return (
                <span>Nữ</span>
            )
        }
        else {
            return (
                <span>Chưa xác định</span>
            )
        }
        
    }

    function manageStudent(cell, row, rowIndex) {
        return (
            <button type="button" className="btn btn-primary" onClick={() => {
                if(props.onSelect) props.onSelect(row);
                routeChange(row.id, row.parents)}}
              ><i class="fas fa-chart-bar"></i></button>
        )
    }




    const columns = [
        {
            dataField: 'firstName',
            text: 'Họ',
            filter: textFilter(),
        },
        {
            dataField: 'lastName',
            text: 'Tên',
            filter: textFilter(),
        },
        {
            dataField: 'username',
            text: 'Tên đăng nhập',
            filter: textFilter(),
        },
        
        {
            dataField: 'email',
            text: 'Email',
            filter: textFilter(),
        },
        {
            dataField: 'sex',
            text: 'Giới tính',
            filter: textFilter(),
            formatter: viewSex
        },
        {
            dataField: '',
            text: 'Thống kê',
            formatter: manageStudent
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

export default StudentListEnd;
