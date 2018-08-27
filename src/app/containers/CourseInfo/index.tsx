import { fetchCourseMentors, fetchCourseStudents, updateStudentMentors } from 'core/actions';
import { ICourseMentor, ICourseStudent } from 'core/models';
import { RootState } from 'core/reducers';
import * as React from 'react';
import CourseStudents from 'components/CourseStudents';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState, props: Props): Props => {
    return {
        ...props,
        courseStudents: state.course.students,
        courseMentors: state.course.mentors,
        isLoading: state.course.isLoading,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Props => {
    return {
        ...props,
        fetchCourseMentors: (courseId: string) => {
            dispatch(fetchCourseMentors(courseId));
        },
        fetchCourseStudents: (courseId: string) => {
            dispatch(fetchCourseStudents(courseId));
        },
        updateStudentMentors: (courseId: string, data: Partial<ICourseStudent>) => {
            dispatch(updateStudentMentors(courseId, data));
        },
    };
};

type Props = {
    match?: {
        params: {
            id: string;
        };
    };
    courseId: string;
    courseMentors: ICourseMentor[];
    courseStudents: ICourseStudent[];
    fetchCourseMentors: (courseId: string) => void;
    fetchCourseStudents: (courseId: string) => void;
    isLoading: boolean;
    updateStudentMentors: (courseId: string, data: Partial<ICourseStudent>) => void;
};

class CourseInfo extends React.Component<Props, any> {
    componentDidMount() {
        if (this.props.match) {
            this.props.fetchCourseStudents(this.props.match.params.id);
            this.props.fetchCourseMentors(this.props.match.params.id);
        }
    }
    // TODO: add loading page while fetching data
    render() {
        const { courseStudents, courseMentors, updateStudentMentors } = this.props;
        return (
            <CourseStudents
                courseStudents={courseStudents}
                courseMentors={courseMentors}
                updateStudentMentors={updateStudentMentors}
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CourseInfo);
