import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandling = (WrapperComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
      this.err = () => {
        this.reqInterceptor = axios.interceptors.request.use((req) => {
          this.setState({ error: null });
          return req;
        });

        this.resInterceptor = axios.interceptors.response.use(
          (res) => res,
          (err) => {
            this.setState({ error: err });
          }
        );
      };
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      this.err();
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalCancel={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandling;
