import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, IScheduleState, IScheduleItemState, ILessonState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISchedule, ScheduleModificationStatus } from "../../store/models/schedule.interface";
import TextInput from "../../common/components/TextInput";
import { editSchedule, clearSelectedSchedule, setModificationState, addSchedule } from "../../store/actions/schedule.action";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import { OnChangeModel, IScheduleFormState, ScheduleItem } from "../../common/types/Form.types";
import { postSchedule } from "../../common/service/Schedule/PostSchedule";
import { putSchedule } from "../../common/service/Schedule/PutSchedule";
import { ILesson } from "../../store/models/lesson.interface";
import SelectKeyValueMutiple from "../../common/components/SelectKeyValueMutiple";
import { putScheduleItem } from "../../common/service/ScheduleItem/PutScheduleItem";

export type scheduleListProps = {
    isCheck: (value: boolean) => void;
    children?: React.ReactNode;
};

type Options = {
    name: string;
    value: any;
}

type Option1s = {
    key: number;
    value: number;
}

function ScheduleForm(props: scheduleListProps): JSX.Element {

    const dispatch: Dispatch<any> = useDispatch();
    const schedules: IScheduleState | null = useSelector((state: IStateType) => state.schedules);
    let schedule: ISchedule | null = schedules.selectedSchedule;
    const schedule_items: IScheduleItemState | null = useSelector((state: IStateType) => state.schedule_items);
    const isCreate: boolean = (schedules.modificationState === ScheduleModificationStatus.Create);

    if (!schedule || isCreate) {
        schedule = { id: 0, name: "", creator_id: 0, create_time: "", update_time: "" };
    }
    let shedule_id = schedule.id
    //const [schedule_items_list, setSchedule_items_list] = useState<IScheduleItem>([])
    console.log(shedule_id)

    let total = schedule_items.schedule_items.filter((value) => value.schedule_id === shedule_id).length
    console.log(schedule_items.schedule_items)
    let schedule_items_list = schedule_items.schedule_items.filter((value) => value.schedule_id === shedule_id)
    const listScheduleItem: ScheduleItem[] = []

    const [formState, setFormState] = useState({
        creator_id: { error: "", value: schedule.creator_id },
        name: { error: "", value: schedule.name },
        total_date_of_week: { error: "", value: total },
        list_schedule_item: { error: "", value: listScheduleItem }
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
        //console.log(formState)
    }

    const [listScheduleItemId, setListScheduleItemId] = useState<Option1s[]>([])
    const [listLessonId, setListLessonId] = useState<Option1s[]>([])
    useEffect(() => {
        let res_1: Option1s[] = []
        if (total > 0){
            for (let index = 0; index < total; index++) {
                let date_of_week_obj: Option1s = {
                    key: index,
                    value: schedule_items_list[index].date_of_week
                }
                let lesson_time_obj: Option1s = {
                    key: index,
                    value: schedule_items_list[index].lesson_time
                }
                res_1.push(date_of_week_obj)
                listScheduleItemId.push(date_of_week_obj)
                listLessonId.push(lesson_time_obj)
                //console.log(listScheduleItemId)
                //setListScheduleItemId([...listScheduleItemId, date_of_week_obj])
                //setListLessonId([...listLessonId, lesson_time_obj])
            }
        }
        setListScheduleItemId([...listScheduleItemId])
        setListLessonId([...listLessonId])
    
    }, [total])
    function hasFormMutipleValueChanged1(value: number, index: number) {
        if (listScheduleItemId.length === 0){
            setListScheduleItemId([...listScheduleItemId, {"key": index, "value": value}])
        }
        else {
            let is_check = false
            for (let idx = 0; idx < listScheduleItemId.length; idx++) {
                if (listScheduleItemId[idx].key === index) {
                    if (listScheduleItemId[idx].value !== value){
                        is_check = true
                        setListScheduleItemId([...listScheduleItemId.filter((item, idx) => item.key !== index), {"key": index, "value": value}])
                    }
                    break
                }
                
            }

            if (is_check === false) {
                setListScheduleItemId([...listScheduleItemId, {"key": index, "value": value}])
            }
        }
    }

    console.log(listScheduleItemId)

    function hasFormMutipleValueChanged2(value: number, index: number) {
        if (listLessonId.length === 0){
            setListLessonId([...listLessonId, {"key": index, "value": value}])
        }
        else {
            let is_check = false
            for (let idx = 0; idx < listLessonId.length; idx++) {
                if (listLessonId[idx].key === index) {
                    if (listLessonId[idx].value !== value){
                        is_check = true
                        setListLessonId([...listLessonId.filter((item, idx) => item.key !== index), {"key": index, "value": value}])
                    }
                    break
                }
                
            }

            if (is_check === false) {
                setListLessonId([...listLessonId, {"key": index, "value": value}])
            }
        }
    }

    console.log(listLessonId)

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }


        let saveUserFn: Function = (isCreate) ? addSchedule : editSchedule;
        props.isCheck(false);
        saveForm(formState, saveUserFn);
    }

    //console.log(formState)

    function saveForm(formState: IScheduleFormState, saveFn: Function): void {
        if (schedule) {
            dispatch(saveFn({
                ...schedule,
                name: formState.name.value,
            }));

            let lesson_times: Option1s[] = listLessonId.filter((value, index) => value.key < formState.total_date_of_week.value)
            let date_of_weeks: Option1s[] = listScheduleItemId.filter((value, index) => value.key < formState.total_date_of_week.value)

            if (saveFn === addSchedule){
                dispatch(postSchedule(date_of_weeks, lesson_times, {
                    creator_id: localStorage.getItem('id'),
                    name: formState.name.value
                }));
            }

            else if (saveFn === editSchedule){
                dispatch(putSchedule(schedule.id,{
                    creator_id: localStorage.getItem('id'),
                    name: formState.name.value
                }));

                for (let idx = 0; idx < date_of_weeks.length; idx++) {
                    for (let index = 0; index < lesson_times.length; index++) {
                        if (date_of_weeks[idx].key === lesson_times[index].key){
                            dispatch(putScheduleItem(schedule_items_list[idx].id,{
                                schedule_id: localStorage.getItem('schedule_id'),
                                lesson_time: lesson_times[index].value,
                                date_of_week: date_of_weeks[idx].value
                            }))
                            break
                        }
                    }
                }
            }


            //console.log(formState.total_date_of_week)
            dispatch(addNotification("Lịch học ", `${formState.name.value} chỉnh bởi bạn`));
            dispatch(clearSelectedSchedule());
            dispatch(setModificationState(ScheduleModificationStatus.None));
        }
    }

    function cancelForm(): void {
        props.isCheck(false);
        dispatch(setModificationState(ScheduleModificationStatus.None));
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.name.error || formState.total_date_of_week.error
            || !formState.name.value || !formState.total_date_of_week.value) as boolean;
    }

    const list_date_of_week: Options[] = [
        {
            "name": "Thứ 2",
            "value": 2
        },
        {
            "name": "Thứ 3",
            "value": 3
        },
        {
            "name": "Thứ 4",
            "value": 4
        },
        {
            "name": "Thứ 5",
            "value": 5
        },
        {
            "name": "Thứ 6",
            "value": 6
        },
        {
            "name": "Thứ 7",
            "value": 7
        }
    ];

    const lesson_times: ILessonState = useSelector((state: IStateType) => state.lessons);
    const list_lesson: ILesson[] = lesson_times.lessons
    const list_lessons: Options[] = [];
    list_lesson.map((ele) => {
        let item: Options = { "name": ele.start_time + " - " + ele.end_time, "value": ele.id }
        return list_lessons.push(item)
    })

    console.log(schedule_items_list)

    return (
        <Fragment>
            <div className="row text-left">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} lịch học</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveUser}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <TextInput id="input_name"
                                            field="name"
                                            value={formState.name.value}
                                            onChange={hasFormValueChanged}
                                            required={false}
                                            maxLength={100}
                                            label="Tên"
                                            placeholder="" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <NumberInput id="input_total_date_of_week"
                                            value={formState.total_date_of_week.value}
                                            field="total_date_of_week"
                                            onChange={hasFormValueChanged}
                                            max={3}
                                            min={0}
                                            label="Tổng số ngày học trong tuần"
                                        />
                                    </div>
                                </div>
                                {
                                    Array.from(Array(formState.total_date_of_week.value).keys()).map((value, index) => {
                                        return (
                                            <div className="form-row" key={index}>
                                                <div className="form-group col-md-6">
                                                    <SelectKeyValueMutiple 
                                                        value={isCreate ? 0 : schedule_items_list[index].date_of_week}
                                                        index={index}
                                                        inputClass={`schedule_item_date_of_week_${index}`}
                                                        onChange={hasFormMutipleValueChanged1}
                                                        required={true}
                                                        label="Thứ trong tuần"
                                                        options={list_date_of_week}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <SelectKeyValueMutiple 
                                                        value={isCreate ? 0 : schedule_items_list[index].lesson_time}
                                                        inputClass={`schedule_item_lesson_time_${index}`}
                                                        index={index}
                                                        onChange={hasFormMutipleValueChanged2}
                                                        required={true}
                                                        label="Tiết"
                                                        options={list_lessons}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }

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

export default ScheduleForm;
