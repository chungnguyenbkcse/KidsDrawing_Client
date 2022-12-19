import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IStudentLeaveState, IUserState, ISectionState, IAnonymousNotificationState, IChildsClassState, ISectionTeacherState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import TextInput from "../../common/components/TextInput";
import { addStudentLeaveNotApprovedNow, editStudentLeaveNotApproved } from "../../store/actions/student_leave.action";
import { OnChangeModel, IStudentLeaveForParentFormState } from "../../common/types/Form.types";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { toast } from "react-toastify";
import { IUser } from "../../store/models/user.interface";
import { IStudentLeave, StudentLeaveModificationStatus } from "../../store/models/student_leave.interface";
import { postStudentLeave } from "../../common/service/StudentLeave/PostStudentLeave";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import { putStudentLeave } from "../../common/service/StudentLeave/PutStudentLeaveStudent";
import { putStudentLeaveParent } from "../../common/service/StudentLeave/PutStudentLeaveByParent";
import { postStudentLeaveByParent } from "../../common/service/StudentLeave/PostStudentLeaveByParent";
import { deleteStudentLeave1 } from "../../common/service/StudentLeave/DeleteStudentLeave1";

export type artAgeListProps = {
    isCheck: (value: boolean) => void;
    children?: React.ReactNode;
    data?: any;
};

type Option1 = {
    name: string;
    value: any;
}


