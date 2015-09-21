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
    // console.log('nextState:', nextProps.id.objectId, this.props.id.objectId, nextState == this.state);
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

  render() {
    console.log('Render PageEdit');

    return (
      <div className='page-edit-row'>
        <Page {...this.props} />

        <div className='footer-buttons'>
          <div className='button hollow' onClick={this.handleOnSaveClick.bind(this)}>
            {this.state.isSaved ? 'Saved' : 'NOT Saved'}
          </div>
        </div>
      </div>
    );
  }
}

PageEdit.propTypes = {
  onSaveClick: React.PropTypes.func.isRequired
};

PageEdit.defaultProps = { isSaved: false };
