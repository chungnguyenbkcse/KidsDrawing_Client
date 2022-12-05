import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, IContestState, IArtTypeState, IArtAgeState, IUserState, IUserGradeContestState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ContestModificationStatus, IContest } from "../../store/models/contest.interface";
import TextInput from "../../common/components/TextInput";
import { editContestNotOpenNow, clearSelectedContestNotOpenNow, setModificationState, addContestNotOpenNow } from "../../store/actions/contest.action";
import NumberInput from "../../common/components/NumberInput";
import Checkbox from "../../common/components/Checkbox";
import { OnChangeModel, IContestFormState } from "../../common/types/Form.types";
import { postContest } from "../../common/service/Contest/PostContest";
import { putContest } from "../../common/service/Contest/PutContest";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { getArtType } from "../../common/service/ArtType/GetArtType";
import { getArtAge } from "../../common/service/ArtAge/GetArtAge";
import { IArtType } from "../../store/models/art_type.interface";
import { IArtAge } from "../../store/models/art_age.interface";
import Editor from "../../common/components/Quill/Editor";
import { useHistory } from "react-router-dom";
import ReactSelect from "../../common/components/ReactSelect";
import { IUser } from "../../store/models/user.interface";
import { getUserGradeContestByContestId } from "../../common/service/UserGradeContest/GetUserGradeContestByContestId";
import { getTeacher } from "../../common/service/Teacher/GetTeacher";
import { IUserGradeContest } from "../../store/models/user_grade_contest.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { toast, ToastContainer } from "react-toastify";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import DateInput from "../../common/components/DateInput";
import DateInput2 from "../../common/components/DateInput2";
import DateInput1 from "../../common/components/DateInput1";

type Options = {
  name: string;
  value: any;
}

type Option1 = {
  label: string;
  value: number;
}

const ContestForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const contests: IContestState | null = useSelector((state: IStateType) => state.contests);
  var contest: IContest | null = contests.selectedContest;
  var id_x = localStorage.getItem('contest_id');
  let contest_id: number = 0;
  if (id_x !== null) {
    contest_id = parseInt(id_x)
  }

  const [checkChange, setCheckChange] = useState(false)

  const { promiseInProgress } = usePromiseTracker();

  const isCreate: boolean = (contests.modificationState === ContestModificationStatus.Create);

  if (isCreate || contest === null){
      contest = { id: 0, check_gen: false, name: "", total_contest_submission: 0, total_contest_submission_graded: 0, total_register_contest: 0,  description: "", max_participant: 0, creator_id: 0, is_enabled: false, registration_time: "", start_time: "", end_time: "", create_time: "", update_time: "", image_url: "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg", art_age_id: 0, art_type_id: 0, art_age_name: "", art_type_name: "" };
  }
  useEffect(() => {
    trackPromise(getArtType(dispatch))
    trackPromise(getArtAge(dispatch))
    trackPromise(getTeacher(dispatch))
    trackPromise(getUserGradeContestByContestId(dispatch, contest_id))
  }, [dispatch, contest_id])


    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined) {
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time) {
                if (exp_refresh_token_decode < now_time) {
                    localStorage.removeItem('access_token') // Authorization
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getArtAge(dispatch))
                    trackPromise(getArtType(dispatch))
                    trackPromise(getTeacher(dispatch))
                    trackPromise(getUserGradeContestByContestId(dispatch, contest_id))
                }
            }
            else {
                trackPromise(getArtAge(dispatch))
                trackPromise(getArtType(dispatch))
                trackPromise(getTeacher(dispatch))
                trackPromise(getUserGradeContestByContestId(dispatch, contest_id))
            }
        }
    }, [dispatch, access_token, refresh_token, contest_id])
  

  const mytypes: IArtTypeState = useSelector((state: IStateType) => state.art_types);
  const listMytype: IArtType[] = mytypes.artTypes
  const listMytypes: Options[] = [];
  listMytype.map((ele) => {
    let item: Options = { "name": ele.name, "value": ele.id }
    return listMytypes.push(item)
  })

  const users: IUserState = useSelector((state: IStateType) => state.users);
  const listTeacher: IUser[] = users.teachers
  const listTeachers: Option1[] = [];
  listTeacher.map((ele) => {
    let item: Option1 = { "label": ele.username, "value": ele.id }
    return listTeachers.push(item)
  })

  const user_grade_contests: IUserGradeContestState = useSelector((state: IStateType) => state.user_grade_contests);
  const listTeacherGradeContest: IUserGradeContest[] = user_grade_contests.userGradeContests;
  const listTeacherGradeContests: Option1[] = [];
  listTeacherGradeContest.map((ele) => {
    let item: Option1 = { "label": ele.teacher_name, "value": ele.teacher_id }
    return listTeacherGradeContests.push(item)
  })

  console.log(listTeacherGradeContests)
  const art_ages: IArtAgeState = useSelector((state: IStateType) => state.art_ages);
  const listArtAge: IArtAge[] = art_ages.artAges
  const listArtAges: Options[] = [];
  listArtAge.map((ele) => {
    let item: Options = { "name": ele.name, "value": ele.id }
    return listArtAges.push(item)
  })

  const src = contest.image_url;

  const [preview, setPreview] = useState(src)

  const [formState, setFormState] = useState({
    name: { error: "", value: contest.name },
    description: { error: "", value: contest.description },
    max_participant: { error: "", value: contest.max_participant },
    registration_time: { error: "", value: contest.registration_time },
    is_enabled: { error: "", value: contest.is_enabled },
    image_url: { error: "", value: contest.image_url },
    start_time: { error: "", value: contest.start_time },
    end_time: { error: "", value: contest.end_time },
    creator_id: { error: "", value: contest.creator_id },
    create_time: { error: "", value: contest.create_time },
    update_time: { error: "", value: contest.update_time },
    art_age_id: { error: "", value: contest.art_age_id },
    art_type_id: { error: "", value: contest.art_type_id },
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  async function saveUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
      position: toast.POSITION.TOP_CENTER
    });

    
    

    let saveUserFn: Function = (isCreate) ? addContestNotOpenNow : editContestNotOpenNow;

    if (saveUserFn === editContestNotOpenNow) {
      if (image !== null) {
        var url = await setImageAction();
        saveForm(formState, saveUserFn, url, idx);
      }
      else {
        saveForm(formState, saveUserFn, preview, idx);
      }
    }
    else {
      var url = await setImageAction();
      saveForm(formState, saveUserFn, url, idx);
    }
    
  }

  const history = useHistory();

  function routeHome() {
      let path = `/contests`;
      history.push(path);
  }

  function saveForm(formState: IContestFormState, saveFn: Function, url: string, idx: any):void {
    if (contest) {
      if (saveFn === addContestNotOpenNow) {
        dispatch(postContest(valueTeacher,{
          name: formState.name.value,
          description: textHtml,
          registration_time: formState.registration_time.value,
          image_url: url,
          is_enabled: formState.is_enabled.value,
          creator_id: localStorage.getItem('id'),
          max_participant: formState.max_participant.value,
          start_time: formState.start_time.value,
          end_time: formState.end_time.value,
          art_age_id: formState.art_age_id.value,
          art_type_id: formState.art_type_id.value
        }, idx, routeHome))
      }

      else if (saveFn === editContestNotOpenNow) {
        if (valueTeacher.length === 0 && checkChange === false) {      
          dispatch(putContest(contest.id, {
            name: formState.name.value,
            description: textHtml,
            registration_time: formState.registration_time.value,
            image_url: url,
            is_enabled: formState.is_enabled.value,
            creator_id: localStorage.getItem('id'),
            max_participant: formState.max_participant.value,
            start_time: formState.start_time.value,
            end_time: formState.end_time.value,
            art_age_id: formState.art_age_id.value,
            art_type_id: formState.art_type_id.value
          },listTeacherGradeContests,  idx, routeHome))
        }
        else {
          dispatch(putContest(contest.id, {
            name: formState.name.value,
            description: textHtml,
            registration_time: formState.registration_time.value,
            image_url: url,
            is_enabled: formState.is_enabled.value,
            creator_id: localStorage.getItem('id'),
            max_participant: formState.max_participant.value,
            start_time: formState.start_time.value,
            end_time: formState.end_time.value,
            art_age_id: formState.art_age_id.value,
            art_type_id: formState.art_type_id.value
          },valueTeacher,  idx, routeHome))
        }
      }

      dispatch(clearSelectedContestNotOpenNow());
      dispatch(setModificationState(ContestModificationStatus.None)); 
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(ContestModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.max_participant.error || formState.description.error
      || formState.name.error || formState.registration_time.error || formState.start_time.error
      || formState.end_time.error || !formState.art_age_id.value || !formState.art_type_id.value
      || !formState.name.value || !formState.registration_time.value || !formState.start_time.value
      || !formState.end_time.value) as boolean;
  }

  const [textHtml, setTextHtml] = useState<string>("")
  function getValue(value: string) {
    setTextHtml(value);
  }


  const [image, setImage] = useState<any>(null);

  const uploadPicture = (e: any) => {
    setImage({
      /* contains the preview, if you want to show the picture to the user
          you can access it with this.state.currentPicture
     */
      picturePreview: URL.createObjectURL(e.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0]
    })
    setPreview(URL.createObjectURL(e.target.files[0]))
  };

  async function setImageAction() {
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

  const [valueTeacher, setValueTeacher] = useState<any[]>([])

  function changeValueTeacher(value: any){
    setValueTeacher(value)
    setCheckChange(true)
  }

  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  var time_now = now.toISOString().slice(0,16);

  console.log(formState.start_time.value)

  console.log(formState.start_time.value !== null && formState.start_time.value !== "" ? false: true)

  return (
    promiseInProgress ?
      <div className="row" id="search-box">
        <div className="col-xl-12 col-lg-12">
          <div className="input-group" id="search-content">
            <div className="form-outline">
              <Loading type={"spin"} color={"rgb(53, 126, 221)"} />
            </div>
          </div>
        </div>
      </div> : <Fragment>
      <ToastContainer />
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} cuộc thi</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="profile_image">Chọn ảnh:</label>
                  <input type="file" id="profile_image" name="profile_image" onChange={uploadPicture} />
                </div>
                <div className="form-group col-md-6">
                  <img src={preview} alt="Preview" id="avatar" />
                </div>
              </div>

              <div className="form-group">
                  <TextInput id="input_name"
                    field="name"
                    value={formState.name.value}
                    onChange={hasFormValueChanged}
                    required={false}
                    maxLength={100}
                    label="Tên khóa học"
                    placeholder="" />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <SelectKeyValue id="input_art_type_id"
                    field="art_type_id"
                    value={formState.art_type_id.value}
                    onChange={hasFormValueChanged}
                    required={true}
                    label="Thể loại"
                    options={listMytypes}
                  />
                </div>
                <div className="form-group col-md-6">
                  <SelectKeyValue
                    id="input_art_age_id"
                    field="art_age_id"
                    label="Mức độ"
                    options={listArtAges}
                    required={true}
                    onChange={hasFormValueChanged}
                    value={formState.art_age_id.value}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <Checkbox
                    id="input_is_enabled"
                    field="is_enabled"
                    value={formState.is_enabled.value}
                    onChange={hasFormValueChanged}
                    required={false}
                    label="Mở"
                  />
                </div>
                  <div className="form-group col-md-6">
                    <label>Giáo viên chấm</label>
                    <ReactSelect setValue={listTeachers} value={listTeacherGradeContests} changeValue={changeValueTeacher}/>
                  </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <NumberInput id="input_max_participant"
                    value={formState.max_participant.value}
                    field="max_participant"
                    onChange={hasFormValueChanged}
                    max={1000}
                    min={0}
                    label="Số người đăng kí tối đa" />
                </div>
                <div className="form-group col-md-6">
                  <DateInput id="input_registration_time"
                    field="registration_time"
                    value={formState.registration_time.value}
                    onChange={hasFormValueChanged}
                    type="datetime-local"
                    active={false}
                    required={false}
                    maxLength={time_now}
                    label="Thời gian bắt đầu đăng kí"
                    placeholder="" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <DateInput2 id="input_start_time"
                    field="start_time"
                    value={formState.start_time.value}
                    onChange={hasFormValueChanged}
                    type="datetime-local"
                    active={formState.registration_time.value !== null && formState.registration_time.value !== "" ? false: true}
                    required={false}
                    maxLength={formState.registration_time.value}
                    label="Thời gian bắt đầu cuộc thi"
                    placeholder="" />
                </div>
                <div className="form-group col-md-6">
                  <DateInput1 id="input_end_time"
                    field="end_time"
                    value={formState.end_time.value}
                    onChange={hasFormValueChanged}
                    type="datetime-local"
                    active={formState.start_time.value !== null && formState.start_time.value !== ""? false: true}
                    required={false}
                    maxLength={formState.start_time.value}
                    label="Thời gian kết thúc cuộc thi"
                    placeholder="" />
                </div>
              </div>

              <div className="form-group">
                <label>Miêu tả</label>
                <Editor getValue={getValue} isCreate={isCreate} setValue={formState.description.value} />
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

export default ContestForm;
