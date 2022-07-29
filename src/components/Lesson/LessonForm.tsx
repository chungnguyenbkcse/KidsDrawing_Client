import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ILessonState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ILesson, LessonModificationStatus } from "../../store/models/lesson.interface";
import TextInput from "../../common/components/TextInput";
import { editLesson, clearSelectedLesson, setModificationState, addLesson } from "../../store/actions/lesson.action";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, ILessonFormState } from "../../common/types/Form.types";
import { postLesson } from "../../common/service/Lesson/PostLesson";
import { putLesson } from "../../common/service/Lesson/PutLesson";

export type lessonListProps = {
  isCheck: (value: boolean) => void;
  children?: React.ReactNode;
};

function LessonForm(props: lessonListProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const lessons: ILessonState | null = useSelector((state: IStateType) => state.lessons);
  let lesson: ILesson | null = lessons.selectedLesson;
  const isCreate: boolean = (lessons.modificationState === LessonModificationStatus.Create);

  if (!lesson || isCreate) {
    lesson = { id: 0, start_time: "",end_time: ""};
  }

  const [formState, setFormState] = useState({
    start_time: { error: "", value: lesson.start_time },
    end_time: { error: "", value: lesson.end_time }
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    //console.log(formState)
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addLesson : editLesson;
    props.isCheck(false);
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: ILessonFormState, saveFn: Function): void {
    if (lesson) {
      dispatch(saveFn({
        ...lesson,
        start_time: formState.start_time.value,
        end_time: formState.end_time.value
      }));

      

      if (saveFn === addLesson) {
        dispatch(postLesson({
          start_time: formState.start_time.value,
          end_time: formState.end_time.value
        }));
      }
      else {
        dispatch(putLesson(lesson.id, {
          start_time: formState.start_time.value,
          end_time: formState.end_time.value
        }));
      }

      console.log(saveFn)

      dispatch(addNotification("Tiết học ", `${formState.start_time.value} - ${formState.end_time.value} chỉnh bởi bạn`));
      dispatch(clearSelectedLesson());
      dispatch(setModificationState(LessonModificationStatus.None));
    }
  }

  function cancelForm(): void {
    props.isCheck(false);
    dispatch(setModificationState(LessonModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.start_time.error || formState.end_time.error
      || !formState.start_time.value || !formState.end_time.value) as boolean;
  }

  return (
    <Fragment>
      <div className="row text-left">
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} học kì</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <TextInput id="input_start_time"
                    field="start_time"
                    value={formState.start_time.value}
                    onChange={hasFormValueChanged}
                    type="time"
                    required={false}
                    maxLength={100}
                    label="Thời gian bắt đầu"
                    placeholder="" />
                </div>
                <div className="form-group col-md-6">
                  <TextInput id="input_end_time"
                    field="end_time"
                    value={formState.end_time.value}
                    onChange={hasFormValueChanged}
                    type="time"
                    required={false}
                    maxLength={100}
                    label="Thời gian kết thúc"
                    placeholder="" />
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

export default LessonForm;
