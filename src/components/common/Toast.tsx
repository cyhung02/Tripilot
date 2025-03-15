// src/components/common/Toast.tsx
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top' | 'bottom';

interface ToastProps {
    show: boolean;
    title: string;
    message?: string;
    icon?: ReactNode;
    type?: ToastType;
    position?: ToastPosition;
    onClose?: () => void;
    actionLabel?: string;
    onAction?: () => void;
    secondaryActionLabel?: string;
    onSecondaryAction?: () => void;
}

const Toast: React.FC<ToastProps> = ({
    show,
    title,
    message,
    icon,
    type = 'info',
    position = 'bottom',
    actionLabel,
    onAction,
    secondaryActionLabel,
    onSecondaryAction
}) => {
    // 根據類型設定顏色
    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'warning':
                return 'bg-amber-50 border-amber-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            case 'info':
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    // 根據位置設定動畫
    const getPositionStyles = () => {
        return position === 'top' ? 'top-20' : 'bottom-4';
    };

    const getTextColor = () => {
        switch (type) {
            case 'success':
                return 'text-green-800';
            case 'warning':
                return 'text-amber-800';
            case 'error':
                return 'text-red-800';
            case 'info':
            default:
                return 'text-blue-800';
        }
    };

    const getSubTextColor = () => {
        switch (type) {
            case 'success':
                return 'text-green-700';
            case 'warning':
                return 'text-amber-700';
            case 'error':
                return 'text-red-700';
            case 'info':
            default:
                return 'text-blue-700';
        }
    };

    const getActionStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500 hover:bg-green-600';
            case 'warning':
                return 'bg-amber-500 hover:bg-amber-600';
            case 'error':
                return 'bg-red-500 hover:bg-red-600';
            case 'info':
            default:
                return 'bg-blue-500 hover:bg-blue-600';
        }
    };

    // 動畫設定
    const toastVariants = {
        initial: { opacity: 0, y: position === 'top' ? -20 : 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: position === 'top' ? -20 : 20, scale: 0.95 }
    };

    return (
        <motion.div
            className={`fixed inset-x-0 mx-auto w-11/12 max-w-sm p-4 rounded-lg shadow-lg z-50 border ${getTypeStyles()} ${getPositionStyles()}`}
            variants={toastVariants}
            initial="initial"
            animate={show ? "animate" : "initial"}
            exit="exit"
            transition={{ duration: 0.3 }}
            style={{ display: show ? 'block' : 'none' }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-start mr-2">
                    {icon && <div className="mr-3 mt-1">{icon}</div>}
                    <div>
                        <h3 className={`font-medium ${getTextColor()}`}>{title}</h3>
                        {message && <p className={`text-sm ${getSubTextColor()}`}>{message}</p>}
                    </div>
                </div>
                {(actionLabel || secondaryActionLabel) && (
                    <div className="flex space-x-2">
                        {secondaryActionLabel && (
                            <button
                                onClick={onSecondaryAction}
                                className={`text-xs ${getSubTextColor()} hover:${getTextColor()} py-1 px-2 rounded transition-colors`}
                            >
                                {secondaryActionLabel}
                            </button>
                        )}
                        {actionLabel && (
                            <button
                                onClick={onAction}
                                className={`text-xs ${getActionStyles()} text-white py-1 px-3 rounded transition-colors`}
                            >
                                {actionLabel}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Toast;