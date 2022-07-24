import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IArtLevelState } from "../../store/models/root.interface";
import { IArtLevel, ArtLevelModificationStatus } from "../../store/models/art_level.interface";
import { useHistory } from "react-router-dom";
import { setModificationStateArtLevel } from "../../store/actions/art_level.action";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";

export type artLevelListProps = {
  onSelect?: (art_level: IArtLevel) => void;
  value?: string;
  children?: React.ReactNode;
};

function ArtLevelList(props: artLevelListProps): JSX.Element  {
  const dispatch: Dispatch<any> = useDispatch();
  const art_levels: IArtLevelState = useSelector((state: IStateType) => state.art_levels);
  const history = useHistory();
  console.log(props.value)


  const artLevelElements: (JSX.Element | null)[] = art_levels.artLevels.filter((val) => {
    if (props.value == ""){
      return val;
    }
    else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))){
      return val;
    }
    }).map((art_level, index) => {
    //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
    if (!art_level) { return null; }
    return (<tr className={`table-row ${(art_levels.selectedArtLevel && art_levels.selectedArtLevel.id === art_level.id) ? "selected" : ""}`}
      key={`art_level_${art_level.id}`}>
      <th scope="row">{index + 1}</th>
      <td>{art_level.name}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={()=> {
          if(props.onSelect) props.onSelect(art_level);
          dispatch(setModificationStateArtLevel(ArtLevelModificationStatus.Edit))
        }}>Chỉnh sửa</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() =>{
          if(props.onSelect) props.onSelect(art_level);
          dispatch(setModificationStateArtLevel(ArtLevelModificationStatus.Remove))
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
            <th scope="col">Tên</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {artLevelElements}
        </tbody>
      </table>
    </div>
    </Fragment> 
  );
}

export default ArtLevelList;
