import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import TextInput from "../../common/components/TextInput";
import { editTeacher, clearSelectedUser, setModificationState, addTeacher } from "../../store/actions/users.action";
import { addNotification } from "../../store/actions/notifications.action";
import SelectInput from "../../common/components/Select";
import { OnChangeModel, IUserFormState } from "../../common/types/Form.types";
import { postTeacher } from "../../common/service/Teacher/PostTeacher";
import { putTeacher } from "../../common/service/Teacher/PutTeacher";

export type teacherListProps = {
  isCheck: (value: boolean) => void;
  children?: React.ReactNode;
};

function TeacherImportForm(props: teacherListProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const users: IUserState = useSelector((state: IStateType) => state.users);
  let user: IUser | null = users.selectedUser;
  const isCreate: boolean = (users.modificationState === UserModificationStatus.Create);

  if (!user || isCreate) {
    user = { id: 0, username: "", email: "", status: true, firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: [] };
  }

  const [formState, setFormState] = useState({
    username: { error: "", value: user.username },
    email: { error: "", value: user.email },
    password: { error: "", value: "" }
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
      dispatch(saveFn({
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
        parent_ids: [],
        roleNames: ["TEACHER_USER"]
      }));

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
          parent_ids: [],
          roleNames: ["TEACHER_USER"]
        }));
      }

      else if (saveFn === editTeacher) {
        dispatch(putTeacher(user.id, {
          ...user,
          username: formState.username.value,
          email: formState.email.value,
          password: formState.password.value,
          creator_id: localStorage.getItem('id')
        }));
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
    return !csvFile ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.username.error || formState.email.error
      || !formState.email.value || !formState.username.value || !formState.password.value ) as boolean;
  }

  const [csvFile, setCsvFile] = useState<any>();

  const processCSV = (str: string, delim = ',') => {
    console.log('hello')
    const headers = str.slice(0, str.indexOf('\n')).split(delim);
    console.log(headers)
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');
    const headerx = ["username", "email", "password"]

    const newArray = rows.map(row => {
      const values = row.split(delim);
      const eachObject = headerx.reduce((obj: any, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {})
      return eachObject;
    })
    console.log(newArray)
    newArray.map((ele: any, index: any) => {
      if (ele.username !== "") {
        let x: IUserFormState = {
            username: ele.username,
            email: ele.email,
            password: ele.password
        };

        console.log(x)
        let saveUserFn: Function = addTeacher;
        saveForm(x, saveUserFn);
        dispatch(addNotification("Giáo viên", ` ${x.username} chỉnh bởi bạn`));
        dispatch(clearSelectedUser());
        dispatch(setModificationState(UserModificationStatus.None));
        //let saveUserFn: Function = addTeacher;
        //saveForm(x, saveUserFn);
      }
      return 0
    })
  }

  const saveTeacherCSV = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.isCheck(false)
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e: any) {
        const text = e.target.result;
        processCSV(text)
    }

    reader.readAsText(file);

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
              <form onSubmit={saveTeacherCSV}>
                <div className="form-group">
                  <label htmlFor="profile_image">Chọn file (.xml):</label>
                  <input
                  type={"file"}
                  accept=".csv,.xlsx,.xls"
                  id="csvFile"
                  onChange={(e: any) => {
                    setCsvFile(e.target.files[0])
                  }}
                />
                </div>
                <div className="form-group">
                  <a href={`${process.env.REACT_APP_API_LOCAL}\\example.csv`}>File mẫu</a>
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

export default TeacherImportForm;
