import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, IRootPageStateType, IArtLevelState, IArtTypeState, IArtAgeState, ICourseState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ICourse, CourseModificationStatus } from "../../store/models/course.interface";
import TextInput from "../../common/components/TextInput";
import { editCourse, clearSelectedCourse, setModificationState, addCourse } from "../../store/actions/course.action";
import NumberInput from "../../common/components/NumberInput";
import Checkbox from "../../common/components/Checkbox";
import { OnChangeModel, ICourseNomalFormState } from "../../common/types/Form.types";
import { updateCurrentPath } from "../../store/actions/root.actions";
import Editor from "../../common/components/Quill/Editor";
import { IArtLevel } from "../../store/models/art_level.interface";
import { IArtType } from "../../store/models/art_type.interface";
import { IArtAge } from "../../store/models/art_age.interface";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { getArtType } from "../../common/service/ArtType/GetArtType";
import { getArtLevel } from "../../common/service/ArtLevel/GetArtLevel";
import { getArtAge } from "../../common/service/ArtAge/GetArtAge";
import { useHistory } from "react-router-dom";
import { getCourse } from "../../common/service/Course/GetCourse";

import { postCourse } from "../../common/service/Course/PostCourse";
import { putCourse } from "../../common/service/Course/PutCourse";
import { toast, ToastContainer } from "react-toastify";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";

type Options = {
    name: string;
    value: any;
}


