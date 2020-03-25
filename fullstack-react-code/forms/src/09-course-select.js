import PropTypes from 'prop-types';
/* eslint no-underscore-dangle: [2, { "allow": ["_loading"] }] */
import React from 'react';
import Core from './api/core.json';
import Electives from './api/electives.json';

const Courses = {
  core: Core,
  electives: Electives
};

module.exports = class extends React.Component {
  static propTypes = {
    department: PropTypes.string,
    course: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  state = {
    department: this.props.department,
    course: this.props.course,
    courses: [],
    _loading: false
  };

  static getDerivedStateFromProps(update) {
    console.log('1')
    return {
      department: update.department,
      course: update.course
    };
  }

  onSelectDepartment = evt => {
    const department = evt.target.value;
    const course = null;
    this.setState({department, course});
    this.props.onChange({name: 'department', value: department});
    //this.props.onChange({name: 'course', value: course});

    if (department) this.fetch(department); //We call fetch method, defined inside this class component
  };

  onSelectCourse = evt => {
    const course = evt.target.value;
    this.setState({course});
    this.props.onChange({name: 'course', value: course});
  };

  fetch = department => {
    this.setState({_loading: true, courses: []});
    //apiClient is a function outside our class and just returns an object with a 'then' method property inside it. This 'then' method property is called just inmediatly as we can see below, with a function as an argument to update the state, this function is called inside the 'then' method, where we can find it as cb() and then proceed to pass to correct values to update state.
    apiClient(department).then(courses => {
      this.setState({_loading: false, courses: courses});
    });
  };

  renderDepartmentSelect = () => {
    return (
      <select
        onChange={this.onSelectDepartment}
        value={this.state.department || ''}
      >
        <option value="">Which department?</option>
        <option value="core">NodeSchool: Core</option>
        <option value="electives">NodeSchool: Electives</option>
      </select>
    );
  };

  renderCourseSelect = () => {
    if (this.state._loading) {
      return <img alt="loading" src="/img/loading.gif" />;
    }
    if (!this.state.department || !this.state.courses.length) return <span />;

    return (
      <select onChange={this.onSelectCourse} value={this.state.course || ''}>
        {[
          <option value="" key="course-none">
            Which course?
          </option>,

          ...this.state.courses.map((course, i) => (
            <option value={course} key={i}>
              {course}
            </option>
          ))
        ]}
      </select>
    );
  };

  render() {
    return (
      <div>
        {this.renderDepartmentSelect()}
        <br />
        {this.renderCourseSelect()}
      </div>
    );
  }
};

function apiClient(department) {
  return {
    then: function(cb) {
      setTimeout(() => {
        cb(Courses[department]);
      }, 1000);
    }
  };
}
