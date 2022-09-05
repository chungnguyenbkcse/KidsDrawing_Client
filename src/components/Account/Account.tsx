import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { UserModificationStatus } from "../../store/models/user.interface";
import TextInput from "../../common/components/TextInput";
import { editTeacher, clearSelectedUser, setModificationState, addTeacher } from "../../store/actions/users.action";
import { OnChangeModel, IUser1FormState } from "../../common/types/Form.types";
import { postTeacher } from "../../common/service/Teacher/PostTeacher";
import { putTeacher } from "../../common/service/Teacher/PutTeacher";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectInput from "../../common/components/Select";
import { getUserById } from "../../common/service/User/GetUserById";

export type teacherListProps = {
    isCheck: (value: boolean) => void;
    children?: React.ReactNode;
};

const Account: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const id = localStorage.getItem('id')
    useEffect(() => {
        dispatch(getUserById(id))
    }, [dispatch, id])
    var role_privilege = localStorage.getItem('role_privilege')
    let rolePrivilege: any = []
    let userRole: any = ""
    if (role_privilege !== null) {
        rolePrivilege = (role_privilege.split(','))
        userRole = (rolePrivilege[0])
    }
    let users: IUserState = useSelector((state: IStateType) => state.users);
    console.log(users.teachers)

    let user =  users.teachers.length > 0 ? users.teachers[0] : { id: 0, username: "", email: "", status: true, firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: 0 }

    console.log(user)
    let [formState, setFormState] = useState({
        username: { error: "", value: user.username },
        email: { error: "", value: user.email },
        password: { error: "", value: "" },
        firstName: { error: "", value: user.firstName },
        lastName: { error: "", value: user.lastName },
        dateOfBirth: { error: "", value: user.dateOfBirth },
        profile_image_url: { error: "", value: user.profile_image_url },
        sex: { error: "", value: user.sex },
        phone: { error: "", value: user.phone },
        address: { error: "", value: user.address }
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    async function saveUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }
        const id = toast.loading("Đang xác thực. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        var url = await setImageAction();
        let saveUserFn: Function =editTeacher;
        saveForm(formState, saveUserFn, url, id);
    }

    function saveForm(formState: IUser1FormState, saveFn: Function, url: string, id: any): void {
        if (user) {
            
            let username = formState.username.value === "" ? user.username : formState.username.value;
            let email = formState.email.value === "" ? user.email : formState.email.value;
            let firstName = formState.firstName.value === "" ? user.firstName : formState.firstName.value;
            let lastName = formState.lastName.value === "" ? user.lastName : formState.lastName.value;
            let dateOfBirth = formState.dateOfBirth.value === "" ? user.dateOfBirth : formState.dateOfBirth.value;
            let sex = formState.sex.value === "" ? user.sex : formState.sex.value;
            let phone = formState.phone.value === "" ? user.phone : formState.phone.value;
            let address = formState.address.value === "" ? user.address : formState.address.value
            let url_x = url === "" ? user.profile_image_url : url;

            if (saveFn === addTeacher) {
                dispatch(postTeacher({
                    username: username,
                    email: email,
                    password: "",
                    firstName: firstName,
                    lastName: lastName,
                    dateOfBirth: dateOfBirth,
                    profile_image_url: url_x,
                    sex: sex,
                    phone: phone,
                    address: address,
                    parent_ids: user.parents,
                    roleNames: [userRole]
                }, id));
            }

            else if (saveFn === editTeacher) {
                dispatch(putTeacher(user.id, {
                    username: username,
                    email: email,
                    password: "",
                    firstName: firstName,
                    lastName: lastName,
                    dateOfBirth: dateOfBirth,
                    profile_image_url: url_x,
                    sex: sex,
                    phone: phone,
                    address: address,
                    parent_ids: user.parents,
                    roleNames: [userRole]
                }, id));
            }

            dispatch(clearSelectedUser());
            dispatch(setModificationState(UserModificationStatus.None));
        }
    }

    console.log(formState)

    function cancelForm(): void {
        dispatch(setModificationState(UserModificationStatus.None));
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return ((!formState.email.value && user.email === "") || (!formState.username.value && user.username === "")
             ) as boolean;
    }

    let src = user.profile_image_url;

    const [preview, setPreview] = useState(src)
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

    async function setImageAction(){
        const formData = new FormData();
        if (image === undefined){
            return ""
        }
        else {
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

    return (
        <Fragment>
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Chỉnh thông tin cá nhân</h6>
                        </div>
                        <ToastContainer />
                        <div className="card-body">
                            <form onSubmit={saveUser}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="profile_image">Chọn ảnh:</label>
                                        <input type="file" id="profile_image" name="profile_image" onChange={uploadPicture} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <img src={preview === "" ? user.profile_image_url : preview} alt="Preview" id="avatar" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_username"
                                            field="username"
                                            value={formState.username.value === "" ? user.username : formState.username.value}
                                            onChange={hasFormValueChanged}
                                            required={true}
                                            maxLength={100}
                                            label="Tên đăng nhập"
                                            placeholder="" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_email"
                                            field="email"
                                            value={formState.email.value === "" ? user.email : formState.email.value}
                                            onChange={hasFormValueChanged}
                                            required={true}
                                            maxLength={200}
                                            label="Email"
                                            placeholder="" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_firstName"
                                            field="firstName"
                                            value={formState.firstName.value === "" ? user.firstName : formState.firstName.value}
                                            onChange={hasFormValueChanged}
                                            required={false}
                                            maxLength={100}
                                            label="Họ"
                                            placeholder="" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_lastName"
                                            field="lastName"
                                            value={formState.lastName.value === "" ? user.lastName : formState.lastName.value}
                                            onChange={hasFormValueChanged}
                                            required={false}
                                            maxLength={200}
                                            label="Tên"
                                            placeholder="" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                    <SelectInput
                                        id="input_sex"
                                        field="sex"
                                        label="Giới tính"
                                        options={["Nam", "Nữ"]}
                                        required={true}
                                        onChange={hasFormValueChanged}
                                        value={formState.sex.value === "" ? user.sex : formState.sex.value}
                                    />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_phone"
                                            field="phone"
                                            value={formState.phone.value === "" ? user.phone : formState.phone.value}
                                            onChange={hasFormValueChanged}
                                            required={false}
                                            maxLength={200}
                                            label="Số điện thoại"
                                            placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <TextInput id="input_address"
                                        field="address"
                                        value={formState.address.value === "" ? user.address : formState.address.value}
                                        onChange={hasFormValueChanged}
                                        required={false}
                                        maxLength={200}
                                        label="Địa chỉ"
                                        placeholder="" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_dateOfBirth"
                                            field="dateOfBirth"
                                            value={formState.dateOfBirth.value === "" ? user.dateOfBirth : formState.dateOfBirth.value}
                                            onChange={hasFormValueChanged}
                                            type="date"
                                            required={false}
                                            maxLength={200}
                                            label="Ngày sinh"
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

export default Account;
