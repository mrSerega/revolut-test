import { useDispatch } from 'react-redux';
import { toggleModal, ToggleModalPayload, TOGGLE_MODAL } from '../actions/modalActions';

export const useModal = (payload: ToggleModalPayload) => {
    const dispatch = useDispatch();

    const openModal = () =>  dispatch({
        type: TOGGLE_MODAL,
        payload
    })

    const closeModal = () => dispatch(toggleModal(
        {modalKind: null}
    ))

    return {
        openModal,
        closeModal
    }
}