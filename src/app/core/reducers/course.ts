import { COURSE } from '../constants';
import { ICourseMentor, ICourseStudent } from '../models';
import { Action } from '../util';

export type CourseState = {
    students: ICourseStudent[];
    mentors: ICourseMentor[];
    error: any;
    isLoading: boolean;
};

const initialState: CourseState = {
    students: [],
    mentors: [],
    error: undefined,
    isLoading: false,
};

export function courseReducer(state = initialState, action: Action<any>): CourseState {
    switch (action.type) {
        case COURSE.FETCH_MENTORS: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case COURSE.FETCH_MENTORS_OK: {
            return {
                ...state,
                mentors: action.payload,
                isLoading: false,
            };
        }
        case COURSE.FETCH_MENTORS_FAIL: {
            return {
                ...state,
                mentors: [],
                isLoading: false,
                error: action.payload,
            };
        }
        case COURSE.FETCH_STUDENTS: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case COURSE.FETCH_STUDENTS_OK: {
            return {
                ...state,
                students: action.payload,
                isLoading: false,
            };
        }
        case COURSE.FETCH_STUDENTS_FAIL: {
            return {
                ...state,
                students: [],
                isLoading: false,
                error: action.payload,
            };
        }
    }
    return state;
}
