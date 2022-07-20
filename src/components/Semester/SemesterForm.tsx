import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ISemesterState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISemester, SemesterModificationStatus } from "../../store/models/semester.interface";
import TextInput from "../../common/components/TextInput";
import { editSemester, clearSelectedSemester, setModificationState, addSemester } from "../../store/actions/semester.actions";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import { OnChangeModel, ISemesterFormState } from "../../common/types/Form.types";
import { postSemester } from "../../common/service/semester/PostSemester";
import { putSemester } from "../../common/service/semester/PutSemester";
import Editor from "../../common/components/Quill/Editor";

const SemesterForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const semesters: ISemesterState | null = useSelector((state: IStateType) => state.semesters);
  let semester: ISemester | null = semesters.selectedSemester;
  const isCreate: boolean = (semesters.modificationState === SemesterModificationStatus.Create);

  if (!semester || isCreate) {
    semester = { id: 0, name: "", description: "", number: 0, year: 0, start_time: "", create_time: "", update_time: "", creator_id: 0 };
  }

  const [formState, setFormState] = useState({
    name: { error: "", value: semester.name },
    description: { error: "", value: semester.description },
    number: { error: "", value: semester.number },
    year: { error: "", value: semester.year },
    start_time: { error: "", value: semester.start_time }
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

    let saveUserFn: Function = (isCreate) ? addSemester : editSemester;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: ISemesterFormState, saveFn: Function): void {
    if (semester) {
      dispatch(saveFn({
        ...semester,
        name: formState.name.value,
        description: formState.description.value,
        number: formState.number.value,
        year: formState.year.value,
        start_time: formState.start_time.value,
      }));

      

      if (saveFn === addSemester) {
        dispatch(postSemester({
          name: formState.name.value,
          year: formState.year.value,
          description: formState.description.value,
          number: formState.number.value,
          start_time: formState.start_time.value,
          creator_id: localStorage.getItem('id')
        }));
      }
      else {
        dispatch(putSemester(semester.id, {
          name: formState.name.value,
          year: formState.year.value,
          description: formState.description.value,
          number: formState.number.value,
          start_time: formState.start_time.value,
          creator_id: localStorage.getItem('id')
        }));
      }

      console.log(saveFn)

      dispatch(addNotification("Học kì ", `${formState.name.value} chỉnh bởi bạn`));
      dispatch(clearSelectedSemester());
      dispatch(setModificationState(SemesterModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(SemesterModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.number.error || formState.description.error
      || formState.name.error || formState.year.error || formState.start_time.error
      || !formState.name.value || !formState.start_time.value) as boolean;
  }

  return (
    <Fragment>
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} học kì</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-group">
                <TextInput id="input_name"
                  value={formState.name.value}
                  field="name"
                  onChange={hasFormValueChanged}
                  required={true}
                  maxLength={2000}
                  label="Tên"
                  placeholder="" />
              </div>
              <div className="form-group">
                <label>Mô tả</label>
              <Editor />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <NumberInput id="input_year"
                    value={formState.year.value}
                    field="year"
                    onChange={hasFormValueChanged}
                    max={10000}
                    min={0}
                    label="Năm học"
                  />
                </div>
                <div className="form-group col-md-6">
                  <NumberInput id="input_number"
                    field="number"
                    value={formState.number.value}
                    onChange={hasFormValueChanged}
                    max={10}
                    min={1}
                    label="Học kì"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <TextInput id="input_start_time"
                    field="start_time"
                    value={formState.start_time.value}
                    onChange={hasFormValueChanged}
                    type="datetime-local"
                    required={false}
                    maxLength={100}
                    label="Thời gian bắt đầu"
                    placeholder="" />
                </div>
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SemesterForm;
