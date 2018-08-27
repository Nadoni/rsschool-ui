import * as React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, ModalFooter, Row, Button, Form } from 'reactstrap';
import VirtualizedSelect from 'react-virtualized-select';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { ICourseMentor, ICourseStudent } from '../../core/models';
import { RootState } from '../../core/reducers';
import ReduxFormInput from '../ReduxFormInput';

type ModalEditCourseStudentProps = {
    studentData: ICourseStudent | undefined;
    isOpen: boolean;
    onCloseModal: () => void;
    courseStudents: ICourseStudent[];
    courseMentors: ICourseMentor[];
    studentsOptions: { [key: string]: string | number }[];
    mentorsOptions: { [key: string]: string | number }[];
};

export type EdidCourseStudentData = {
    selectStudent: any;
};

class ModalEditCourseStudent extends React.Component<
    ModalEditCourseStudentProps & InjectedFormProps<EdidCourseStudentData, ModalEditCourseStudentProps>
> {
    state: EdidCourseStudentData = {
        selectStudent: undefined,
    };

    onCloseModal = () => {
        this.props.reset();
        this.props.onCloseModal();
    };

    render() {
        const { isOpen, studentsOptions, mentorsOptions, pristine, submitting, handleSubmit } = this.props;
        return (
            <Modal fade={true} centered={true} isOpen={isOpen} toggle={this.onCloseModal} size="lg">
                <Form onSubmit={handleSubmit}>
                    <ModalHeader toggle={this.onCloseModal}>Edit course student</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Field
                                name="studentFirstName"
                                label="Student First Name"
                                disabled={true}
                                component={ReduxFormInput}
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                name="studentLastName"
                                label="Student Last Name"
                                disabled={true}
                                component={ReduxFormInput}
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                name="studentGithubId"
                                label="Student Github Id"
                                disabled={true}
                                component={ReduxFormInput}
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                name="studentCurrentMentors"
                                label="Student Current Mentors"
                                disabled={true}
                                component={ReduxFormInput}
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                name="courseId"
                                label="Course"
                                disabled={true}
                                component={ReduxFormInput}
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                name="selectStudent"
                                type="select"
                                component={(props: any) => (
                                    <VirtualizedSelect
                                        options={studentsOptions}
                                        {...props.input}
                                        multi={true}
                                        onChange={selectStudent => {
                                            this.setState({ selectStudent });
                                        }}
                                        value={this.state.selectStudent}
                                    />
                                )}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                name="selectMentors"
                                type="select"
                                component={(props: any) => (
                                    <React.Fragment>
                                        <Label>Select mentors for student</Label>
                                        <VirtualizedSelect
                                            label="Select mentors for student"
                                            options={mentorsOptions}
                                            {...props.input}
                                            multi={true}
                                            placeholder="Choose mentor (Default: Without mentor)"
                                            onChange={props.input.onChange}
                                            onBlur={() => {
                                                return props.input.onBlur(props.input.value);
                                            }}
                                            onBlurResetsInput={false}
                                            value={props.input.value}
                                        />
                                    </React.Fragment>
                                )}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Row className="text-right">
                            <FormGroup className="col-md-12">
                                <Button color="secondary" onClick={this.onCloseModal}>
                                    Cancel
                                </Button>{' '}
                                <Button color="success" type="submit" disabled={pristine || submitting}>
                                    Save
                                </Button>
                            </FormGroup>
                        </Row>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = (state: RootState, props: ModalEditCourseStudentProps): ModalEditCourseStudentProps => {
    return {
        ...props,
        courseStudents: state.course.students,
        courseMentors: state.course.mentors,
    };
};
export default reduxForm<EdidCourseStudentData, ModalEditCourseStudentProps>({
    form: 'editCourseStudentForm',
    enableReinitialize: true,
})(
    connect(
        mapStateToProps,
        null,
    )(ModalEditCourseStudent),
);
