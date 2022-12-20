import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { ICourseState, IStateType, ITeacherRegisterQuantificationState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import { editTeacherRegisterQuatificationNotApproved, clearSelectedTeacherRegisterNotQuatificationNow, setModificationState, addTeacherRegisterQuatificationNotApprovedNow } from "../../store/actions/teacher_register_quantification.action";
import { OnChangeModel, ITeacherRegisterLevelFormState } from "../../common/types/Form.types";
import { postTeaherLevel } from "../../common/service/TeacherRegisterQuantification/PostTeacherLevel";
import { ICourse } from "../../store/models/course.interface";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { putTeacherRegisterLevel } from "../../common/service/TeacherRegisterQuantification/PutTeacherRegisterLevel";
import { toast } from "react-toastify";

export type lessonListProps = {
  isCheck: (value: boolean) => void;
  children?: React.ReactNode;
};

type Options = {
    name: string;
    value: any;
  }

function TeacherLevelForm(props: lessonListProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const teacher_register_not_approved_nows: ITeacherRegisterQuantificationState | null = useSelector((state: IStateType) => state.teacher_register_quantifications);
  let teacher_register_not_approved: ITeacherRegisterQuantification | null = teacher_register_not_approved_nows.selectedTeacherRegisterQuantification;
  const isCreate: boolean = (teacher_register_not_approved_nows.modificationState === TeacherRegisterQuantificationModificationStatus.Create);
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const listCourse: ICourse[] = courses.courses
  //console.log(listLevel)
  const listCourses: Options[] = [];
  let list_approved: number []= []
  teacher_register_not_approved_nows.approveds.map((ele, idx) => {
    return list_approved.push(ele.course_id)
  })
  listCourse.map((ele) => {
      if (!list_approved.includes(ele.id)) {
        let item: Options = { "name": ele.name, "value": ele.id }
        return listCourses.push(item)
      }
      return null
  })
  console.log(listCourses)
  if (!teacher_register_not_approved || isCreate) {
    teacher_register_not_approved = { id: 0, time_approved: "", teacher_id: 0,teacher_name: "", reviewer_id: 0, course_id: 0, course_name: "", art_age_name: "", art_level_name: "", art_type_name: "", degree_photo_url: "", status: "Not approve now"};
  }

  const [formState, setFormState] = useState({
    teacher_id: { error: "", value: teacher_register_not_approved.teacher_id },
    course_id: { error: "", value: teacher_register_not_approved.course_id },
    degree_photo_url: { error: "", value: teacher_register_not_approved.degree_photo_url },
    status: { error: "", value: teacher_register_not_approved.status }
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    //console.log(formState)
    console.log(formState.course_id)
  }

  async function saveUser(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }
    const id = toast.loading("Yêu cầu đang được gửi. Vui lòng đợi giây lát...", {
      position: toast.POSITION.TOP_CENTER
    });

    props.isCheck(false);

    let saveUserFn: Function = (isCreate) ? addTeacherRegisterQuatificationNotApprovedNow : editTeacherRegisterQuatificationNotApproved;
    
    if (saveUserFn === addTeacherRegisterQuatificationNotApprovedNow) {
      var url = await setImageAction();
      saveForm(formState, saveUserFn, url, id);
    }
    else {
      if (image == null || image == undefined || image == "") {
        if (teacher_register_not_approved !== null) {
          let url: string = teacher_register_not_approved.degree_photo_url;
          saveForm(formState, saveUserFn, url, id);
        }  
      }
      else {
        var url = await setImageAction();
        saveForm(formState, saveUserFn, url, id);
      }
    }
  }

  function saveForm(formState: ITeacherRegisterLevelFormState, saveFn: Function, url: string, idx: any): void {
    props.isCheck(false);
    if (teacher_register_not_approved) {
      
      if (saveFn === addTeacherRegisterQuatificationNotApprovedNow) {
        dispatch(postTeaherLevel({
            teacher_id: localStorage.getItem('id'),
            course_id: formState.course_id.value,
            degree_photo_url: url,
            status: "Not approve now"
        }, idx));
      }
      else {
        dispatch(putTeacherRegisterLevel(teacher_register_not_approved.id, {
            teacher_id: localStorage.getItem('id'),
            course_id: formState.course_id.value,
            degree_photo_url: url,
            status: "Not approve now"
        }, idx));
      }

      console.log(saveFn)
      dispatch(clearSelectedTeacherRegisterNotQuatificationNow());
      dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None));
    }
  }

  function cancelForm(): void {
    props.isCheck(false);
    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.course_id.error 
      || !formState.course_id.value || preview === null || preview === "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg") as boolean;
  }

  const [image, setImage] = useState<any>();

    const uploadPicture = (e: any) => {
        setImage({
            /* contains the preview, if you want to show the picture to the user
                you can access it with this.state.currentPicture
           */
            picturePreview : URL.createObjectURL(e.target.files[0]),
            /* this contains the file we want to send */
            pictureAsFile : e.target.files[0]
        })
        setPreview(URL.createObjectURL(e.target.files[0]))
    };

    console.log(image)

    async function setImageAction(){
        const formData = new FormData();
        formData.append(
            "gifFile",
            image.pictureAsFile
        );
        // do your post request
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/cloudinary/gifs`, {
                method: "POST",
                body: formData
            }
        )
        const data = await res.json()
        return data.url_image

    };

    const src = "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"

    const [preview, setPreview] = useState(src)
    useEffect(() => {
      if (isCreate === false && teacher_register_not_approved !== null) {
        setPreview(teacher_register_not_approved.degree_photo_url)
      }
    }, [isCreate, teacher_register_not_approved])

  return (
    <Fragment>
      <div className="row text-left">
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow shadow-xx">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green" id="header-form-teacher-level">{(isCreate ? "Đăng kí" : "Chỉnh")} trình độ</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-group">
                    <SelectKeyValue id="input_course_id"
                      field = "course_id"
                      value={formState.course_id.value}
                      onChange={hasFormValueChanged}
                      required={true}
                      label="Khóa học"
                      options={listCourses}
                  />
                </div>
                <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="profile_image">Băng cấp (Chấp nhận: jpg, svg, png):</label>
                                    <input type="file" id="profile_image" name="profile_image" onChange={uploadPicture}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <img src={preview} alt="Preview" id="avatar"/>
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

export default TeacherLevelForm;
