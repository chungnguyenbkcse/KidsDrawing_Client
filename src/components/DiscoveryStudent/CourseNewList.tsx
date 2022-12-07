import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import TopCardCourseNew from "../../common/components/TopCardCourseNew";
import { ICourseNewState, IStateType } from "../../store/models/root.interface";


function CourseNewList(): JSX.Element {
  const course_news: ICourseNewState = useSelector((state: IStateType) => state.course_news);


    const teacherRegisterQuantificationElements: (JSX.Element | null)[] = course_news.course_news.map((ele, index) => {
        return (
            <TopCardCourseNew 
                id={ele.id}
                name= {ele.name}
                description = {ele.description}
                max_participant = {ele.max_participant}
                num_of_section = {ele.num_of_section}
                price = {ele.price}
                image_url = {ele.image_url}
                is_enabled = {ele.is_enabled}
                art_type_id = {ele.art_type_id}
                art_level_id = {ele.art_level_id}
                art_age_id = {ele.art_age_id}
                art_type_name = {ele.art_type_name}
                art_level_name = {ele.art_level_name}
                art_age_name = {ele.art_age_name}
                total = {ele.total}
                create_time = {ele.create_time}
                update_time = {ele.update_time}
            />
        );
    });


    return (
        <Fragment>
          {teacherRegisterQuantificationElements}
        </Fragment>
    );
}

export default CourseNewList;
