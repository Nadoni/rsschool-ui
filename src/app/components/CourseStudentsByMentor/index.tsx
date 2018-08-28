import { ICourseMentor, ICourseStudent } from 'core/models';
import * as React from 'react';
import ReactTable from 'react-table';

import 'react-table/react-table.css';
import { Button } from 'reactstrap';
import ModalDeleteCourseStudent from './ModalDeleteCourseStudent';
import { FetchSettings } from '../../core/constants';

type Props = {
    studentsToMentor: ICourseMentor[];
    username: string;
    updateStudentMentors: (courseId: string, data: Partial<ICourseStudent>, options: FetchSettings) => void;
};

type CourseStudentsState = {
    studentData: ICourseStudent | undefined;
    isOpenModalEdit: boolean;
    initialValues: any;
};

class CourseStudentsByMentor extends React.PureComponent<Props, CourseStudentsState> {
    state: CourseStudentsState = {
        studentData: undefined,
        isOpenModalEdit: false,
        initialValues: undefined,
    };

    componentDidUpdate(prevProps: Props, prevState: CourseStudentsState) {
        if (
            this.state.studentData !== prevState.studentData ||
            this.props.studentsToMentor !== prevProps.studentsToMentor
        ) {
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
            mentors: selectMentors
                .map(({ value }: { value: string }) => ({ _id: value }))
                .filter(({ _id }: { _id: string }) => _id !== this.props.username),
            userId: studentGithubId,
        };
        await this.props.updateStudentMentors(courseId, data, FetchSettings.One);
        this.onCloseModalEditCourseStudent();
    };

    render() {
        const { isOpenModalEdit, studentData, initialValues } = this.state;
        const { studentsToMentor } = this.props;
        return (
            <React.Fragment>
                <h3 className="mb-3">Your Students</h3>

                <ReactTable
                    data={studentsToMentor}
                    defaultPageSize={10}
                    filterable={true}
                    columns={[
                        {
                            Header: 'Github Username',
                            accessor: 'user._id',
                        },
                        {
                            Header: 'First Name',
                            accessor: 'user.profile.firstName',
                        },
                        {
                            Header: 'Last Name',
                            accessor: 'user.profile.lastName',
                        },
                        {
                            Header: 'City',
                            accessor: 'user.profile.city',
                        },
                        {
                            Header: 'Mentors',
                            id: 'mentors._id',
                            accessor: (student: ICourseStudent) => student.mentors.map((i: any) => i._id).join(', '),
                        },
                        {
                            Header: 'Delete',
                            sortable: false,
                            filterable: false,
                            Cell: ({ original }) => (
                                <Button
                                    className="btn btn-danger action-button"
                                    onClick={this.toggleModalEdit(original)}
                                >
                                    Delete
                                </Button>
                            ),
                        },
                    ]}
                    className="-striped -highlight"
                />
                <ModalDeleteCourseStudent
                    isOpen={isOpenModalEdit}
                    onCloseModal={this.onCloseModalEditCourseStudent}
                    studentData={studentData}
                    initialValues={initialValues}
                    onSubmit={this.handleSubmitStudentData}
                />
            </React.Fragment>
        );
    }
}

export default CourseStudentsByMentor;
