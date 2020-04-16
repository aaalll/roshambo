import React, { useContext } from 'react';
import { Modal } from '@material-ui/core';
import { StoreContext } from 'store/reducers/reducer';
import { setModal } from 'store/actions/actions';
import Terms from 'components/terms';
import Privacy from 'components/privacy';

const AppModal: React.FC = () => {

  const {state, dispatch} = useContext(StoreContext);

  const handleClose = () => {
    dispatch(setModal(''));
  };

  const isOpen = !!state.modalType;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <div className="modal">
      {
        state.modalType === 'terms' ? 
        <Terms /> :
        state.modalType === 'privacy-policy' ?
        <Privacy /> :
        null
      }
      </div>
    </Modal>
  );
}

export default AppModal;
