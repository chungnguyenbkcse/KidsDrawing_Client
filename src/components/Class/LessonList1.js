import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MyClassModificationStatus } from "../../store/models/my_class.interface";
import { setModificationState } from "../../store/actions/my_class.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import {MdAnalytics} from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { IoIosRemove } from 'react-icons/io'

function LessonList1(props) {

    const dispatch = useDispatch();

    const time_schedules = useSelector((state) => state.time_schedules);
    const sections = useSelector((state) => state.section_teachers);
    const history = useHistory();
    
    const routeChange = (section) =>{ 
      let path = '/class/lesson'; 
      localStorage.setItem('section_id', section.id.toString())
      history.push(path);
    }
  

    let data = []
    let list_link_record = []
    let total_time = "";
    let check_active = [];

    if (time_schedules.timeSchedules.length > 1) {
            if (time_schedules.timeSchedules[0] !== undefined && time_schedules.timeSchedules[0] !== null){
                var start_time_0 = time_schedules.timeSchedules[0].start_time.split("T");
                var end_time_0 = time_schedules.timeSchedules[0].end_time.split("T");
                var hour_start = parseInt(start_time_0[1].substring(0, 2));
                var minus_tart = parseInt(start_time_0[1].substring(3, 5));
                var sercon_start = parseInt(start_time_0[1].substring(6, 8));
                var hour_end = parseInt(end_time_0[1].substring(0, 2));
                var minus_end = parseInt(end_time_0[1].substring(3, 5));
                var sercon_end = parseInt(end_time_0[1].substring(6, 8));
    
                total_time = (hour_end - hour_start).toString() + " giờ " + (minus_end - minus_tart).toString() + " phút " + (sercon_end - sercon_start).toString() + " giây";
                time_schedules.timeSchedules.map((ele, index) => {
                    var start_date = new Date(ele.start_time);
                    var end_date = new Date(ele.end_time);
                    const link = "https://recording-jitsi-chung.s3.ap-southeast-1.amazonaws.com/recording/"
                    const class_id = 1;
                    const days = ele.end_time;
                    let str = link + class_id.toString() + "_" + days.slice(0,10) + ".mp4";
                    list_link_record.push(str);
                    // Do your operations
                    var date_now   = new Date();

                    if (( start_date.getTime() - date_now.getTime()) / 1000 > 86400) {
                        check_active.push('Chưa diễn ra');
                    }
                    else if ((start_date.getTime() - date_now.getTime()) / 1000 < 86400 && (date_now.getTime() - start_date.getTime()) / 1000 < 0) {
                        check_active.push('Chuẩn bị diễn ra');
                    }
                    else if ((date_now.getTime() - start_date.getTime()) / 1000 > 0 && (end_date.getTime() - date_now.getTime()) / 1000 > 0) {
                        check_active.push('Đang diễn ra');
                    }
                    else {
                        check_active.push('Đã diễn ra');
                    }

                    var start_time = ele.start_time.split("T");
                    var end_time = ele.end_time.split("T");
                    return data.push("Từ " + start_time[0] + " " + start_time[1] + " -> " + end_time[0] + " " + end_time[1])
                })
            }
    }

    function checkActive(index) {
        if (check_active[index] === "Chưa diễn ra") {
            return "not_active_now";
        }
        else if (check_active[index] === "Chuẩn bị diễn ra") {
            return 'pre_active_now';
        }
        else if (check_active[index] === "Đang diễn ra") {
            return 'active_now';
        }
        else {
            return "not_active";
        }
    }


  const routeViewSchedule = (class_id, class_name) =>{ 
    localStorage.removeItem('class_id')
    localStorage.setItem('class_id', class_id.toString())
    localStorage.removeItem('class_name')
    localStorage.setItem('class_name', class_name)
    let path = '/class/schedule'; 
    history.push({
      pathname: path,
      state: { class_id: class_id }
    });
  }


  const datas = sections.sections.sort((a, b) => a.number - b.number);

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


  function editButton1(cell, row, rowIndex) {
    if (checkActive(rowIndex) === "not_active_now"){
        return (
            <span>Chưa diễn ra</span>
        )
    }
    else if (checkActive(rowIndex) === "pre_active_now"){
        return (
            <span style={{color: "blue"}}>Chuẩn bị diễn ra</span>
        )
    }
    else if (checkActive(rowIndex) === "active_now"){
        return (
            <span style={{color: "red"}}>Đang diễn ra</span>
        )
    }
    else {
        return (
            <span >Đã diễn ra</span>
        )
    }
  }

  function editButton(cell, row, rowIndex) {
    if (row.teach_form == true && checkActive(rowIndex) === "not_active") {
        return (
        <button type="button" className="btn btn-primary" onClick={() => {
                  localStorage.setItem('link_recording', list_link_record[rowIndex])
                  routeChange(row)
        }} >Recording</button>
        )
    }
  }

  



  const columns = [
    {
      dataField: 'number',
      text: 'Buổi số',
      style:{
        width: '100px'
      }
    },
    {
      dataField: 'name',
      text: 'Tên buổi học',
      filter: textFilter()
    },
    {
      dataField: 'teacher_name',
      text: 'Giáo viên',
      filter: textFilter()
    },
    {
      dataField: '',
      text: 'Trạng thái',
      formatter: editButton1
    },
    {
      dataField: '',
      text: 'Hành động',
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

export default LessonList1;
