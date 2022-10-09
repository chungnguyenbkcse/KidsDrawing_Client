import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ISectionTemplateState, ITutorialTemplateState, ITutorialTemplatePageState } from "../../store/models/root.interface";
import { ISectionTemplate, SectionTemplateModificationStatus } from "../../store/models/section_template.interface";
import { setModificationStateSectionTemplate } from "../../store/actions/section_template.action";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { useHistory } from "react-router-dom";


export type section_templateListProps = {
  onSelect?: (section_template: ISectionTemplate) => void;
  value?: string;
  children?: React.ReactNode;
};


function SectionTemplateList(props: section_templateListProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const section_templates: ISectionTemplateState = useSelector((state: IStateType) => state.section_templates);
  const tutorial_templates: ITutorialTemplateState = useSelector((state: IStateType) => state.tutorial_templates);
  const tutorial_template_pages: ITutorialTemplatePageState = useSelector((state: IStateType) => state.tutorial_template_pages);
  console.log(tutorial_template_pages)
  console.log(tutorial_templates)

  const history = useHistory();
  const routeChange = (section_template: ISectionTemplate) => {
    let path = '/section-template/edit';
    localStorage.removeItem('section_template_id')
    localStorage.setItem('section_template_id', section_template.id.toString())
    localStorage.removeItem('section_number')
    localStorage.setItem('section_number', section_template.number.toString())
    let tutorial_template_page_list: any[] = []
    tutorial_templates.tutorialTemplates.map(ele => {
      if (ele.section_template_id === section_template.id){
        localStorage.removeItem('tutorial_template_id')
        localStorage.setItem('tutorial_template_id', ele.id.toString())
        tutorial_template_pages.tutorialTemplatePages.map(element => {
          if (element.tutorial_template_id === ele.id){
            tutorial_template_page_list.push({
              description: element.description,
              id: element.id,
              name: element.name,
              tutorial_template_id: element.tutorial_template_id,
              number: element.number
            })
          }
          return null
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
  let course_name: string = "";
  if (id_x !== null) {
    course_name = id_x;
  }


  const section_templateElements: (JSX.Element | null)[] = section_templates.sectionTemplates.filter((val) => {
    if (props.value === "") {
      return val;
    }
    else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))) {
      return val;
    }
    return null
  }).sort((a, b) => a.number - b.number).map((section_template, index) => {
    //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
    if (!section_template) { return null; }
    return (<tr className={`table-row ${(section_templates.selectedSectionTemplate && section_templates.selectedSectionTemplate.id === section_template.id) ? "selected" : ""}`}
      key={`section_template_${section_template.id}`}>
      <th scope="row">{index + 1}</th>
      <td>{section_template.name}</td>
      <td>{course_name}</td>
      <td>{section_template.teaching_form === true ? "Dạy thông qua jisti" : "Tự đọc giáo trình"}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={() => {
          if (props.onSelect) props.onSelect(section_template);
          dispatch(setModificationStateSectionTemplate(SectionTemplateModificationStatus.Edit))
          routeChange(section_template)
        }}>Chỉnh sửa</button>
      </td>
    </tr>);
  });


  return (
    <Fragment>
      <div className="table-responsive portlet">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên</th>
              <th scope="col">Khóa học</th>
              <th scope="col">Hình thức</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {section_templateElements}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default SectionTemplateList;
