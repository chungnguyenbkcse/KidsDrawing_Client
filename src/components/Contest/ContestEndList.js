import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../common/components/ConverDate";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function ContestEndList(props) {

    const contests = useSelector((state) => state.contests);
    const history = useHistory();

    const routeChange = (id) => {
      localStorage.setItem('contest_id', id)
        let path = '/contests/detail';
        history.push(path);
    }
    const date_0 = new Date();
    const date = date_0.toUTCString()
    //console.log(date)
    const date_now = formatDate(new Date(date)).substring(0,10) + "Z"+ formatDate(new Date(date)).substring(11,16);
    console.log( formatDate(new Date(date)).substring(0,10) + "Z"+ formatDate(new Date(date)).substring(11,16))

  const datas = contests.contests.filter((contest, index) => {
    var strDate1 = contest.start_time;
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
        if(props.onSelect) props.onSelect(row);
        routeChange(row.id)
      }}>Chỉnh sửa</button>
    )
  }

  function showStartTime(cell, row) {
    var strDate = row.start_time;
    return (
        <span>{strDate.substring(0, 10) + " " + strDate.substring(11,19)}</span>
    )
  }

  function showEndTime(cell, row) {
    var strDate = row.start_time;
    return (
        <span>{strDate.substring(0, 10) + " " + strDate.substring(11,19)}</span>
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
        text: 'Đã kí',
      },
      {
        dataField: 'total_contest_submission_graded',
        text: 'Đã nộp',
      },
    {
      dataField: '',
      text: 'Hành động',
      formatter: viewDetailButton
    }
  ];

  const contentTable = ({ paginationProps, paginationTableProps }) => (
    <div>
      <PaginationListStandalone {...paginationProps} />
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

  const onChangeRequest = (teacher_id) => {
    let path = '/teachers/request-level';
    localStorage.removeItem("teacher_id");
    localStorage.setItem("teacher_id", teacher_id.toString())
    history.push({
      pathname: path
    });
  }


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

export default ContestEndList;
