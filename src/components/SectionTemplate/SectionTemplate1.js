import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ISectionTemplateState, ITutorialTemplateState, ITutorialTemplatePageState } from "../../store/models/root.interface";
import { ISectionTemplate, SectionTemplateModificationStatus } from "../../store/models/section_template.interface";
import { setModificationStateSectionTemplate } from "../../store/actions/section_template.action";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import { FaEdit } from 'react-icons/fa'
import { IoIosRemove } from 'react-icons/io'


function SectionTemplateList1(props) {

    const dispatch = useDispatch();
  const section_templates = useSelector((state) => state.section_templates);
  const tutorial_templates = useSelector((state) => state.tutorial_templates);
  const tutorial_template_pages = useSelector((state) => state.tutorial_template_pages);
  console.log(tutorial_template_pages)
  console.log(tutorial_templates)

  const history = useHistory();
  const routeChange = (section_template) => {
    let path = '/section-template/edit';
    localStorage.removeItem('section_template_id')
    localStorage.setItem('section_template_id', section_template.id.toString())
    localStorage.removeItem('section_number')
    localStorage.setItem('section_number', section_template.number.toString())
    localStorage.removeItem('teaching_form')
    localStorage.setItem('teaching_form', section_template.teaching_form.toString())
    let tutorial_template_page_list = []
    tutorial_template_pages.tutorialTemplatePages.map(element => {
      if (element.section_template_id === section_template.id){
        tutorial_template_page_list.push({
          description: element.description,
          id: element.id,
          section_template_id: element.section_template_id,
          number: element.number
        })
      }
      return null
    })
    console.log(tutorial_template_page_list)
    localStorage.removeItem('description_tutorial_template_page_list')
    localStorage.setItem('description_tutorial_template_page_list', JSON.stringify(tutorial_template_page_list.sort((a, b) => a.number - b.number)))
    history.push({
      pathname: path
    });

    localStorage.removeItem("tutorial_name");
    localStorage.setItem('tutorial_name', section_template.name)
  }

  var id_x = localStorage.getItem('course_name');
  let course_name = "";
  if (id_x !== null) {
    course_name = id_x;
  }


  const datas = section_templates.sectionTemplates.filter((val) => {
    if (props.value === "") {
      return val;
    }
    else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))) {
      return val;
    }
    return null
  }).sort((a, b) => a.number - b.number);

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


  function formButton(cell, row) {
    if (row.teaching_form === true) {
        return (
            <span>Dạy thông qua Jisti</span>
        )
    }
    else {
        return (
            <span>Tự đọc giáo trình</span>
        )
    }
  }

  function editButton(cell, row) {
    return (
      <div className="row mt-2">
        <div className="col-md-12 ml-2">
        <button type="button" className="btn btn-primary" onClick={()=> {
            if (props.onSelect) props.onSelect(row);
            dispatch(setModificationStateSectionTemplate(SectionTemplateModificationStatus.Edit))
            routeChange(row)
          }}><FaEdit className="icon-edit"/></button>
        </div>
      </div>
        
    )
  }

  const columns = [
    {
      dataField: 'name',
      text: 'Tên'
    },
    {
      dataField: 'number',
      text: 'Buổi số',
    },
    {
        dataField: 'teaching_form',
        text: 'Hình thức',
        formatter: formButton
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

export default SectionTemplateList1;
