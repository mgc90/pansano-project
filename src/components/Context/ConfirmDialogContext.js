import { createContext } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


export const ConfirmDialogContext = createContext();

export const ConfirmDialogProvider = ({ children }) => {
    
    const toConfirmDialog = ( { message, header, icon, accept, acceptLabel, rejectClassName } ) => {
        const rejectHidden = rejectClassName === "hidden";

        confirmDialog({
            message: message,
            header: header,
            icon: icon,
            defaultFocus: 'accept',
            accept: accept,
            acceptLabel: acceptLabel,
            rejectClassName: rejectClassName,
            closable: rejectHidden ? false : true,
            reject: rejectHidden ? accept : null,
            dismissableMask: rejectHidden ? false : true
        });
    };

    return (
        <ConfirmDialogContext.Provider value={{ toConfirmDialog }}>
            <ConfirmDialog />
            {children}
        </ConfirmDialogContext.Provider>
    )

}