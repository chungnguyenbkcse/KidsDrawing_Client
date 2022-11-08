import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IStudentLeaveState, IUserState, ISectionState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import TextInput from "../../common/components/TextInput";
import { addStudentLeaveNotApprovedNow } from "../../store/actions/student_leave.action";
import { OnChangeModel, IStudentLeaveFormState } from "../../common/types/Form.types";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { toast } from "react-toastify";
import { IUser } from "../../store/models/user.interface";
import { IStudentLeave, StudentLeaveModificationStatus } from "../../store/models/student_leave.interface";
import { postStudentLeave } from "../../common/service/StudentLeave/PostStudentLeave";

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
    const isCreate: boolean = (studentleaves.modificationState === StudentLeaveModificationStatus.Create);
    
    if (!student_leave || isCreate){
        student_leave = { id: 0, section_id: 0, class_id: 0, section_number: 0, student_id: 0, description: "", section_name: "", class_name: "", student_name: "", reviewer_id: 0, status: "", create_time: "", update_time: "" }
    }
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const listStudent: IUser[] = users.students
    const listStudents: Option1[] = [];
    const sections: ISectionState | null = useSelector((state: IStateType) => state.sections);

    listStudent.map((ele) => {
        let item: Option1 = { "name": ele.username, "value": ele.id }
        return listStudents.push(item)
    })

    const listSections: Option1[] = [];
    sections.sections.map((ele) => {
        let item: Option1 = { "name": "Buổi " + ele.number, "value": ele.id }
        return listSections.push(item)
    })

    var id_y = localStorage.getItem('class_id');
    let class_id = 0;
    if (id_y !== null) {
        class_id = parseInt(id_y);
    }

    var id_x = localStorage.getItem('id');
    var student_id: number = 0;
    if (id_x !== null) {
        student_id = parseInt(id_x);
    }


    const [formState, setFormState] = useState({
        section_id: { error: "", value: student_leave.section_id },
        description: { error: "", value: student_leave.description },
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
        let saveUserFn: Function = addStudentLeaveNotApprovedNow;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: IStudentLeaveFormState, saveFn: Function): void {
        if (student_leave) {
            const id = toast.loading("Đang gửi yêu cầu. Vui lòng đợi trong giây lát...", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });

            dispatch(postStudentLeave({
                section_id: formState.section_id.value,
                student_id: student_id,
                classes_id: class_id,
                description: formState.description.value
            }, id))

            console.log({
                section_id: formState.section_id.value,
                student_id: student_id,
                classes_id: class_id,
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
