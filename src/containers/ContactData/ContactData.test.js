import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ContactData } from './ContactData';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ContactData />);
  });

  it('should render BuildControls when recieve ings', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });
});
