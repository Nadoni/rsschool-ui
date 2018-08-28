import { fetchAllCourses } from 'core/actions';
import { ICourse } from 'core/models';
import { RootState } from 'core/reducers';
import { classNames } from 'core/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';

const cn = classNames(require('./index.scss'));

const mapStateToProps = (state: RootState, props: any): Props => {
    return {
        ...props,
        courses: state.courses.data,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Props => {
    return {
        ...props,
        fetchCourses: () => {
            dispatch(fetchAllCourses());
        },
    };
};

type Props = {
    courses: ICourse[];
    fetchCourses: () => void;
    assignMentors: (courseId: string) => void;
};

class Mentor extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchCourses();
    }

    render() {
        return (
            <div className="row">
                {this.props.courses.map(course => (
                    <div className="col-sm-6 mb-4" key={course._id}>
                        <Card color="secondary">
                            <CardHeader>
                                <h4>{course.name}</h4>
                            </CardHeader>
                            <CardBody>
                                <div className="row">
                                    <a
                                        className={cn('btn btn-info', 'action-button')}
                                        href={`/course/${course._id}/mentor-students`}
                                    >
                                        View My Students
                                    </a>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Mentor);
