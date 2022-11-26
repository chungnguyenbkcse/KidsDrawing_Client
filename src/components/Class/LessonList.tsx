import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IProductState, ITimeScheduleState, ISectionState } from "../../store/models/root.interface";
import { IProduct } from "../../store/models/product.interface";
import { useHistory } from "react-router-dom";
import { ISection } from "../../store/models/section.interface";

export type productListProps = {
  onSelect?: (product: IProduct) => void;
  children?: React.ReactNode;
};


function LessonList(props: productListProps): JSX.Element  {

  const time_schedules: ITimeScheduleState = useSelector((state: IStateType) => state.time_schedules);
  const sections: ISectionState = useSelector((state: IStateType) => state.sections);
  const history = useHistory();
  
  const routeChange = (section: ISection) =>{ 
    let path = '/class/lesson'; 
    localStorage.setItem('section_id', section.id.toString())
    history.push(path);
  }


  let data: string[] = []
    let list_link_record: string[] = []
    let total_time = "";
    let check_active: string[] = [];

    if (time_schedules.timeSchedules.length > 1) {
            if (time_schedules.timeSchedules[0] !== undefined && time_schedules.timeSchedules[0] !== null){
                var start_time_0 = time_schedules.timeSchedules[0].start_time.split("T");
                var end_time_0 = time_schedules.timeSchedules[0].end_time.split("T");
                var hour_start = parseInt(start_time_0[1].substring(0, 2));
                var minus_tart = parseInt(start_time_0[1].substring(3, 5));
                var sercon_start = parseInt(start_time_0[1].substring(6, 8));
                var hour_end = parseInt(end_time_0[1].substring(0, 2));
                var minus_end = parseInt(end_time_0[1].substring(3, 5));
                var sercon_end = parseInt(end_time_0[1].substring(6, 8));
    
                total_time = (hour_end - hour_start).toString() + " giờ " + (minus_end - minus_tart).toString() + " phút " + (sercon_end - sercon_start).toString() + " giây";
                time_schedules.timeSchedules.map((ele, index) => {
                    var start_date = new Date(ele.start_time);
                    var end_date = new Date(ele.end_time);
                    const link = "https://recording-jitsi-chung.s3.ap-southeast-1.amazonaws.com/recording/"
                    const class_id = 1;
                    const days = ele.end_time;
                    let str = link + class_id.toString() + "_" + days.slice(0,10) + ".mp4";
                    list_link_record.push(str);
                    // Do your operations
                    var date_now   = new Date();

                    if (( start_date.getTime() - date_now.getTime()) / 1000 > 86400) {
                        check_active.push('Chưa diễn ra');
                    }
                    else if ((start_date.getTime() - date_now.getTime()) / 1000 < 86400 && (date_now.getTime() - start_date.getTime()) / 1000 < 0) {
                        check_active.push('Chuẩn bị diễn ra');
                    }
                    else if ((date_now.getTime() - start_date.getTime()) / 1000 > 0 && (end_date.getTime() - date_now.getTime()) / 1000 > 0) {
                        check_active.push('Đang diễn ra');
                    }
                    else {
                        check_active.push('Đã diễn ra');
                    }

                    var start_time = ele.start_time.split("T");
                    var end_time = ele.end_time.split("T");
                    return data.push("Từ " + start_time[0] + " " + start_time[1] + " -> " + end_time[0] + " " + end_time[1])
                })
            }
    }

    function checkActive(index: number) {
        if (check_active[index] === "Chưa diễn ra") {
            return "not_active_now";
        }
        else if (check_active[index] === "Chuẩn bị diễn ra") {
            return 'pre_active_now';
        }
        else if (check_active[index] === "Đang diễn ra") {
            return 'active_now';
        }
        else {
            return "not_active";
        }
    }


    const productElements = sections.sections.sort((a, b) => a.number - b.number).map((product, index) => {
      if (product === null) return null
      if (checkActive(index) === "not_active_now"){
          return (
            <tr className={`table-row`}
              key={`product_${product.id}`}>
              <td>{product.number}</td>
              <td>{product.name}</td>
              <td>{product.teacher_name}</td>
              <td>Chưa diễn ra</td>
              <td>
              </td>
            </tr>
          );
        }
      else if (checkActive(index) === "pre_active_now") {
        return (
          <tr className={`table-row`}
            key={`product_${product.id}`}>
            <td>{product.number}</td>
            <td>{product.name}</td>
            <td>{product.teacher_name}</td>
            <td>Chuẩn bị diễn ra</td>
            <td></td>
          </tr>
        );
      }
      else if (checkActive(index) === "active_now") {
        return (
          <tr className={`table-row`}
            key={`product_${product.id}`}>
            <td>{product.number}</td>
            <td>{product.name}</td>
            <td>{product.teacher_name}</td>
            <td>Đang diễn ra</td>
            <td></td>
          </tr>
        );
      }
      else {
        return (
          <tr className={`table-row`}
            key={`product_${product.id}`}>
            <td>{product.number}</td>
            <td>{product.name}</td>
            <td>{product.teacher_name}</td>
            <td>Đã diễn ra</td>
            <td>
              {
                product.teach_form == true ? <button type="button" className="btn btn-primary" onClick={() => {
                  localStorage.setItem('link_recording', list_link_record[index])
                  routeChange(product)
                  }} >Recording</button> : ""
              }
            </td>
          </tr>
        );
      }
    });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Buổi số</th>
            <th scope="col">Tên buổi học</th>
            <th scope="col">Giáo viên</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
    </div>

  );
}

export default LessonList;
