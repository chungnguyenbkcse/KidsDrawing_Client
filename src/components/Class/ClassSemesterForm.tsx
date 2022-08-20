import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, ISemesterClassState, ISemesterState, ILessonState, IScheduleState, ICourseState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISemesterClass, SemesterClassModificationStatus } from "../../store/models/semester_class.interface";
import { editSemesterClass, clearSelectedSemesterClass, setModificationStateSemesterClass, addSemesterClass } from "../../store/actions/semester_class.action"
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, ISemesterClassFormState } from "../../common/types/Form.types";
import { ISemester } from "../../store/models/semester.interface";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { postSemesterClass } from "../../common/service/SemesterClass/PostSemesterClass";
import { putSemesterClass } from "../../common/service/SemesterClass/PutSemesterClass";
import TextInput from "../../common/components/TextInput";
import NumberInput from "../../common/components/NumberInput";
import { ILesson } from "../../store/models/lesson.interface";
import SelectKeyValueMutiple from "../../common/components/SelectKeyValueMutiple";

export type semesterCourseListProps = {
  isCheck: (value: boolean) => void;
  children?: React.ReactNode;
};

type Options = {
  name: string;
  value: any;
}

type LessonTime = {
  key: number;
  value: number;
}

type ScheduleType = {
  lesson_time: number;
  date_of_week: number;
}

type Option1s = {
  key: number;
  value: number;
}


