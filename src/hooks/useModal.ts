import { useDispatch } from 'react-redux';
import { toggleModal, ToggleModalPayload } from '../actions/modalActions';

export const useModal = (payload: ToggleModalPayload) => {
    const dispatch = useDispatch();

    const openModal = () =>  dispatch(toggleModal(payload))

    const closeModal = () => dispatch(toggleModal(
        {modalKind: null}
    ))

    return {
        openModal,
        closeModal
    }
}