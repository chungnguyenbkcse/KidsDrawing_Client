import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IMyClassState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IMyClass, MyClassModificationStatus } from "../../store/models/my_class.interface";
import TextInput from "../../common/components/TextInput";
import { editMyClass, clearSelectedMyClass, setModificationState, addMyClass } from "../../store/actions/my_class.action";
import { addNotification } from "../../store/actions/notifications.action";
import SelectInput from "../../common/components/Select";
import { OnChangeModel, IArtTypeFormState } from "../../common/types/Form.types";
import { putMyClass } from "../../common/service/MyClass/PutMyClass";
import { toast } from "react-toastify";

export type semesterClassListProps = {
  isCheck: (value: boolean) => void;
  children?: React.ReactNode;
};

function  ClassForm (props: semesterClassListProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const products: IMyClassState | null = useSelector((state: IStateType) => state.myclasses);
  let product: IMyClass | null = products.selectedMyClass;
  const isCreate: boolean = (products.modificationState === MyClassModificationStatus.Create);
  
  if (!product || isCreate) {
    product = { id: 0, name: "", create_time: "", user_register_teach_semester: 0, update_time: "", security_code: "" };
  }

  const [formState, setFormState] = useState({
    name: { error: "", value: product.name }
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addMyClass : editMyClass;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: any, saveFn: Function): void {
    if (product) {
      const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
        position: toast.POSITION.TOP_CENTER
      });
      putMyClass(dispatch, product.id, {
        name: formState.name.value
      }, idx)
      dispatch(clearSelectedMyClass());
      dispatch(setModificationState(MyClassModificationStatus.None));
      props.isCheck(false);
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(MyClassModificationStatus.None));
    props.isCheck(false);
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return ( formState.name.error || !formState.name.value ) as boolean;
}

  return (
    <Fragment>
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow shadow-xx">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} lớp học</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-group col-md-12">
                  <TextInput id="input_name"
                    field = "name"
                    value={formState.name.value}
                    onChange={hasFormValueChanged}
                    required={false}
                    maxLength={100}
                    label="Tên"
                    placeholder="" />           
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

export default ClassForm;
