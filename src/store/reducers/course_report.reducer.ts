import { ICourseReportState, IActionBase } from "../models/root.interface";
import { ADD_COURSE_REPORT, CHANGE_COURSE_REPORT_PENDING_EDIT, EDIT_COURSE_REPORT, REMOVE_COURSE_REPORT,
    CLEAR_COURSE_REPORT_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_COURSE_REPORT, REMOVE_COURSE_REPORT_ALL} from "../actions/course_report.action";
import { ICourseReport, CourseReportModificationStatus } from "../models/course_report.interface";



const initialState: ICourseReportState = {
    modificationState: CourseReportModificationStatus.None,
    selectedCourseReport: null,
    course_reports: []
};

function course_reportsReducer(state: ICourseReportState = initialState, action: IActionBase): ICourseReportState {
    switch (action.type) {
        case INITIAL_COURSE_REPORT: {
            return { ...state, course_reports : [...state.course_reports, action.course_report]};
        }
        case ADD_COURSE_REPORT: {
            return { ...state, course_reports: [...state.course_reports, action.course_report]};
        }
        case EDIT_COURSE_REPORT: {
            const foundIndex: number = state.course_reports.findIndex(pr => pr.total_register === action.course_report.id);
            let course_reports: ICourseReport[] = state.course_reports;
            course_reports[foundIndex] = action.course_report;
            return { ...state, course_reports: course_reports };
        }
        case REMOVE_COURSE_REPORT: {
            return { ...state, course_reports: state.course_reports.filter(pr => pr.total_register !== action.id) };
        }
        case REMOVE_COURSE_REPORT_ALL: {
            return { ...state, course_reports: [] };
        }
        case CHANGE_COURSE_REPORT_PENDING_EDIT: {
            return { ...state, selectedCourseReport: action.course_report };
        }
        case CLEAR_COURSE_REPORT_PENDING_EDIT: {
            return { ...state, selectedCourseReport: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default course_reportsReducer;