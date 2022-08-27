import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ISectionTemplateState } from "../../store/models/root.interface";
import { ISectionTemplate, SectionTemplateModificationStatus } from "../../store/models/section_template.interface";
import { setModificationStateSectionTemplate } from "../../store/actions/section_template.action";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";
import { useHistory } from "react-router-dom";

export type section_templateListProps = {
  onSelect?: (section_template: ISectionTemplate) => void;
  value?: string;
  children?: React.ReactNode;
};

function SectionTemplateList(props: section_templateListProps): JSX.Element  {
  const dispatch: Dispatch<any> = useDispatch();
  const section_templates: ISectionTemplateState = useSelector((state: IStateType) => state.section_templates);
  console.log(props.value)
  
  const history = useHistory();
  const routeChange = (section_template_id: number) => {
    let path = '/section-template/edit';
    console.log(section_template_id)
    localStorage.removeItem('section_template_id')
    localStorage.setItem('section_template_id', section_template_id.toString())
    history.push({
      pathname: path,
      state: { section_template_id: section_template_id }
    });
  }


  const section_templateElements: (JSX.Element | null)[] = section_templates.sectionTemplates.filter((val) => {
    if (props.value === ""){
      return val;
    }
    else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))){
      return val;
    }
    return null
  }).sort((a,b) => a.number - b.number).map((section_template, index) => {
    //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
    if (!section_template) { return null; }
    return (<tr className={`table-row ${(section_templates.selectedSectionTemplate && section_templates.selectedSectionTemplate.id === section_template.id) ? "selected" : ""}`}
      key={`section_template_${section_template.id}`}>
      <th scope="row">{index + 1}</th>
      <td>{section_template.name}</td>
      <td>{section_template.course_id}</td>
      <td>{section_template.teaching_form}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={()=> {
          if(props.onSelect) props.onSelect(section_template);
          localStorage.setItem('section_template', (section_template.id).toString())
          dispatch(setModificationStateSectionTemplate(SectionTemplateModificationStatus.Edit))
          routeChange(section_template.id)
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
