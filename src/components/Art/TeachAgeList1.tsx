import React, { Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IArtAgeState } from "../../store/models/root.interface";
import { IArtAge, ArtAgeModificationStatus } from "../../store/models/art_age.interface";
import { setModificationStateArtAge } from "../../store/actions/art_age.action";
import { toNonAccentVietnamese } from "../../common/components/ConvertVietNamese";

export type artAgeListProps = {
  onSelect?: (art_age: IArtAge) => void;
  value?: string;
  children?: React.ReactNode;
};

function ArtAgeList(props: artAgeListProps): JSX.Element  {
  const dispatch: Dispatch<any> = useDispatch();
  const art_ages: IArtAgeState = useSelector((state: IStateType) => state.art_ages);
  console.log(props.value)


  const artAgeElements: (JSX.Element | null)[] = art_ages.artAges.filter((val) => {
    if (props.value === ""){
      return val;
    }
    else if (typeof props.value !== 'undefined' && (toNonAccentVietnamese(val.name).toLowerCase().includes(props.value.toLowerCase()) || val.name.toLowerCase().includes(props.value.toLowerCase()))){
      return val;
    }
    return null
    }).map((art_age, index) => {
    //console.log(strDate.substring(0, 10) + " " + strDate.substring(11,19))
    if (!art_age) { return null; }
    return (<tr className={`table-row ${(art_ages.selectedArtAge && art_ages.selectedArtAge.id === art_age.id) ? "selected" : ""}`}
      key={`art_age_${art_age.id}`}>
      <th scope="row">{index + 1}</th>
      <td>{art_age.name}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={()=> {
          if(props.onSelect) props.onSelect(art_age);
          dispatch(setModificationStateArtAge(ArtAgeModificationStatus.Edit))
        }}>Chỉnh sửa</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={() =>{
          if(props.onSelect) props.onSelect(art_age);
          dispatch(setModificationStateArtAge(ArtAgeModificationStatus.Remove))
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
          {artAgeElements}
        </tbody>
      </table>
    </div>
    </Fragment> 
  );
}

export default ArtAgeList;