const CourseNomalFormEdit: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const courses: ICourseState = useSelector((state: IStateType) => state.courses);

    const { promiseInProgress } = usePromiseTracker();
    //console.log(course)
    const isCreate: boolean = false;
    let course: ICourse | null = courses.selectedCourse;
    console.log(course)
    if (!course || isCreate) {
        course = { id: 0, name: "", description: "", max_participant: 0, num_of_section: 0, price: 0, image_url: "", is_enabled: false, art_age_id: 0, art_level_id: 0, art_type_id: 0, create_time: "", update_time: "", art_age_name: "", art_level_name:"", art_type_name: "", checked_tutoral: false };
    }
    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học", ""));
    }, [path.area, dispatch]);

    useEffect(() => {
        trackPromise(getCourse(dispatch))
        trackPromise(getArtType(dispatch))
        trackPromise(getArtLevel(dispatch))
        trackPromise(getArtAge(dispatch))

    }, [dispatch])

    const levels: IArtLevelState = useSelector((state: IStateType) => state.art_levels);
    const listLevel: IArtLevel[] = levels.artLevels
    //console.log(listLevel)
    const listLevels: Options[] = [];
    listLevel.map((ele) => {
        let item: Options = { "name": ele.name, "value": ele.id }
        return listLevels.push(item)
    })

    const mytypes: IArtTypeState = useSelector((state: IStateType) => state.art_types);
    const listMytype: IArtType[] = mytypes.artTypes
    const listMytypes: Options[] = [];
    listMytype.map((ele) => {
        let item: Options = { "name": ele.name, "value": ele.id }
        return listMytypes.push(item)
    })

    const art_ages: IArtAgeState = useSelector((state: IStateType) => state.art_ages);
    const listArtAge: IArtAge[] = art_ages.artAges
    const listArtAges: Options[] = [];
    listArtAge.map((ele) => {
        let item: Options = { "name": ele.name, "value": ele.id }
        return listArtAges.push(item)
    })

    const src = course.image_url;

    const [preview, setPreview] = useState(src)

    const [formState, setFormState] = useState({
        name: { error: "", value: course.name },
        description: { error: "", value: course.description },
        art_type_id: { error: "", value: course.art_type_id },
        art_level_id: { error: "", value: course.art_level_id },
        art_age_id: { error: "", value: course.art_age_id },
        num_of_section: { error: "", value: course.num_of_section },
        price: { error: "", value: course.price },
        image_url: { error: "", value: course.image_url },
        is_enabled: { error: "", value: course.is_enabled },
        create_time: { error: "", value: course.create_time },
        update_time: { error: "", value: course.update_time }
    });

    const history = useHistory();

    function routeHome() {
        dispatch(setModificationState(CourseModificationStatus.None));
        let path = `/courses`;
        history.push(path);
    }

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    async function saveUser(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }

        

        let saveUserFn: Function = (isCreate) ? addCourse : editCourse;
        if (saveUserFn === editCourse) {
            if (image !== null) {
                var url = await setImageAction();
                saveForm(formState, saveUserFn, url);
            }
            else {
                saveForm(formState, saveUserFn, src);
            }
            
        }
        else {
            var url = await setImageAction();
            saveForm(formState, saveUserFn, url);
        }
        
    }

    function saveForm(formState: ICourseNomalFormState, saveFn: Function, url: string): void {
        if (course) {
            const id = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });

            if (saveFn === addCourse) {
                dispatch(postCourse({
                    name: formState.name.value,
                    description: textHtml,
                    num_of_section: formState.num_of_section.value,
                    price: formState.price.value,
                    image_url: url,
                    is_enabled: formState.is_enabled.value,
                    art_type_id: formState.art_type_id.value,
                    art_age_id: formState.art_age_id.value,
                    art_level_id: formState.art_level_id.value
                }, id, routeHome))
            }

            else if (saveFn === editCourse) {
                dispatch(putCourse(course.id, {
                    name: formState.name.value,
                    description: textHtml,
                    num_of_section: formState.num_of_section.value,
                    price: formState.price.value,
                    image_url: url,
                    is_enabled: formState.is_enabled.value,
                    art_type_id: formState.art_type_id.value,
                    art_age_id: formState.art_age_id.value,
                    art_level_id: formState.art_level_id.value
                }, id, routeHome))
            }

            dispatch(clearSelectedCourse());
            dispatch(setModificationState(CourseModificationStatus.None));
            
        }
    }

    function cancelForm(): void {
        dispatch(setModificationState(CourseModificationStatus.None));
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.description.error
            || formState.name.error || formState.num_of_section.error || formState.price.error
            || formState.image_url.error || !formState.name.value || !formState.num_of_section.value) as boolean;
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
            picturePreview : URL.createObjectURL(e.target.files[0]),
            /* this contains the file we want to send */
            pictureAsFile : e.target.files[0]
        })

        setPreview(URL.createObjectURL(e.target.files[0]))
    };

    async function setImageAction(){
        if (image === null && course){
            return course.image_url
        }
        else {
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
        }
    };

    //console.log('Input',textHtml)

    return (
        promiseInProgress ?
      <div className="loader"></div> : <Fragment>
            <ToastContainer />
            <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} khóa học chung</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveUser}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="profile_image">Chọn ảnh:</label>
                                    <input type="file" id="profile_image" name="profile_image" onChange={uploadPicture}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <img src={preview} alt="Preview" id="avatar"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <TextInput id="input_name"
                                        field="name"
                                        value={formState.name.value}
                                        onChange={hasFormValueChanged}
                                        required={false}
                                        maxLength={100}
                                        label="Tên khóa học"
                                        placeholder="" />
                                </div>
                                <div className="form-group col-md-6">
                                    <NumberInput id="input_price"
                                        value={formState.price.value}
                                        field="price"
                                        onChange={hasFormValueChanged}
                                        max={10000000}
                                        min={0}
                                        label="Giá"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <SelectKeyValue id="input_art_type_id"
                                    field = "art_type_id"
                                    value={formState.art_type_id.value}
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    label="Thể loại"
                                    options={listMytypes}
                                />
                                </div>
                                <div className="form-group col-md-6">
                                    <SelectKeyValue
                                        id="input_art_level_id"
                                        field="art_level_id"
                                        label="Mức độ"
                                        options={listLevels}
                                        required={true}
                                        onChange={hasFormValueChanged}
                                        value={formState.art_level_id.value}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
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
                                    <NumberInput id="input_num_of_section"
                                        value={formState.num_of_section.value}
                                        field="num_of_section"
                                        onChange={hasFormValueChanged}
                                        max={36}
                                        min={1}
                                        label="Số buổi học" 
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Miêu tả</label>
                                <Editor getValue={getValue} isCreate={isCreate} setValue={formState.description.value}/>
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

export default CourseNomalFormEdit;
