import { useContext } from 'react';
import { ToastContext } from '../components/Context/ToastContext';

const useToast = () => {
    const { showToast } = useContext(ToastContext);

    const displayToast = (severity, summary, detail) => {
        showToast(severity, summary, detail);
    };

    return { displayToast };
};

export default useToast;