function ClassSemesterForm(props: semesterCourseListProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const semester_classes: ISemesterClassState | null = useSelector((state: IStateType) => state.semester_classes);
  const semesters: ISemesterState | null = useSelector((state: IStateType) => state.semesters);
  const courses: ICourseState | null = useSelector((state: IStateType) => state.courses);
  let semester_classe: ISemesterClass | null = semester_classes.selectedSemesterClass;
  const isCreate: boolean = (semester_classes.modificationState === SemesterClassModificationStatus.Create);
  let semester_class_id: number = 0;
  if (!semester_classe || isCreate) {
    semester_classe = { id: 0, max_participant: 0, semester_name: "", course_id: 0, course_name: "", creation_id: 0, name: "" };
  }
  else {
    semester_class_id = semester_classe.id;
  }

  const listSemesters: Options[] = [];
  semesters.semesters.map((ele) => {
    let item: Options = { "name": ele.name, "value": ele.id }
    return listSemesters.push(item)
  })

  const listCourses: Options[] = [];
  courses.courses.map((ele) => {
    let item: Options = { "name": ele.name, "value": ele.id }
    return listCourses.push(item)
  })

  const schedules: IScheduleState = useSelector((state: IStateType) => state.schedules);
  let lesson_time_list: LessonTime[] = []
  console.log(schedules.schedules)
  if (semester_class_id !== 0) {
    schedules.schedules.forEach(element => {
      if (element.semester_class_id === semester_class_id) {
        lesson_time_list.push({
          key: element.date_of_week,
          value: element.lesson_time
        })
      }
    })
  }

  console.log(lesson_time_list)



  const list_date_of_week: Options[] = [
    {
      "name": "Thứ 2",
      "value": 2
    },
    {
      "name": "Thứ 3",
      "value": 3
    },
    {
      "name": "Thứ 4",
      "value": 4
    },
    {
      "name": "Thứ 5",
      "value": 5
    },
    {
      "name": "Thứ 6",
      "value": 6
    },
    {
      "name": "Thứ 7",
      "value": 7
    }
  ];

  const lesson_times: ILessonState = useSelector((state: IStateType) => state.lessons);
  const list_lesson: ILesson[] = lesson_times.lessons
  const list_lessons: Options[] = [];
  list_lesson.map((ele) => {
    let item: Options = { "name": ele.start_time + " - " + ele.end_time, "value": ele.id }
    return list_lessons.push(item)
  })

  let total = schedules.schedules.filter((value) => value.semester_class_id === semester_class_id).length
  let schedule_list = schedules.schedules.filter((value) => value.semester_class_id === semester_class_id)

  const [formState, setFormState] = useState({
    creation_id: { error: "", value: semester_classe.creation_id },
    name: { error: "", value: semester_classe.name },
    max_participant: { error: "", value: semester_classe.max_participant },
    course_id: { error: "", value: semester_classe.course_id },
    total_date_of_week: { error: "", value: total },
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
      let lesson_times: Option1s[] = listLessonId.filter((value, index) => value.key < formState.total_date_of_week.value)
      let date_of_weeks: Option1s[] = listScheduleItemId.filter((value, index) => value.key < formState.total_date_of_week.value)
      let schedule_element: ScheduleType[] = [];
      lesson_times.map((ele, idx) => {
        return schedule_element.push({
          lesson_time: ele.value,
          date_of_week: date_of_weeks[idx].value
        })
      })

      console.log(schedule_element)
      if (saveFn === addSemesterClass) {
        dispatch(postSemesterClass({
          creation_id: formState.creation_id.value,
          name: formState.name.value,
          course_id: formState.course_id.value
        }, schedule_element))
      }

      else if (saveFn === editSemesterClass) {
        dispatch(putSemesterClass(semester_classe.id, {
          creation_id: formState.creation_id.value,
          name: formState.name.value,
          course_id: formState.course_id.value
        }))
      }

      dispatch(addNotification("Mở lớp đăng kí theo kì ", `chỉnh bởi bạn`));
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
    return (formState.name.error  || formState.creation_id.error
      || formState.course_id.error || !formState.creation_id.value || !formState.course_id.value
      || !formState.name.value ) as boolean;
  }
  const [listScheduleItemId, setListScheduleItemId] = useState<Option1s[]>([])
  const [listLessonId, setListLessonId] = useState<Option1s[]>([])
  useEffect(() => {
    let res_1: Option1s[] = []
    if (total > 0) {
      for (let index = 0; index < total; index++) {
        let date_of_week_obj: Option1s = {
          key: index,
          value: schedule_list[index].date_of_week
        }
        let lesson_time_obj: Option1s = {
          key: index,
          value: schedule_list[index].lesson_time
        }
        res_1.push(date_of_week_obj)
        listScheduleItemId.push(date_of_week_obj)
        listLessonId.push(lesson_time_obj)
        //console.log(listScheduleItemId)
        //setListScheduleItemId([...listScheduleItemId, date_of_week_obj])
        //setListLessonId([...listLessonId, lesson_time_obj])
      }
    }
    setListScheduleItemId([...listScheduleItemId])
    setListLessonId([...listLessonId])

  }, [total])
  function hasFormMutipleValueChanged1(value: number, index: number) {
    if (listScheduleItemId.length === 0) {
      setListScheduleItemId([...listScheduleItemId, { "key": index, "value": value }])
    }
    else {
      let is_check = false
      for (let idx = 0; idx < listScheduleItemId.length; idx++) {
        if (listScheduleItemId[idx].key === index) {
          if (listScheduleItemId[idx].value !== value) {
            is_check = true
            setListScheduleItemId([...listScheduleItemId.filter((item, idx) => item.key !== index), { "key": index, "value": value }])
          }
          break
        }

      }

      if (is_check === false) {
        setListScheduleItemId([...listScheduleItemId, { "key": index, "value": value }])
      }
    }
  }

  console.log(listScheduleItemId)

  function hasFormMutipleValueChanged2(value: number, index: number) {
    if (listLessonId.length === 0) {
      setListLessonId([...listLessonId, { "key": index, "value": value }])
    }
    else {
      let is_check = false
      for (let idx = 0; idx < listLessonId.length; idx++) {
        if (listLessonId[idx].key === index) {
          if (listLessonId[idx].value !== value) {
            is_check = true
            setListLessonId([...listLessonId.filter((item, idx) => item.key !== index), { "key": index, "value": value }])
          }
          break
        }

      }

      if (is_check === false) {
        setListLessonId([...listLessonId, { "key": index, "value": value }])
      }
    }
  }

  console.log(listLessonId)


  return (
    <Fragment>
      <div className="row text-left">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-1">
            <div className="card-header py-2">
              <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} lớp theo kì</h6>
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

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <NumberInput id="input_total_date_of_week"
                      value={formState.total_date_of_week.value}
                      field="total_date_of_week"
                      onChange={hasFormValueChanged}
                      max={3}
                      min={0}
                      label="Tổng số ngày học trong tuần"
                    />
                  </div>
                </div>

                {
                  Array.from(Array(formState.total_date_of_week.value).keys()).map((value, index) => {
                    return (
                      <div className="form-row" key={index}>
                        <div className="form-group col-md-6">
                          <SelectKeyValueMutiple
                            value={isCreate ? 0 : lesson_time_list[index].key}
                            index={index}
                            inputClass={`schedule_item_date_of_week_${index}`}
                            onChange={hasFormMutipleValueChanged1}
                            required={true}
                            label="Thứ trong tuần"
                            options={list_date_of_week}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <SelectKeyValueMutiple
                            value={isCreate ? 0 : lesson_time_list[index].value}
                            inputClass={`schedule_item_lesson_time_${index}`}
                            index={index}
                            onChange={hasFormMutipleValueChanged2}
                            required={true}
                            label="Tiết"
                            options={list_lessons}
                          />
                        </div>
                      </div>
                    )
                  })
                }

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

export default ClassSemesterForm;
