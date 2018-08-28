import { COURSE } from 'core/constants';
import {
    getCourses,
    enrollUserInCourse as enrollUser,
    assignMentorsToStudents,
    getCourseStudents,
    getCourseMentors,
    renewalStudentMentors,
    getCourseStudentsByMentor,
} from 'core/api';
import { ICourse, ICourseStudent } from 'core/models';
import { FetchSettings } from '../constants';

export function fetchAllCourses() {
    return async (dispatch: any) => {
        dispatch({
            type: COURSE.FETCH_ALL_COURSES,
        });

        try {
            const data: ICourse[] = await getCourses();
            dispatch({
                type: COURSE.FETCH_ALL_COURSES_OK,
                payload: data,
            });
        } catch (e) {
            dispatch({
                type: COURSE.FETCH_ALL_COURSES_FAIL,
            });
        }
    };
}

export function enrollUserInCourse(id: string) {
    return async (dispatch: any) => {
        dispatch({
            type: COURSE.ENROLL,
        });

        try {
            const data = await enrollUser(id);
            dispatch({
                type: COURSE.ENROLL_OK,
                payload: data,
            });
        } catch (e) {
            dispatch({
                type: COURSE.ENROLL_FAIL,
            });
        }
    };
}

export function assignMentors(id: string) {
    return async (dispatch: any) => {
        dispatch({
            type: COURSE.ASSIGN_MENTORS,
        });

        try {
            const data = await assignMentorsToStudents(id);
            dispatch({
                type: COURSE.ASSIGN_MENTORS_OK,
                payload: data,
            });
        } catch (e) {
            dispatch({
                type: COURSE.ASSIGN_MENTORS_FAIL,
            });
        }
    };
}

export function fetchCourseStudents(courseId: string) {
    return async (dispatch: any) => {
        dispatch({
            type: COURSE.FETCH_STUDENTS,
        });

        try {
            const data = await getCourseStudents(courseId);
            dispatch({
                type: COURSE.FETCH_STUDENTS_OK,
                payload: data,
            });
        } catch (e) {
            dispatch({
                type: COURSE.FETCH_STUDENTS_FAIL,
            });
        }
    };
}

export function fetchCourseMentors(courseId: string) {
    return async (dispatch: any) => {
        dispatch({
            type: COURSE.FETCH_MENTORS,
        });

        try {
            const data = await getCourseMentors(courseId);
            dispatch({
                type: COURSE.FETCH_MENTORS_OK,
                payload: data,
            });
        } catch (e) {
            dispatch({
                type: COURSE.FETCH_MENTORS_FAIL,
            });
        }
    };
}

export function updateStudentMentors(courseId: string, data: Partial<ICourseStudent>, options: FetchSettings) {
    return async (dispatch: any) => {
        dispatch({
            type: COURSE.UPDATE_STUDENT_MENTORS,
        });

        try {
            await renewalStudentMentors(courseId, data);
            dispatch({
                type: COURSE.UPDATE_STUDENT_MENTORS_OK,
            });
            if (options === FetchSettings.Many) {
                await dispatch(fetchCourseStudents(courseId));
            }
            if (options === FetchSettings.One) {
                await dispatch(fetchStudentsByCurrentMentor(courseId));
            }
        } catch (e) {
            dispatch({
                type: COURSE.UPDATE_STUDENT_MENTORS_FAIL,
            });
        }
    };
}

export function fetchStudentsByCurrentMentor(courseId: string) {
    return async (dispatch: any) => {
        dispatch({
            type: COURSE.FETCH_STUDENTS_BY_CURRENT_MENTOR,
        });

        try {
            const data = await getCourseStudentsByMentor(courseId);
            dispatch({
                type: COURSE.FETCH_STUDENTS_BY_CURRENT_MENTOR_OK,
                payload: data,
            });
        } catch (e) {
            dispatch({
                type: COURSE.FETCH_STUDENTS_BY_CURRENT_MENTOR_FAIL,
            });
        }
    };
}
