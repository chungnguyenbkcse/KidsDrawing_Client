import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IArtLevelState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IArtLevel, ArtLevelModificationStatus } from "../../store/models/art_level.interface";
import TextInput from "../../common/components/TextInput";
import { editArtLevel, clearSelectedArtLevel, setModificationStateArtLevel, addArtLevel } from "../../store/actions/art_level.action";
import { OnChangeModel, IArtLevelFormState } from "../../common/types/Form.types";
import { postArtLevel } from "../../common/service/ArtLevel/PostArtLevel";
import { putArtLevel } from "../../common/service/ArtLevel/PutArtLevel";
import { toast } from "react-toastify";

export type artLevelListProps = {
  isCheck: (value: boolean) => void;
  children?: React.ReactNode;
};

function TeachLevelForm(props: artLevelListProps): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const art_levels: IArtLevelState | null = useSelector((state: IStateType) => state.art_levels);
  let art_level: IArtLevel | null = art_levels.selectedArtLevel;
  const isCreate: boolean = (art_levels.modificationState === ArtLevelModificationStatus.Create);
  
  if (!art_level || isCreate) {
    art_level = { id: 0, name: "", description: "" };
  }

  const [formState, setFormState] = useState({
    name: { error: "", value: art_level.name },
    description: { error: "", value: art_level.description }
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

    let saveUserFn: Function = (isCreate) ? addArtLevel : editArtLevel;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IArtLevelFormState, saveFn: Function): void {
    if (art_level) {
      const id = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
        position: toast.POSITION.TOP_CENTER
      });
      
      if (saveFn === addArtLevel) {
        dispatch(postArtLevel({
          name: formState.name.value,
          description: formState.description.value
        }, id))
      }

      else if (saveFn === editArtLevel) {
        dispatch(putArtLevel(art_level.id, {
          name: formState.name.value,
          description: formState.description.value
        }, id))
      }

      dispatch(clearSelectedArtLevel());
      dispatch(setModificationStateArtLevel(ArtLevelModificationStatus.None));
    }
  }

  function cancelForm(): void {
    props.isCheck(false);
    dispatch(setModificationStateArtLevel(ArtLevelModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.name.error || !formState.name.value) as boolean;
}

  return (
    <Fragment>
      <div className="row text-left">
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{(isCreate ? "Tạo" : "Sửa")} trình độ</h6>
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

export default TeachLevelForm;
