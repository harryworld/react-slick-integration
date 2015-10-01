import React from 'react';
import Page from './Page';
import classNames from 'classnames';

export default class PageEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: this.props.isSaved,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.id.objectId != this.props.id.objectId
          || nextState != this.state;
  }

  handleOnSaveClick() {
    var newVal = !this.state.isSaved;
    this.setState({
      isSaved: newVal
    });
    this.props.onSaveClick(newVal);
  }

  handleOnEditClick() {
    console.log('handleOnEditClick', this.props);
  }

  render() {
    var starIconClass = classNames({
      'fa fa-star': true,
      'star-icon': true,
      'active': this.state.isSaved
    });

    return (
      <div className='page-edit-row'>
        <Page {...this.props} />

        <div className='footer-buttons'>
          <div className='edit-button button hollow' onClick={this.handleOnEditClick.bind(this)}>
            Edit
          </div>

          <i className={starIconClass} onClick={this.handleOnSaveClick.bind(this)} />
        </div>
      </div>
    );
  }
}

PageEdit.propTypes = {
  onSaveClick: React.PropTypes.func.isRequired
};

PageEdit.defaultProps = { isSaved: false };
