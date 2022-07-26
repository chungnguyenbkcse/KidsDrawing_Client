import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ISemesterCourseState, ICourseState, ISemesterState, IScheduleState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISemesterCourse, SemesterCourseModificationStatus } from "../../store/models/semester_course.interface";
import TextInput from "../../common/components/TextInput";
import { editSemesterCourse, clearSelectedSemesterCourse, setModificationStateSemesterCourse, addSemesterCourse } from "../../store/actions/semester_course.action"
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import Checkbox from "../../common/components/Checkbox";
import SelectInput from "../../common/components/Select";
import { OnChangeModel, ISemesterCourseFormState } from "../../common/types/Form.types";
import { ICourse } from "../../store/models/course.interface";
import { ISemester } from "../../store/models/semester.interface";
import { ISchedule } from "../../store/models/schedule.interface";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { postSemesterCourse } from "../../common/service/SemesterCourse/PostSemesterCourse";
import { putSemesterCourse } from "../../common/service/SemesterCourse/PutSemesterCourse";

export type semesterCourseListProps = {
  isCheck: (value: boolean) => void;
  children?: React.ReactNode;
};

type Options = {
  name: string;
  value: any;
}

function CourseSemesterForm(props: semesterCourseListProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const semester_courses: ISemesterCourseState | null = useSelector((state: IStateType) => state.semester_courses);
  let semester_course: ISemesterCourse | null = semester_courses.selectedSemesterCourse;
  const isCreate: boolean = (semester_courses.modificationState === SemesterCourseModificationStatus.Create);
  
  if (!semester_course || isCreate) {
    semester_course = { id: 0, schedule_id: 0, course_id: 0, creation_id: 0};
  }

  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const listCourse: ICourse[] = courses.courses
  //console.log(listLevel)
  const listCourses: Options[] = [];
  listCourse.map((ele) => {
      let item: Options = { "name": ele.name, "value": ele.id }
      return listCourses.push(item)
  })

  const semesters: ISemesterState = useSelector((state: IStateType) => state.semesters);
  const listSemester: ISemester[] = semesters.semesters
  //console.log(listLevel)
  const listSemesters: Options[] = [];
  listSemester.map((ele) => {
      let item: Options = { "name": ele.name, "value": ele.id }
      return listSemesters.push(item)
  })

  const schedules: IScheduleState = useSelector((state: IStateType) => state.schedules);
  const listSchedule: ISchedule[] = schedules.schedules
  //console.log(listLevel)
  const listSchedules: Options[] = [];
  listSchedule.map((ele) => {
      let item: Options = { "name": ele.name, "value": ele.id }
      return listSchedules.push(item)
  })


  const [formState, setFormState] = useState({
    creation_id: { error: "", value: semester_course.creation_id },
    schedule_id: { error: "", value: semester_course.schedule_id },
    course_id: { error: "", value: semester_course.course_id }
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    props.isCheck(false);

    let saveUserFn: Function = (isCreate) ? addSemesterCourse : editSemesterCourse;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: ISemesterCourseFormState, saveFn: Function): void {
    if (semester_course) {
      dispatch(saveFn({
        ...semester_course,
        creation_id: formState.creation_id.value,
        schedule_id: formState.schedule_id.value,
        course_id: formState.course_id.value
      }));

      if (saveFn === addSemesterCourse){
        dispatch(postSemesterCourse({
          creation_id: formState.creation_id.value,
          schedule_id: formState.schedule_id.value,
          course_id: formState.course_id.value
        }))
      }

      else if (saveFn === editSemesterCourse){
        dispatch(putSemesterCourse(semester_course.id, {
          creation_id: formState.creation_id.value,
          schedule_id: formState.schedule_id.value,
          course_id: formState.course_id.value
        }))
      }

      dispatch(addNotification("Khóa học theo kì ", `chỉnh bởi bạn`));
      dispatch(clearSelectedSemesterCourse());
      dispatch(setModificationStateSemesterCourse(SemesterCourseModificationStatus.None));
    }
  }

  function cancelForm(): void {
    props.isCheck(false);
    dispatch(setModificationStateSemesterCourse(SemesterCourseModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.schedule_id.error || formState.creation_id.error
      || formState.course_id.error || !formState.creation_id.value || !formState.course_id.value || !formState.schedule_id.value) as boolean;
}

  return (
    <Fragment>
      <div className="row text-left">
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} khóa học theo kì</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <SelectKeyValue id="input_creation_id"
                      field = "creation_id"
                      value={formState.creation_id.value}
                      onChange={hasFormValueChanged}
                      required={true}
                      label="Học kì"
                      options={listSemesters}
                  />
                </div>
                <div className="form-group col-md-6">
                <SelectKeyValue id="input_course_id"
                      field = "course_id"
                      value={formState.course_id.value}
                      onChange={hasFormValueChanged}
                      required={true}
                      label="Thuộc khóa học"
                      options={listCourses}
                  />
              </div>
              </div>
                <div className="form-group">
                <SelectKeyValue id="input_schedule_id"
                      field = "schedule_id"
                      value={formState.schedule_id.value}
                      onChange={hasFormValueChanged}
                      required={true}
                      label="Lịch học"
                      options={listSchedules}
                  />
              </div>
            
              <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  );
};

export default CourseSemesterForm;
