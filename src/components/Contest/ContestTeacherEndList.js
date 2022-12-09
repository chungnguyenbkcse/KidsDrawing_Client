import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../common/components/ConverDate";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function ContestTeacherEndList(props) {

    const contest_teachers = useSelector((state) => state.contest_teachers);
    const history = useHistory();

    const onChangeRoute = (contest_teacher) =>{ 
        localStorage.removeItem("contest_id")
        localStorage.setItem('contest_id', contest_teacher.id.toString())
        localStorage.removeItem("contest_name")
        localStorage.setItem('contest_name', contest_teacher.name)
        localStorage.removeItem("contest_description")
        localStorage.setItem('contest_description', contest_teacher.description)
        localStorage.removeItem("max_participant")
        localStorage.setItem('max_participant', contest_teacher.max_participant.toString())
        localStorage.removeItem("art_type_contest")
        localStorage.setItem('art_type_contest', contest_teacher.art_type_name)
        localStorage.removeItem("art_age_contest")
        localStorage.setItem('art_age_contest', contest_teacher.art_age_name)
        localStorage.removeItem("registration_time")
        localStorage.setItem('registration_time', contest_teacher.registration_time)
        localStorage.removeItem("start_time")
        localStorage.setItem('start_time', contest_teacher.start_time)
        localStorage.removeItem("end_time")
        localStorage.setItem('end_time', contest_teacher.end_time)
        let path = '/contests/detail'; 
        history.push({
            pathname: path,
        });
    }
    
    const date_0 = new Date();
    const date = date_0.toUTCString()
    //console.log(date)
    const date_now = formatDate(new Date(date)).substring(0, 10) + "Z" + formatDate(new Date(date)).substring(11, 16);
    console.log(formatDate(new Date(date)).substring(0, 10) + "Z" + formatDate(new Date(date)).substring(11, 16))

    const datas = contest_teachers.contest_end.filter((contest, index) => {
        var strDate2 = contest.end_time;
        if (!contest || strDate2 > date_now) {
            return null
        }
        else {
            return contest
        }
      })

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

    function viewDetailButton(cell, row) {
        return (
            <button type="button" className="btn btn-primary" onClick={() => {
                if (props.onSelect) props.onSelect(row);
                onChangeRoute(row)
            }}><i class="fa fa-info-circle" aria-hidden="true"></i></button>
        )
    }


    function showStartTime(cell, row) {
        var strDate = row.start_time;
        return (
            <span>{strDate.replaceAll("T", " ").substring(0, 16)}</span>
        )
    }

    function showEndTime(cell, row) {
        var strDate = row.start_time;
        return (
            <span>{strDate.replaceAll("T", " ").substring(0, 16)}</span>
        )
    }


    const columns = [
        {
            dataField: 'name',
            text: 'Tên',
            filter: textFilter()
        },
        {
            dataField: 'art_type_name',
            text: 'Thể loại',
            filter: textFilter()
        },
        {
            dataField: 'art_age_name',
            text: 'Độ tuổi',
            filter: textFilter()
        },
        {
            dataField: 'start_time',
            text: 'Thời gian bắt đầu',
            formatter: showStartTime,
        },
        {
            dataField: 'end_time',
            text: 'Thời gian kết thúc',
            formatter: showEndTime,
        },
        {
            dataField: 'total_register_contest',
            text: 'Đã đăng kí',
        },
        {
            dataField: '',
            text: 'Hành động',
            formatter: viewDetailButton
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

export default ContestTeacherEndList;
