import React from 'react/addons';
import ErrorMessages from '../ErrorMessages';

describe('ErrorMessages', () => {
  const { TestUtils } = React.addons;
  it('renders', (done) => {
    const errors = ['error01', 'error02'];
    let element = TestUtils.renderIntoDocument(<ErrorMessages messages={errors}/>);

    expect(element).toBeTruthy();
    done();
  });
});