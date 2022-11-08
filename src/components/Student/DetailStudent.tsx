import React, { Fragment, Dispatch, useState, useEffect } from "react";
import TopCard from "../../common/components/TopCard";
import "./DetailStudent.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IUserState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import {
    setModificationState,
    changeSelectedUser
} from "../../store/actions/users.action";
import { UserModificationStatus, IUser } from "../../store/models/user.interface";
import TextInput from "../../common/components/TextInput";
import HistoryStudent from "./HistoryStudent";

const DetailStudent: React.FC = () => {
    const [checked, setChecked] = useState(true);
    const dispatch: Dispatch<any> = useDispatch();
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = users.students.length;
    const parents: IUser[] = users.parents;
    let user: IUser | null = users.selectedUser;
    console.log(user)
    if (!user || user === null) {
        user = { id: 0, username: "", email: "", password: "", status: "", firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: 0 };
    }

    let parent: IUser | undefined = parents.find((value) => user !== null && value.id === user.id)
    let parent_name: string = ""
    if (typeof parent !== undefined && parent !== undefined){
        parent_name = parent.firstName + " " + parent.lastName
    }
    
    useEffect(() => {
        dispatch(updateCurrentPath("Học sinh", ""));
    }, [path.area, dispatch]);

    function onUserSelect(user: IUser): void {
        dispatch(changeSelectedUser(user));
        dispatch(setModificationState(UserModificationStatus.None));
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Học sinh</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="LỚP ĐANG HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
                <TopCard title="LỚP ĐÃ HỌC" text={`${numberItemsCount}`} icon="box" class="primary" />
            </div>

            <div className="row">
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="infor_student" onClick={() => {
                        if (checked === false) {
                            setChecked(true)
                        }
                    }} style={{
                        color: checked ? "#F24E1E" : "#2F4F4F"
                    }}>Thông tin học sinh</h6>
                    <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
                        backgroundColor: checked ? "#F24E1E" : "#ffffff"
                    }}></div>
                </div>
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="history_student" onClick={() => {
                        if (checked === true) {
                            setChecked(false)
                        }
                    }}
                        style={{
                            color: checked ? "#2F4F4F" : "#F24E1E"
                        }}>Lịch sử học</h6>
                        <div style={{
                        height: "5px",
                        textAlign: "center",
                        margin: "auto",
                        width: "30%",
                        backgroundColor: checked ? "#ffffff" : "#F24E1E"
                    }}></div>
                </div>
            </div>

            {
                function () {
                    if (checked === true) {
                        return (
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card shadow mb-4">
                                        <div className="card-body">
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6 text-center">
                                                    <img className="img-profile" id="img-profile" alt=""
                                                        src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Tên đăng nhập"
                                                            placeholder={user.username} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Ngày sinh"
                                                            placeholder={user.dateOfBirth} />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Giới tính"
                                                            placeholder={user.sex} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Số điện thoại"
                                                            placeholder={user.phone} />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Địa chỉ"
                                                            placeholder={user.address} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                <div className="form-group col-md-6">
                                                        <TextInput id="input_email"
                                                            value={''}
                                                            field="name"
                                                            onChange={()=>{}}
                                                            required={true}
                                                            maxLength={20}
                                                            label="Phụ huynh"
                                                            placeholder={parent_name} />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-green">Lịch sử học</h6>
                                        </div>
                                        <div className="card-body">
                                            <HistoryStudent
                                                onSelect={onUserSelect}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }()
            }
        </Fragment >
    );
};

export default DetailStudent;
