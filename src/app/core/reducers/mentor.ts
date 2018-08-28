import { COURSE } from '../constants';
import { ICourseMentor } from '../models';
import { Action } from '../util';

export type MentorState = {
    studentsToMentor: ICourseMentor[];
    error: any;
    isLoading: boolean;
};

const initialState: MentorState = {
    studentsToMentor: [],
    error: undefined,
    isLoading: false,
};

export function mentorReducer(state = initialState, action: Action<any>): MentorState {
    switch (action.type) {
        case COURSE.FETCH_STUDENTS_BY_CURRENT_MENTOR: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case COURSE.FETCH_STUDENTS_BY_CURRENT_MENTOR_OK: {
            return {
                ...state,
                studentsToMentor: action.payload,
                isLoading: false,
            };
        }
        case COURSE.FETCH_STUDENTS_BY_CURRENT_MENTOR_FAIL: {
            return {
                ...state,
                studentsToMentor: [],
                isLoading: false,
                error: action.payload,
            };
        }
    }
    return state;
}
