import { toggleModal, TOGGLE_MODAL } from '../actions/modalActions';
import { ModalKind } from '../typings/modals';
import { useModal } from './useModal';

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch
}))

describe('useModal', () => {
    it('ErrorModal', () => {
        const testModalKind = ModalKind.ErrorModal;
        const testMessage = 'TestError';

        const testPayload = {
            modalKind: testModalKind,
            message: testMessage
        }

        const {
            openModal,
            closeModal
        } = useModal(testPayload)

        openModal()
        expect(mockDispatch).toHaveBeenNthCalledWith(1, toggleModal(testPayload))

        closeModal()
        expect(mockDispatch).toHaveBeenNthCalledWith(2, toggleModal({modalKind: null}))
    })
})