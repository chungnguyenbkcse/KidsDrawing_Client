import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ITutorialState } from "../../store/models/root.interface";
import { ITutorial } from "../../store/models/tutorial.interface";

export type studentListProps = {
  onSelect?: (student: ITutorial) => void;
  children?: React.ReactNode;
};

function TutorialEditRequestList(props: studentListProps): JSX.Element  {
  const tutorials: ITutorialState = useSelector((state: IStateType) => state.tutorials);

  const studentElements: (JSX.Element | null)[] = tutorials.tutorials.map((student, index) => {
    if (!student) { return null; }
    return (<tr className={`table-row ${(tutorials.selectedTutorial && tutorials.selectedTutorial.id === student.id) ? "selected" : ""}`}
      key={`student_${student.id}`}>
      <th scope="row">{index +1}</th>
      <td>{student.name}</td>
      <td>{student.class_name}</td>
      <td>{student.section_number}</td>
      <td>{student.creator_name}</td>
      <td>{student.create_time}</td>
      <td>
        <button type="button" className="btn btn-primary">Chấp nhận</button>
      </td>
      <td>
        <button type="button" className="btn btn-danger">Xóa</button>
      </td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên giáo án</th>
            <th scope="col">Lớp</th>
            <th scope="col">Buổi</th>
            <th scope="col">Giáo viên</th>
            <th scope="col">Thời gian</th>
            <th scope="col">Hành động</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {studentElements}
        </tbody>
      </table>
    </div>

  );
}

export default TutorialEditRequestList;
