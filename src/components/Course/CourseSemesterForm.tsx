import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ISemesterClassState, ICourseState, ISemesterState, IScheduleState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISemesterClass, SemesterClassModificationStatus } from "../../store/models/semester_class.interface";
import { editSemesterClass, clearSelectedSemesterClass, setModificationStateSemesterClass, addSemesterClass } from "../../store/actions/semester_class.action"
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, ISemesterClassFormState } from "../../common/types/Form.types";
import { ICourse } from "../../store/models/course.interface";
import { ISemester } from "../../store/models/semester.interface";
import { ISchedule } from "../../store/models/schedule.interface";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { postSemesterClass } from "../../common/service/SemesterClass/PostSemesterClass";
import { putSemesterClass } from "../../common/service/SemesterClass/PutSemesterClass";
import TextInput from "../../common/components/TextInput";
import NumberInput from "../../common/components/NumberInput";

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
  const semester_classes: ISemesterClassState | null = useSelector((state: IStateType) => state.semester_classes);
  let semester_classe: ISemesterClass | null = semester_classes.selectedSemesterClass;
  const isCreate: boolean = (semester_classes.modificationState === SemesterClassModificationStatus.Create);

  if (!semester_classe || isCreate) {
    semester_classe = { id: 0, max_participant: 0, course_id: 0, creation_id: 0, name: "" };
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
    creation_id: { error: "", value: semester_classe.creation_id },
    name: { error: "", value: semester_classe.name },
    max_participant: { error: "", value: semester_classe.max_participant },
    course_id: { error: "", value: semester_classe.course_id }
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

    let saveUserFn: Function = (isCreate) ? addSemesterClass : editSemesterClass;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: ISemesterClassFormState, saveFn: Function): void {
    if (semester_classe) {

      if (saveFn === addSemesterClass) {
        dispatch(postSemesterClass({
          creation_id: formState.creation_id.value,
          name: formState.name.value,
          max_participant: formState.max_participant.value,
          course_id: formState.course_id.value
        }))
      }

      else if (saveFn === editSemesterClass) {
        dispatch(putSemesterClass(semester_classe.id, {
          creation_id: formState.creation_id.value,
          name: formState.name.value,
          max_participant: formState.max_participant.value,
          course_id: formState.course_id.value
        }))
      }

      dispatch(addNotification("Khóa học theo kì ", `chỉnh bởi bạn`));
      dispatch(clearSelectedSemesterClass());
      dispatch(setModificationStateSemesterClass(SemesterClassModificationStatus.None));
    }
  }

  function cancelForm(): void {
    props.isCheck(false);
    dispatch(setModificationStateSemesterClass(SemesterClassModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.name.error || formState.max_participant.error || formState.creation_id.error
      || formState.course_id.error || !formState.creation_id.value || !formState.course_id.value
      || !formState.name.value || !formState.max_participant.value) as boolean;
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
                <div className="form-group">
                  <TextInput id="input_name"
                    field="name"
                    value={formState.name.value}
                    onChange={hasFormValueChanged}
                    required={false}
                    maxLength={1000}
                    label="Tên"
                    placeholder=""
                  />
                </div>
                <div className="form-group">
                  <NumberInput id="input_max_participant"
                    value={formState.max_participant.value}
                    field="max_participant"
                    onChange={hasFormValueChanged}
                    max={10000000}
                    min={0}
                    label="Đăng kí tối đa"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <SelectKeyValue id="input_creation_id"
                      field="creation_id"
                      value={formState.creation_id.value}
                      onChange={hasFormValueChanged}
                      required={true}
                      label="Học kì"
                      options={listSemesters}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <SelectKeyValue id="input_course_id"
                      field="course_id"
                      value={formState.course_id.value}
                      onChange={hasFormValueChanged}
                      required={true}
                      label="Thuộc khóa học"
                      options={listCourses}
                    />
                  </div>
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
