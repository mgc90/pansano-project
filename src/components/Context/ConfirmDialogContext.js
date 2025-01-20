import { createContext } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


export const ConfirmDialogContext = createContext();

export const ConfirmDialogProvider = ({ children }) => {
    
    

    const toConfirmDialog = ( { message, header, icon, accept, acceptLabel } ) => {
        confirmDialog({
            message: message,
            header: header,
            icon: icon,
            defaultFocus: 'accept',
            accept: accept,
            acceptLabel: acceptLabel
        });
    };

    return (
        <ConfirmDialogContext.Provider value={{ toConfirmDialog }}>
            <ConfirmDialog />
            {children}
        </ConfirmDialogContext.Provider>
    )

}