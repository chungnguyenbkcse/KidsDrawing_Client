import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import TextInput from "../../common/components/TextInput";
import { editTeacher, clearSelectedUser, setModificationState, addTeacher } from "../../store/actions/users.action";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, IUserFormState } from "../../common/types/Form.types";
import { postTeacher } from "../../common/service/Teacher/PostTeacher";
import { putTeacher } from "../../common/service/Teacher/PutTeacher";
import { toast } from "react-toastify";

export type teacherListProps = {
  isCheck: (value: boolean) => void;
  children?: React.ReactNode;
};

function TeacherForm(props: teacherListProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const users: IUserState = useSelector((state: IStateType) => state.users);
  let user: IUser | null = users.selectedUser;
  const isCreate: boolean = (users.modificationState === UserModificationStatus.Create);

  if (!user || isCreate) {
    user = { id: 0, username: "", email: "", password: "", status: "", firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: 0 };
  }

  const [formState, setFormState] = useState({
    username: { error: "", value: user.username },
    email: { error: "", value: user.email },
    password: { error: "", value: user.password }
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
    let saveUserFn: Function = (isCreate) ? addTeacher : editTeacher;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IUserFormState, saveFn: Function): void {
    if (user) {

      const id = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
        position: toast.POSITION.TOP_CENTER
      });

      if (saveFn === addTeacher){
        dispatch(postTeacher({
          username: formState.username.value,
          email: formState.email.value,
          password: formState.password.value,
          firstName: null,
          lastName: null,
          dateOfBirth: null,
          profile_image_url: null,
          sex: null,
          phone: null,
          address: null,
          roleNames: ["TEACHER_USER"]
        }, id));
      }

      else if (saveFn === editTeacher) {
        dispatch(putTeacher(user.id, {
          username: formState.username.value,
          email: formState.email.value,
          password: formState.password.value,
          firstName: null,
          lastName: null,
          dateOfBirth: null,
          profile_image_url: null,
          sex: null,
          phone: null,
          address: null,
          roleNames: ["TEACHER_USER"]
        }, id));
      }

      dispatch(addNotification("Giáo viên", ` ${formState.username.value} chỉnh bởi bạn`));
      dispatch(clearSelectedUser());
      dispatch(setModificationState(UserModificationStatus.None));
    }
  }

  function cancelForm(): void {
    props.isCheck(false);
    dispatch(setModificationState(UserModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.username.error || formState.email.error
      || !formState.email.value || !formState.username.value || !formState.password.value ) as boolean;
  }

  return (
    <Fragment>
      <div className="row text-left">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} giáo viên</h6>
            </div>
            <div className="card-body">
              <form onSubmit={saveUser}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <TextInput id="input_username"
                      field="username"
                      value={formState.username.value}
                      onChange={hasFormValueChanged}
                      required={true}
                      maxLength={100}
                      label="Tên đăng nhập"
                      placeholder="" />
                  </div>
                  <div className="form-group col-md-6">
                    <TextInput id="input_email"
                      field="email"
                      value={formState.email.value}
                      onChange={hasFormValueChanged}
                      required={true}
                      maxLength={200}
                      label="Email"
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

export default TeacherForm;
