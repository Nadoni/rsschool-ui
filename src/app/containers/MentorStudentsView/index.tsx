import { fetchStudentsByCurrentMentor, updateStudentMentors } from 'core/actions';
import { ICourseMentor, ICourseStudent } from 'core/models';
import { RootState } from 'core/reducers';
import * as React from 'react';
import { connect } from 'react-redux';
import CourseStudentsByMentor from '../../components/CourseStudentsByMentor';
import { FetchSettings } from '../../core/constants';

const mapStateToProps = (state: RootState, props: Props): Props => {
    return {
        ...props,
        studentsToMentor: state.mentor.studentsToMentor,
        isLoading: state.course.isLoading,
        username: state.user.username,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Props => {
    return {
        ...props,
        fetchStudentsByCurrentMentor: (courseId: string) => {
            dispatch(fetchStudentsByCurrentMentor(courseId));
        },
        updateStudentMentors: (courseId: string, data: Partial<ICourseStudent>, options: FetchSettings) => {
            dispatch(updateStudentMentors(courseId, data, options));
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
    fetchStudentsByCurrentMentor: (courseId: string) => void;
    studentsToMentor: ICourseMentor[];
    isLoading: boolean;
    username: string;
    updateStudentMentors: (courseId: string, data: Partial<ICourseStudent>, options: FetchSettings) => void;
};

class MentorStudentsView extends React.Component<Props, any> {
    componentDidMount() {
        if (this.props.match) {
            this.props.fetchStudentsByCurrentMentor(this.props.match.params.id);
        }
    }

    // TODO: add loading page while fetching data
    render() {
        const { studentsToMentor, updateStudentMentors, username } = this.props;
        return (
            <CourseStudentsByMentor
                studentsToMentor={studentsToMentor}
                updateStudentMentors={updateStudentMentors}
                username={username}
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MentorStudentsView);
