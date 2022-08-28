import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, ICourseState, IArtLevelState, IArtTypeState, IArtAgeState, ISectionTemplateState } from "../../store/models/root.interface";
import { CourseModificationStatus, ICourse } from "../../store/models/course.interface";
import { useHistory } from "react-router-dom";
import { IArtLevel } from "../../store/models/art_level.interface";
import { IArtType } from "../../store/models/art_type.interface";
import { IArtAge } from "../../store/models/art_age.interface";
import { setModificationState } from "../../store/actions/course.action";
import { ISectionTemplate } from "../../store/models/section_template.interface";

export type courseListProps = {
  onSelect?: (course: ICourse) => void;
  children?: React.ReactNode;
};

type Options = {
  name: string;
  value: any;
}


function CourseNomalList(props: courseListProps): JSX.Element {
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();
  const levels: IArtLevelState = useSelector((state: IStateType) => state.art_levels);
  const listLevel: IArtLevel[] = levels.artLevels
  console.log(listLevel)
  const listLevels: Options[] = [];
  listLevel.map((ele) => {
    let item: Options = { "name": ele.name, "value": ele.id }
    return listLevels.push(item)
  })

  const mytypes: IArtTypeState = useSelector((state: IStateType) => state.art_types);
  const listMytype: IArtType[] = mytypes.artTypes
  const listMytypes: Options[] = [];
  listMytype.map((ele) => {
    let item: Options = { "name": ele.name, "value": ele.id }
    return listMytypes.push(item)
  })

  const section_templates: ISectionTemplateState = useSelector((state: IStateType) => state.section_templates);
  const listSectionTemplate: ISectionTemplate[] = section_templates.sectionTemplates
  let listCourse: number[] = []
  listSectionTemplate.map((ele) => {
    return listCourse.push(ele.course_id)
  })

  console.log(listCourse)

  const art_ages: IArtAgeState = useSelector((state: IStateType) => state.art_ages);
  const listArtAge: IArtAge[] = art_ages.artAges
  const listArtAges: Options[] = [];
  listArtAge.map((ele) => {
    let item: Options = { "name": ele.name, "value": ele.id }
    return listArtAges.push(item)
  })

  let typeList: string[] = []

  courses.courses.map((course_item) => {
    return mytypes.artTypes.forEach(element => {
      if (element.id === course_item.art_type_id) {
        return typeList.push(element.name)
      }
    });
  })



  let levelList: string[] = []

  courses.courses.map((course_item) => {
    return levels.artLevels.forEach(element => {
      if (element.id === course_item.art_level_id) {
        return levelList.push(element.name)
      }
    });
  })

  let ageList: string[] = []
  courses.courses.map((course_item) => {
    return art_ages.artAges.forEach(element => {
      if (element.id === course_item.art_age_id) {
        return ageList.push(element.name)
      }
    });
  })

  const routeChange = (id: number, number_of_sum: number) => {
    localStorage.removeItem('course_id')
    localStorage.setItem('course_id', id.toString())
    localStorage.removeItem('number_of_sum')
    localStorage.setItem('number_of_sum', number_of_sum.toString())
    let path = '/courses/section-template';
    history.push({
      pathname: path,
      state: {id: id, number_of_sum: number_of_sum}
    });
  }

  const routeEdit = (course: ICourse) => {
    dispatch(setModificationState(CourseModificationStatus.None));
    let path = `/courses/edit-course`;
    history.push(path);
  }

  function routeChange1 () {
    let path = '/courses/lesson-plan';
    history.push(path);
  }

  const courseElements: (JSX.Element | null)[] = courses.courses.map((course, index) => {
    if (!course) { return null; }
    return (<tr className={`table-row ${(courses.selectedCourse && courses.selectedCourse.id === course.id) ? "selected" : ""}`}
      key={`course_${index}`}>
      <th scope="row">{course.id}</th>
      <td onClick={() => {
        if(props.onSelect) props.onSelect(course);
        routeChange(course.id, course.num_of_section)
      }}>{course.name}</td>
      <td>{typeList[index]}</td>
      <td>{ageList[index]}</td>
      <td>{levelList[index]}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={() => {
          if(props.onSelect) props.onSelect(course);
          routeEdit(course)}}
        >Chỉnh thông tin</button>
      </td>
      {
        function () {
          if (!listCourse.includes(course.id)) {
            return (
              <td>
                <button type="button" className="btn btn-warning" onClick={() => {
                  if (props.onSelect) props.onSelect(course);
                  routeChange1()
                }}
                >Tạo giáo án</button>
              </td>
            )
          }
        }()
      }
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Thể loại</th>
            <th scope="col">Độ tuổi</th>
            <th scope="col">Trình độ</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {courseElements}
        </tbody>
      </table>
    </div>

  );
}

export default CourseNomalList;
