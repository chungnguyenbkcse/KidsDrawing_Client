import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArtAgeModificationStatus } from "../../store/models/art_age.interface";
import { setModificationStateArtAge } from "../../store/actions/art_age.action";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { FaEdit } from 'react-icons/fa'
import { IoIosRemove } from 'react-icons/io'


function TeachAgeList(props) {

    const dispatch = useDispatch();
  const art_ages = useSelector((state) => state.art_ages);
  console.log(props.value)


  const datas = art_ages.artAges;

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
          <button type="button" className="btn btn-primary mx-auto" onClick={()=> {
            if(props.onSelect) props.onSelect(row);
            dispatch(setModificationStateArtAge(ArtAgeModificationStatus.Edit))
          }}><FaEdit className="icon-edit"/></button>
        </div>
        <div className="col-md-5"> 
          <button type="button" className="btn btn-danger" onClick={() =>{
            if(props.onSelect) props.onSelect(row);
            dispatch(setModificationStateArtAge(ArtAgeModificationStatus.Remove))
          }}><IoIosRemove className="icon-remove"/></button>
        </div>
      </div>
        
    )
  }

  const columns = [
    {
      dataField: 'name',
      text: 'Tên',
      filter: textFilter()
    },
    {
      dataField: 'description',
      text: 'Miêu tả'
    },
    {
      dataField: '',
      text: '',
      style:{
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

export default TeachAgeList;
