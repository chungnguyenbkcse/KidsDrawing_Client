import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IArtTypeState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IArtType, ArtTypeModificationStatus } from "../../store/models/art_type.interface";
import TextInput from "../../common/components/TextInput";
import { editArtType, clearSelectedArtType, setModificationState, addArtType } from "../../store/actions/art_type.action";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, IArtTypeFormState } from "../../common/types/Form.types";
import { postArtType } from "../../common/service/ArtType/PostArtType";
import { putArtType } from "../../common/service/ArtType/PutArtType";

export type artTypeListProps = {
  isCheck: (value: boolean) => void;
  children?: React.ReactNode;
};

function TeachTypeForm(props: artTypeListProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const art_types: IArtTypeState | null = useSelector((state: IStateType) => state.art_types);
  let art_type: IArtType | null = art_types.selectedArtType;
  const isCreate: boolean = (art_types.modificationState === ArtTypeModificationStatus.Create);
  
  if (!art_type || isCreate) {
    art_type = { id: 0, name: "", description: "" };
  }

  const [formState, setFormState] = useState({
    name: { error: "", value: art_type.name },
    description: { error: "", value: art_type.description },
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

    let saveUserFn: Function = (isCreate) ? addArtType : editArtType;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IArtTypeFormState, saveFn: Function): void {
    if (art_type) {
      dispatch(saveFn({
        ...art_type,
        name: formState.name.value,
        description: formState.description.value,
      }));

      if (saveFn == addArtType) {
        dispatch(postArtType({
          name: formState.name.value,
          description: formState.description.value
        }))
      }

      else if (saveFn == editArtType) {
        dispatch(putArtType(art_type.id, {
          name: formState.name.value,
          description: formState.description.value
        }))
      }

      dispatch(addNotification("Thể loại ", `${formState.name.value} chỉnh bởi bạn`));
      dispatch(clearSelectedArtType());
      dispatch(setModificationState(ArtTypeModificationStatus.None));
    }
  }

  function cancelForm(): void {
    props.isCheck(false);
    dispatch(setModificationState(ArtTypeModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.name.error|| !formState.name.value) as boolean;
}

  return (
    <Fragment>
      <div className="row text-left">
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} thể loại</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-group">
                  <TextInput id="input_email"
                    value={formState.name.value}
                    field="name"
                    onChange={hasFormValueChanged}
                    required={true}
                    maxLength={20}
                    label="Tên"
                    placeholder="" />
              </div>
              <div className="form-group">
                  <TextInput id="input_description"
                  field = "description"
                    value={formState.description.value}
                    onChange={hasFormValueChanged}
                    required={false}
                    maxLength={100}
                    label="Miêu tả"
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

export default TeachTypeForm;
