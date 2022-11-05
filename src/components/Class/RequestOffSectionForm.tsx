import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ITeacherLeaveState, IUserState, ISectionState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import TextInput from "../../common/components/TextInput";
import { addLeaves } from "../../store/actions/teacher_leave.action";
import { OnChangeModel, ITeacherLeaveFormState } from "../../common/types/Form.types";
import SelectKeyValue from "../../common/components/SelectKeyValue";
import { toast, ToastContainer } from "react-toastify";
import { IUser } from "../../store/models/user.interface";
import { ITeacherLeave, TeacherLeaveModificationStatus } from "../../store/models/teacher_leave.interface";
import { postTeacherLeave } from "../../common/service/TeacherLeave/PostTeacherLeave";

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
    const teacherleaves: ITeacherLeaveState | null = useSelector((state: IStateType) => state.teacher_leaves);
    let teacher_leave: ITeacherLeave | null = teacherleaves.selectedTeacherLeave;
    const isCreate: boolean = (teacherleaves.modificationState === TeacherLeaveModificationStatus.Create);
    
    if (!teacher_leave || isCreate){
        teacher_leave = { id: "", section_id: "", class_id: "", section_number: 0, teacher_id: "", substitute_teacher_id: "", description: "", section_name: "", class_name: "", teacher_name: "", reviewer_id: "", status: "", substitute_teacher_name: "", create_time: "", update_time: "" }
    }
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const listTeacher: IUser[] = users.teachers
    const listTeachers: Option1[] = [];
    const sections: ISectionState | null = useSelector((state: IStateType) => state.sections);

    listTeacher.map((ele) => {
        let item: Option1 = { "name": ele.username, "value": ele.id }
        return listTeachers.push(item)
    })

    const listSections: Option1[] = [];
    sections.sections.map((ele) => {
        let item: Option1 = { "name": ele.name, "value": ele.id }
        return listSections.push(item)
    })

    var id_y = localStorage.getItem('class_id');
    let class_id = 0;
    if (id_y !== null) {
        class_id = parseInt(id_y);
    }

    var id_x = localStorage.getItem('id');
    var teacher_id: any = 0;
    if (id_x !== null) {
        teacher_id = id_x;
    }


    const [formState, setFormState] = useState({
        section_id: { error: "", value: teacher_leave.section_id },
        substitute_teacher_id: { error: "", value: teacher_leave.substitute_teacher_id },
        description: { error: "", value: teacher_leave.description },
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
        let saveUserFn: Function = addLeaves;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: ITeacherLeaveFormState, saveFn: Function): void {
        if (teacher_leave) {
            const id = toast.loading("Đang gửi yêu cầu. Vui lòng đợi trong giây lát...", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });

            dispatch(postTeacherLeave({
                section_id: formState.section_id.value,
                substitute_teacher_id: formState.substitute_teacher_id.value,
                teacher_id: teacher_id,
                classes_id: class_id,
                description: formState.description.value
            }, id))

            console.log({
                section_id: formState.section_id.value,
                substitute_teacher_id: formState.substitute_teacher_id.value,
                teacher_id: teacher_id,
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
            <ToastContainer />
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow shadow-xx">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Gửi yêu cầu nghỉ dạy</h6>
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
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <SelectKeyValue
                                            id="input_substitute_teacher_id"
                                            field="substitute_teacher_id"
                                            label="Giáo viên dạy thay"
                                            options={listTeachers}
                                            required={true}
                                            onChange={hasFormValueChanged}
                                            value={formState.substitute_teacher_id.value}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <TextInput id="input_description"
                                        field="description"
                                        value={formState.description.value}
                                        onChange={hasFormValueChanged}
                                        required={false}
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
