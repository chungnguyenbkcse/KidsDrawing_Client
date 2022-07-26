import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, IContestState, IArtTypeState, IArtAgeState, IUserState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IContest, ContestModificationStatus } from "../../store/models/contest.interface";
import TextInput from "../../common/components/TextInput";
import { editContest, clearSelectedContest, setModificationState, addContest } from "../../store/actions/contest.action";
import { addNotification } from "../../store/actions/notifications.action";
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
import { useLocation } from "react-router-dom";
import ReactSelect from "../../common/components/ReactSelect";
import { IUser } from "../../store/models/user.interface";
import { postUserGradeContest } from "../../common/service/UserGradeContest/PostUserGradeContest";

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
  const { state } = useLocation()
    console.log(state)
    let contest: IContest | null = null;
    if (typeof state != "undefined"){
        contest = state.contest_value;
    }
  const isCreate: boolean = (contests.modificationState === ContestModificationStatus.Create);

  if (!contest || isCreate) {
    contest = { id: 0, name: "", description: "", max_participant: 0, creator_id: 0, is_enabled: false, registration_time: "", start_time: "", end_time: "", create_time: "", update_time: "", image_url: "", art_age_id: 0, art_type_id: 0 };
  }

  useEffect(() => {
    dispatch(getArtType())
    dispatch(getArtAge())

  }, [dispatch])

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

  const art_ages: IArtAgeState = useSelector((state: IStateType) => state.art_ages);
  const listArtAge: IArtAge[] = art_ages.artAges
  const listArtAges: Options[] = [];
  listArtAge.map((ele) => {
    let item: Options = { "name": ele.name, "value": ele.id }
    return listArtAges.push(item)
  })

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

    var url = await setImageAction();

    let saveUserFn: Function = (isCreate) ? addContest : editContest;
    saveForm(formState, saveUserFn, url);
  }

  function saveForm(formState: IContestFormState, saveFn: Function, url: string):void {
    if (contest) {
      dispatch(saveFn({
        ...contest,
        name: formState.name.value,
        description: formState.description.value,
        registration_time: formState.registration_time.value,
        image_url: url,
        is_enabled: formState.is_enabled.value,
        creator_id: localStorage.getItem('id'),
        max_participant: formState.max_participant.value,
        start_time: formState.start_time.value,
        end_time: formState.end_time.value,
        art_age_id: formState.art_age_id.value,
        art_type_id: formState.art_type_id.value
      }));

      if (saveFn === addContest) {
        dispatch(postContest(valueTeacher,{
          name: formState.name.value,
          description: textHtml,
          registration_time: formState.registration_time.value,
          image_url: url,
          is_enabled: formState.is_enabled.value,
          creater_id: localStorage.getItem('id'),
          max_participant: formState.max_participant.value,
          start_time: formState.start_time.value,
          end_time: formState.end_time.value,
          art_age_id: formState.art_age_id.value,
          art_type_id: formState.art_type_id.value
        }))
      }

      else if (saveFn === editContest) {
        dispatch(putContest(contest.id, {
           name: formState.name.value,
          description: textHtml,
          registration_time: formState.registration_time.value,
          image_url: url,
          is_enabled: formState.is_enabled.value,
          creater_id: localStorage.getItem('id'),
          max_participant: formState.max_participant.value,
          start_time: formState.start_time.value,
          end_time: formState.end_time.value,
          art_age_id: formState.art_age_id.value,
          art_type_id: formState.art_type_id.value
        }))
      }

      dispatch(addNotification("Cuộc thi ", `${formState.name.value} chỉnh bởi bạn`));
      dispatch(clearSelectedContest());
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


  const [image, setImage] = useState<any>();

  const uploadPicture = (e: any) => {
    setImage({
      /* contains the preview, if you want to show the picture to the user
          you can access it with this.state.currentPicture
     */
      picturePreview: URL.createObjectURL(e.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0]
    })
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
  }

  return (
    <Fragment>
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} cuộc thi</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-group">
                <label htmlFor="profile_image">Chọn ảnh:</label>
                <input type="file" id="profile_image" name="profile_image" onChange={uploadPicture} />
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
                    <ReactSelect setValue={listTeachers} changeValue={changeValueTeacher}/>
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
                  <TextInput id="input_registration_time"
                    field="registration_time"
                    value={formState.registration_time.value}
                    onChange={hasFormValueChanged}
                    type="datetime-local"
                    required={false}
                    maxLength={100}
                    label="Thời gian bắt đầu đăng kí"
                    placeholder="" />
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
                    label="Thời gian bắt đầu cuộc thi"
                    placeholder="" />
                </div>
                <div className="form-group col-md-6">
                  <TextInput id="input_end_time"
                    field="end_time"
                    value={formState.end_time.value}
                    onChange={hasFormValueChanged}
                    type="datetime-local"
                    required={false}
                    maxLength={100}
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
