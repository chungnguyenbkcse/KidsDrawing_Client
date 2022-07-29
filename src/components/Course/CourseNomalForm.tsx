import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, IRootPageStateType, IArtLevelState, IArtTypeState, IArtAgeState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ICourse, CourseModificationStatus } from "../../store/models/course.interface";
import TextInput from "../../common/components/TextInput";
import { editCourse, clearSelectedCourse, setModificationState, addCourse } from "../../store/actions/course.action";
import { addNotification } from "../../store/actions/notifications.action";
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
import { useHistory, useLocation } from "react-router-dom";
import { getCourse } from "../../common/service/Course/GetCourse";
import { postCourse } from "../../common/service/Course/PostCourse";
import { putCourse } from "../../common/service/Course/PutCourse";

type Options = {
    name: string;
    value: any;
}


const CourseNomalForm: React.FC = () => {
    //console.log(id)
    const dispatch: Dispatch<any> = useDispatch();
    //console.log(courses)
    const { state } = useLocation()
    console.log(state)
    let course: ICourse | null = null;
    if (typeof state != "undefined"){
        course = state.course_value;
    }
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    //console.log(course)
    const isCreate: boolean = true;
    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học", ""));
    }, [path.area, dispatch]);

    useEffect(() => {
        dispatch(getCourse())
        dispatch(getArtType())
        dispatch(getArtLevel())
        dispatch(getArtAge())

    }, [dispatch])

    if (!course || isCreate) {
        course = { id: 0, name: "", description: "", max_participant: 0, num_of_section: 0, price: 0, image_url: "", is_enabled: false, creator_id: 0, art_age_id: 0, art_level_id: 0, art_type_id: 0, create_time: "", update_time: "" };
    }

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

    const history = useHistory();

    function routeHome() {
        dispatch(setModificationState(CourseModificationStatus.None));
        let path = `/courses`;
        history.push(path);
    }

    const [formState, setFormState] = useState({
        name: { error: "", value: course.name },
        description: { error: "", value: course.description },
        max_participant: { error: "", value: course.max_participant },
        art_type_id: { error: "", value: course.art_type_id },
        art_level_id: { error: "", value: course.art_level_id },
        art_age_id: { error: "", value: course.art_age_id },
        num_of_section: { error: "", value: course.num_of_section },
        price: { error: "", value: course.price },
        image_url: { error: "", value: course.image_url },
        is_enabled: { error: "", value: course.is_enabled },
        creator_id: { error: "", value: course.creator_id },
        create_time: { error: "", value: course.create_time },
        update_time: { error: "", value: course.update_time }
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    async function saveUser(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }

        var url = await setImageAction();

        let saveUserFn: Function = (isCreate) ? addCourse : editCourse;
        saveForm(formState, saveUserFn, url);
    }

    function saveForm(formState: ICourseNomalFormState, saveFn: Function, url: string): void {
        if (course) {
            dispatch(saveFn({
                ...course,
                name: formState.name.value,
                description: textHtml,
                max_participant: formState.max_participant.value,
                num_of_section: formState.num_of_section.value,
                price: formState.price.value,
                image_url: url,
                is_enabled: formState.is_enabled.value,
                art_type_id: formState.art_type_id.value,
                art_age_id: formState.art_age_id.value,
                art_level_id: formState.art_level_id.value
            }));

            if (saveFn === addCourse) {
                dispatch(postCourse({
                    name: formState.name.value,
                    description: textHtml,
                    max_participant: formState.max_participant.value,
                    num_of_section: formState.num_of_section.value,
                    price: formState.price.value,
                    image_url: url,
                    is_enabled: formState.is_enabled.value,
                    art_type_id: formState.art_type_id.value,
                    art_age_id: formState.art_age_id.value,
                    art_level_id: formState.art_level_id.value,
                    creator_id: localStorage.getItem('id')
                }))
            }

            else if (saveFn === editCourse) {
                dispatch(putCourse(course.id, {
                    name: formState.name.value,
                    description: textHtml,
                    max_participant: formState.max_participant.value,
                    num_of_section: formState.num_of_section.value,
                    price: formState.price.value,
                    image_url: url,
                    is_enabled: formState.is_enabled.value,
                    art_type_id: formState.art_type_id.value,
                    art_age_id: formState.art_age_id.value,
                    art_level_id: formState.art_level_id.value,
                    creator_id: localStorage.getItem('id')
                }))
            }

            dispatch(addNotification("Khóa học ", `${formState.name.value} chỉnh bởi bạn`));
            dispatch(clearSelectedCourse());
            dispatch(setModificationState(CourseModificationStatus.None));
            routeHome()
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
        return (formState.max_participant.error || formState.description.error
            || formState.name.error || formState.num_of_section.error || formState.price.error
            || formState.image_url.error || !formState.name.value || !formState.num_of_section.value || !formState.max_participant.value) as boolean;
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
            picturePreview : URL.createObjectURL(e.target.files[0]),
            /* this contains the file we want to send */
            pictureAsFile : e.target.files[0]
        })
    };

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

    //console.log('Input',textHtml)

    return (
        <Fragment>

            <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} khóa học chung</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveUser}>
                            <div className="form-group">
                                <label htmlFor="profile_image">Chọn ảnh:</label>
                                <input type="file" id="profile_image" name="profile_image" onChange={uploadPicture}/>
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
                                        max={100000}
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
                                    <NumberInput id="input_num_of_section"
                                        value={formState.num_of_section.value}
                                        field="num_of_section"
                                        onChange={hasFormValueChanged}
                                        max={1000}
                                        min={0}
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

export default CourseNomalForm;
