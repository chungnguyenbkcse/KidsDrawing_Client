import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IArtTypeState } from "../../store/models/root.interface";
import { IArtType, ArtTypeModificationStatus } from "../../store/models/art_type.interface";
import { setModificationState } from "../../store/actions/art_type.action";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";

export type artTypeListProps = {
  onSelect?: (art_type: IArtType) => void;
  value?: string;
  children?: React.ReactNode;
};

function ArtTypeList(props: artTypeListProps): JSX.Element  {
  const dispatch: Dispatch<any> = useDispatch();
  const art_types: IArtTypeState = useSelector((state: IStateType) => state.art_types);
  console.log(art_types)
  console.log(art_types)


  const artTypeElements: (JSX.Element | null)[] = art_types.artTypes.filter((val) => {
    if (props.value === ""){
      return val;
    }
    else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))){
      return val;
    }
    return null
    }).map((art_type, index) => {
    //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
    if (!art_type) { return null; }
    return (<tr className={`table-row ${(art_types.selectedArtType && art_types.selectedArtType.id === art_type.id) ? "selected" : ""}`}
      key={`art_type_${art_type.id}`}>
      <th scope="row">{index + 1}</th>
      <td>{art_type.name}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={()=> {
          if(props.onSelect) props.onSelect(art_type);
          dispatch(setModificationState(ArtTypeModificationStatus.Edit))
        }}>Chỉnh sửa</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() =>{
          if(props.onSelect) props.onSelect(art_type);
          dispatch(setModificationState(ArtTypeModificationStatus.Remove))
        }}>Xóa</button>
      </td>
    </tr>);
  });


  return (
    <Fragment>
      <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Thời gian bắt đầu</th>
            <th scope="col">Thời gian kết thúc</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {artTypeElements}
        </tbody>
      </table>
    </div>
    </Fragment> 
  );
}

export default ArtTypeList;
