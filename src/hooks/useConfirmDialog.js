import { useContext } from "react";
import { ConfirmDialogContext } from "../components/Context/ConfirmDialogContext";

const useConfirmDialog = () => {
    const { toConfirmDialog } = useContext(ConfirmDialogContext);

    const displayConfirmDialog = ({message, header, icon, accept, acceptLabel}) => {
        toConfirmDialog( {message, header, icon, accept, acceptLabel});
    }

    return { displayConfirmDialog };
}

export default useConfirmDialog;