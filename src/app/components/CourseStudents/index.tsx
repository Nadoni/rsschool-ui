import { ICourseMentor, ICourseStudent } from 'core/models';
import * as React from 'react';
import ReactTable from 'react-table';

import 'react-table/react-table.css';
import { Button } from 'reactstrap';
import ModalEditCourseStudent from './ModalEditCourseStudent';
import matchSorter from 'match-sorter';
import { FetchSettings } from '../../core/constants';

type Props = {
    courseStudents: ICourseStudent[];
    courseMentors: ICourseMentor[];
    updateStudentMentors: (courseId: string, data: Partial<ICourseStudent>, options: FetchSettings) => void;
};

type CourseStudentsState = {
    studentData: ICourseStudent | undefined;
    isOpenModalEdit: boolean;
    studentsOptions: { [key: string]: string | number }[];
    mentorsOptions: { [key: string]: string | number }[];
    initialValues: any;
};

class CourseStudents extends React.PureComponent<Props, CourseStudentsState> {
    state: CourseStudentsState = {
        studentData: undefined,
        isOpenModalEdit: false,
        studentsOptions: [],
        mentorsOptions: [],
        initialValues: undefined,
    };

    makeOptionsFromData = (data: Array<ICourseStudent | ICourseMentor>, mark: string) => {
        const makeOptionsFromData = data.map((courseMember: ICourseStudent | ICourseMentor) => {
            return { label: courseMember.userId, value: courseMember.userId };
        });
        this.setState(prevState => ({
            // hack, can't ensure that key is in StateKeys
            ...prevState,
            [mark]: makeOptionsFromData,
        }));
    };

    componentDidUpdate(prevProps: Props, prevState: CourseStudentsState) {
        if (this.props.courseStudents !== prevProps.courseStudents) {
            this.makeOptionsFromData(this.props.courseStudents, 'studentsOptions');
        }
        if (this.props.courseMentors !== prevProps.courseMentors) {
            this.makeOptionsFromData(this.props.courseMentors, 'mentorsOptions');
        }
        if (this.state.studentData !== prevState.studentData) {
            if (this.state.studentData !== undefined) {
                this.getInitialStudent();
            }
        }
    }

    onCloseModalEditCourseStudent = () => {
        this.setState({
            studentData: undefined,
            isOpenModalEdit: false,
        });
    };

    toggleModalEdit = (studentData: ICourseStudent) => () => {
        this.setState({
            studentData,
            isOpenModalEdit: true,
        });
    };

    getInitialStudent = (): void => {
        const { studentData } = this.state;
        const { mentors, courseId } = studentData!;
        const { firstName, lastName, githubId } = studentData!.user!.profile;
        this.setState({
            initialValues: {
                courseId,
                studentFirstName: firstName,
                studentLastName: lastName,
                studentGithubId: githubId,
                studentCurrentMentors: mentors
                    .map(mentor => {
                        return mentor.profile.githubId;
                    })
                    .join(', '),
                selectStudent: [],
                selectMentors: mentors.map(mentor => {
                    return { label: mentor._id, value: mentor._id };
                }),
            },
        });
    };

    handleSubmitStudentData = async (props: any) => {
        const { selectMentors, studentGithubId, courseId } = props;
        const data = {
            mentors: selectMentors.map(({ value }: { value: string }) => ({ _id: value })),
            userId: studentGithubId,
        };
        await this.props.updateStudentMentors(courseId, data, FetchSettings.Many);
        this.onCloseModalEditCourseStudent();
    };

    render() {
        const { isOpenModalEdit, studentData, studentsOptions, mentorsOptions, initialValues } = this.state;
        return (
            <React.Fragment>
                <h3 className="mb-3"> Students</h3>

                <ReactTable
                    data={this.props.courseStudents}
                    defaultPageSize={100}
                    filterable={true}
                    columns={[
                        {
                            Header: 'Github Username',
                            id: 'id',
                            accessor: 'user._id',
                            filterMethod: (filter: any, rows: Array<object>): any => {
                                return matchSorter(rows, filter.value, { keys: ['id'] });
                            },
                            filterAll: true,
                        },
                        {
                            Header: 'First Name',
                            id: 'firstName',
                            accessor: 'user.profile.firstName',
                            filterMethod: (filter: any, rows: Array<object>): any => {
                                return matchSorter(rows, filter.value, { keys: ['firstName'] });
                            },
                            filterAll: true,
                        },
                        {
                            Header: 'Last Name',
                            id: 'lastName',
                            accessor: 'user.profile.lastName',
                            filterMethod: (filter: any, rows: Array<object>): any => {
                                return matchSorter(rows, filter.value, { keys: ['lastName'] });
                            },
                            filterAll: true,
                        },
                        {
                            Header: 'City',
                            id: 'city',
                            accessor: 'user.profile.city',
                            filterMethod: (filter: any, rows: Array<object>): any => {
                                return matchSorter(rows, filter.value, { keys: ['city'] });
                            },
                            filterAll: true,
                        },
                        {
                            Header: 'Mentors',
                            id: 'mentors',
                            accessor: (student: ICourseStudent) => student.mentors.map((i: any) => i._id).join(', '),
                            filterMethod: (filter: any, rows: Array<object>): any => {
                                return matchSorter(rows, filter.value, { keys: ['mentors'] });
                            },
                            filterAll: true,
                        },
                        {
                            Header: 'Edit',
                            sortable: false,
                            filterable: false,
                            Cell: ({ original }) => (
                                <Button className="btn btn-info action-button" onClick={this.toggleModalEdit(original)}>
                                    Edit
                                </Button>
                            ),
                        },
                    ]}
                    className="-striped -highlight"
                />
                <ModalEditCourseStudent
                    isOpen={isOpenModalEdit}
                    onCloseModal={this.onCloseModalEditCourseStudent}
                    studentData={studentData}
                    studentsOptions={studentsOptions}
                    mentorsOptions={mentorsOptions}
                    initialValues={initialValues}
                    onSubmit={this.handleSubmitStudentData}
                />
            </React.Fragment>
        );
    }
}

export default CourseStudents;
