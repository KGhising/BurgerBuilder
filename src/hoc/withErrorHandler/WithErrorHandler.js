import React, { useState, useEffect } from 'react';

import Modal from '../../component/UI/Modal/Modal';
import Auxilary from '../Auxilary';
import useHttpErrorHandler from '../../hooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent, Axios ) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(Axios);
        return (
            <Auxilary>
                <Modal 
                    show={error}
                    modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxilary>
        );
    }
}

export default withErrorHandler;