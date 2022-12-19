import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import { clearSelectedUser, setModificationState, addTeacher } from "../../store/actions/users.action";
import { addNotification } from "../../store/actions/notifications.action";
import { postTeacher } from "../../common/service/Teacher/PostTeacher";
import { toast } from "react-toastify";

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
    user = { id: 0, username: "", email: "", status: "", password: "", firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: 0, parent: "", student_ids: [], student_names: [] }
  }

  function saveForm(formState: any, saveFn: Function): void {
    const id = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
      position: toast.POSITION.TOP_CENTER
    });

    if (user) {
      console.log({
        username: formState.username,
        email: formState.email,
        password: null,
        firstName: null,
        lastName: null,
        dateOfBirth: null,
        profile_image_url: null,
        sex: null,
        phone: null,
        address: null,
        roleName: "TEACHER"
      })
      if (saveFn === addTeacher){
        (postTeacher(dispatch,{
          username: formState.username,
          email: formState.email,
          password: null,
          firstName: null,
          lastName: null,
          dateOfBirth: null,
          profile_image_url: null,
          sex: null,
          phone: null,
          address: null,
          roleName: "TEACHER"
        }, id));
      }
    }
  }

  function cancelForm(): void {
    props.isCheck(false);
    dispatch(setModificationState(UserModificationStatus.None));
  }

  function getDisabledClass(): string {
    return !csvFile ? "disabled" : "";
  }

  const [csvFile, setCsvFile] = useState<any>();

  const processCSV = (str: string, delim = ',') => {
    console.log('hello')
    const headers = str.slice(0, str.indexOf('\n')).split(delim);
    console.log(headers)
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');
    const headerx = ["username", "email"]

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
        let x = {
            username: ele.username,
            email: ele.email
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
