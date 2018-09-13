import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IRootState } from "store/reducers/root";
import { RootAction } from "store/actions";
import { actionCreators as modalsActions } from "store/actions/modals";

export const openForExistingSound = (/* sound: ISound */): ThunkAction<void, IRootState, {}, RootAction> => {
    return (dispatch: ThunkDispatch<IRootState, {}, RootAction>): void => {
        dispatch(modalsActions.openSoundEditor());
    };
};
