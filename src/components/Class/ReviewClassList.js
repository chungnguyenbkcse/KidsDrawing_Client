import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MyClassModificationStatus } from "../../store/models/my_class.interface";
import { setModificationState } from "../../store/actions/my_class.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


function ReviewClassList(props) {

  const dispatch = useDispatch();

  const class_has_register_join_semesters = useSelector((state) => state.class_has_register_join_semesters);

  const history = useHistory();


  const routeChange = (class_teacher) => {
    let path = '/classes-end/detail';
    localStorage.removeItem("class_id");
    localStorage.setItem("class_id", class_teacher.id.toString())
    localStorage.removeItem('class_end');
    localStorage.setItem('class_end', 'true');
    localStorage.removeItem('class_name');
    localStorage.setItem('class_name', class_teacher.name);
    history.push({
      pathname: path,
      state: { class_id: class_teacher.id }
    });
  }


  let datas = class_has_register_join_semesters.class_has_register_join_semesters
 
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





  function viewReviewStar(cell, row) {
      return (
        <span>{row.review_star}</span>
      )
  }



  const columns = [
    {
      dataField: 'student_name',
      text: 'Học sinh',
      filter: textFilter()
    },
    {
      dataField: 'review_star',
      text: 'Điểm đánh giá (Thang điểm 100)',
      formatter: viewReviewStar
    },
    {
        dataField: 'student_feedback',
        text: 'Phản hồi',
        filter: textFilter()
      },
  ];

  const contentTable = ({ paginationProps, paginationTableProps }) => (
    <div>
      {/* <PaginationListStandalone {...paginationProps} /> */}
      <div>
        <div>
                <BootstrapTable
                      hover
                      keyField="student_name"
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

export default ReviewClassList;
