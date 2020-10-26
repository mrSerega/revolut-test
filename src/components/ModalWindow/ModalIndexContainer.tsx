import { connect } from 'react-redux';
import { RootState } from '../../states/indexState';
import { Dispatch } from 'redux';
import { ModalIndex, ModalIndexDispatchProps, ModalIndexOwnProps, ModalIndexStateProps } from './ModalIndex';
import { ModalSelector } from '../../states/modalState';
import { toggleModal } from '../../actions/modalActions';

const mapStateToProps = (state: RootState, ownProps: ModalIndexOwnProps): ModalIndexStateProps => {
    const modalKind = ModalSelector.getCurrentModalKind(state)
    const message = ModalSelector.getModalMessage(state)

    return {
        modalKind,
        message
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ModalIndexOwnProps): ModalIndexDispatchProps => ({
    onClose: () => dispatch(toggleModal({modalKind: undefined}))
})

export const ModalIndexContainer = connect<
    ModalIndexStateProps,
    ModalIndexDispatchProps,
    ModalIndexOwnProps,
    RootState
>(
    mapStateToProps,
    mapDispatchToProps
)(ModalIndex)