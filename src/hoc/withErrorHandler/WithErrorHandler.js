import React, { Component } from 'react';

import Modal from '../../component/UI/Modal/Modal';
import Auxilary from '../Auxilary';

const withErrorHandler = (WrappedComponent, Axios ) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount () {
            this.reqInterceptor = Axios.interceptors.request.use(req => {
                this.setState( {error: null} );
                return req;
            });
            this.resInterceptor = Axios.interceptors.response.use(res => res, error => {
                this.setState( {error: error} );
            });
        }

        componentWillUnmount(){
            Axios.interceptors.request.eject(this.reqInterceptor);
            Axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render () {
            return (
                <Auxilary>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxilary>
            );
        }
    }
}

export default withErrorHandler;