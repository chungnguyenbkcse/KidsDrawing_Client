import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { useDispatch } from "react-redux";
import { setModificationState } from "../../store/actions/users.action";
import { UserModificationStatus } from "../../store/models/user.interface";

function removeButton(cell, row) {
    return (
        <button type="button" className="btn btn-danger" onClick={() =>{}}>Xóa</button>
    );
}


const columns = [
    {
        dataField: 'username',
        text: 'Tên đăng nhập',
        filter: textFilter()
    },
    {
        dataField: 'email',
        text: 'Email',
        filter: textFilter()
    },
    {
        dataField: 'firstName',
        text: 'Họ',
        filter: textFilter()
    },
    {
        dataField: 'lastName',
        text: 'Tên',
        filter: textFilter()
    },
    {
        dataField: 'dateOfBirth',
        text: 'Ngày sinh',
        filter: textFilter()
    },
    {
        dataField: 'sex',
        text: 'Giới tính',
        filter: textFilter()
    },
    {
        dataField: 'phone',
        text: 'Số điện thoại',
        filter: textFilter()
    },
    {
        dataField: 'address',
        text: 'Hành động',
        formatter: removeButton
    },
];


export function Table(props) {
    const datas = props.data;

    const options = {
        custom: true,
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
        totalSize: datas.length
    };
    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            {/* <PaginationListStandalone {...paginationProps} /> */}
            <div>
                <div>
                    <BootstrapTable
                        striped
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
        <div>
            <PaginationProvider
                pagination={
                    paginationFactory(options)
                }
            >
                {contentTable}
            </PaginationProvider>
        </div >
    );
}