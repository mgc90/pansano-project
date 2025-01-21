import { useContext } from "react";
import { ConfirmDialogContext } from "../components/Context/ConfirmDialogContext";

const useConfirmDialog = () => {
    const { toConfirmDialog } = useContext(ConfirmDialogContext);

    const displayConfirmDialog = ({message, header, icon, accept, acceptLabel, rejectClassName}) => {
        toConfirmDialog( {message, header, icon, accept, acceptLabel, rejectClassName});
    }

    return { displayConfirmDialog };
}

export default useConfirmDialog;