function RequestOffSectionForm(props: artAgeListProps): JSX.Element {
    const dispatch: Dispatch<any> = useDispatch();
    const studentleaves: IStudentLeaveState | null = useSelector((state: IStateType) => state.student_leaves);
    let student_leave: IStudentLeave | null = studentleaves.selectedStudentLeave;
    const anonymous_notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    const isCreate: boolean = (anonymous_notifications.modificationState === AnonymousNotificationModificationStatus.Create);
    const isView: boolean = (anonymous_notifications.modificationState === AnonymousNotificationModificationStatus.Remove);
    const childs_classes: IChildsClassState = useSelector((state: IStateType) => state.childs_classes);

    var id_z = localStorage.getItem('section_id');
    var section_id: number = 0;
    if (id_z !== null) {
        section_id = parseInt(id_z);
    }

    var id_k = localStorage.getItem('section_number');
    var section_number: number = 0;
    if (id_k !== null) {
        section_number = parseInt(id_k);
    }

    var id_h = localStorage.getItem('resson');
    var resson = "";
    if (id_h !== null) {
        resson = (id_h);
    }

    var id_i = localStorage.getItem('classes_id');
    var classes_id: number = 0;
    if (id_i !== null) {
        classes_id = parseInt(id_i);
    }    

    var id_h = localStorage.getItem('student_id');
    var student_id: number = 0;
    if (id_h !== null) {
        student_id = parseInt(id_h);
    }

    var id_d = localStorage.getItem('student_name');
    var student_name: string = "";
    if (id_d !== null) {
        student_name = (id_d);
    }

    if (isCreate){
        student_leave = { id: 0, time_approved: "", section_id: 0, class_id: 0, section_number: 0, student_id: 0, description: "", section_name: "", class_name: "", student_name: "", reviewer_id: 0, status: "", create_time: "", update_time: "" }
    }
    else {
        student_leave = { id: 0, time_approved: "", section_id: section_id, class_id: classes_id, section_number: section_number, student_id: student_id, description: resson, section_name: "", class_name: "", student_name: student_name, reviewer_id: 0, status: "", create_time: "", update_time: "" }
    }
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const listStudent: IUser[] = users.students
    const listStudents: Option1[] = [];
    const sections: ISectionTeacherState | null = useSelector((state: IStateType) => state.section_teachers);

    listStudent.map((ele) => {
        let item: Option1 = { "name": ele.username, "value": ele.id }
        return listStudents.push(item)
    })

    var id_y = localStorage.getItem('class_id');
    let class_id = 0;
    if (id_y !== null) {
        class_id = parseInt(id_y);
    }

    var id_z = localStorage.getItem('total_section_end');
    var total_section_end: number = 0;
    if (id_z !== null) {
        total_section_end = parseInt(id_z);
    }

    const listSectionNumbers: number[] = []
    const listSections: Option1[] = [];
    sections.sections.map((ele) => {
        if (ele.number > total_section_end) {
            let item: Option1 = { "name": "Buổi " + ele.number, "value": ele.id }
            listSectionNumbers.push(ele.number)
            return listSections.push(item)
        }
        else {
            return null
        }
        
    })

    const listChildClasses: Option1[] = [];
    childs_classes.childs_class.map((ele, idx) => {
        let item: Option1 = {"name": ele.student_name, "value": ele.student_id}
        return listChildClasses.push(item);
    })

    let section_ele: Option1 = {
        name: "Buổi " + student_leave.section_number,
        value: student_leave.section_id
    }

    let section_numberx = student_leave.section_number;
    let student_namex = student_leave.student_name;


    const [formState, setFormState] = useState({
        section_id: { error: "", value: student_leave.section_id },
        description: { error: "", value: student_leave.description },
        student_id: { error: "", value: student_leave.student_id}
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
        let saveUserFn: Function = isCreate ?  addStudentLeaveNotApprovedNow :  editStudentLeaveNotApproved;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: IStudentLeaveForParentFormState, saveFn: Function): void {
        if (student_leave) {
            const id = toast.loading("Đang gửi yêu cầu. Vui lòng đợi trong giây lát...", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000
            });


            if (saveFn === editStudentLeaveNotApproved) {
                dispatch(deleteStudentLeave1(student_leave.section_id, student_id,{
                    section_id: formState.section_id.value,
                    student_id: formState.student_id.value,
                    description: formState.description.value
                }, id))
            }
            else {
                dispatch(postStudentLeaveByParent({
                    section_id: formState.section_id.value,
                    student_id: formState.student_id.value,
                    description: formState.description.value
                }, id))
            }

            console.log({
                section_id: formState.section_id.value,
                student_id: formState.student_id.value,
                description: formState.description.value
            })
        }
    }

    function cancelForm(): void {
        props.isCheck(false);
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.description.error || !formState.description.value) as boolean;
    }

    if ((isCreate === false)) {
        if (listSectionNumbers.includes(section_numberx) && isView === false) {
            return (
                <Fragment>
                    <div className="row text-left">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card" id="topcard-user">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Gửi yêu cầu nghỉ học</h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={saveUser}>
                                        <div className="form-group">
                                            <SelectKeyValue
                                                id="input_section_id"
                                                field="section_id"
                                                label="Buổi học"
                                                options={listSections}
                                                required={true}
                                                onChange={hasFormValueChanged}
                                                value={formState.section_id.value}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <SelectKeyValue
                                                id="input_student_id"
                                                field="student_id"
                                                label="Học sinh"
                                                options={listChildClasses}
                                                required={true}
                                                onChange={hasFormValueChanged}
                                                value={student_leave.student_id}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <TextInput id="input_description"
                                                field="description"
                                                value={formState.description.value}
                                                onChange={hasFormValueChanged}
                                                required={false}
                                                type="textarea"
                                                maxLength={100}
                                                label="Lý do"
                                                placeholder="" />
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
        }
        else {
            return (
                <Fragment>
                    <div className="row text-left">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card" id="topcard-user">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Gửi yêu cầu nghỉ học</h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={saveUser}>
                                        <div className="form-group">
                                            <TextInput id="input_section_id"
                                                field="section_id"
                                                label="Buổi học"
                                                value={section_ele.name}
                                                onChange={hasFormValueChanged}
                                                required={false}
                                                type="textarea"
                                                maxLength={100}
                                                placeholder="" 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <TextInput id="input_student_id"
                                                field="student_id"
                                                label="Học sinh"
                                                value={student_leave.student_name}
                                                onChange={hasFormValueChanged}
                                                required={false}
                                                type="textarea"
                                                maxLength={100}
                                                placeholder="" 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <TextInput id="input_description"
                                                field="description"
                                                value={formState.description.value}
                                                onChange={hasFormValueChanged}
                                                required={false}
                                                type="textarea"
                                                maxLength={100}
                                                label="Lý do"
                                                placeholder="" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }

    return (
        <Fragment>
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card" id="topcard-user">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Gửi yêu cầu nghỉ học</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveUser}>
                                <div className="form-group">
                                    <SelectKeyValue
                                        id="input_section_id"
                                        field="section_id"
                                        label="Buổi học"
                                        options={listSections}
                                        required={true}
                                        onChange={hasFormValueChanged}
                                        value={formState.section_id.value}
                                    />
                                </div>
                                <div className="form-group">
                                    <SelectKeyValue
                                        id="input_student_id"
                                        field="student_id"
                                        label="Học sinh"
                                        options={listChildClasses}
                                        required={true}
                                        onChange={hasFormValueChanged}
                                        value={formState.student_id.value}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextInput id="input_description"
                                        field="description"
                                        value={formState.description.value}
                                        onChange={hasFormValueChanged}
                                        required={false}
                                        type="textarea"
                                        maxLength={100}
                                        label="Lý do"
                                        placeholder="" />
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

export default RequestOffSectionForm;
