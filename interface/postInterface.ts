export interface PostProps{
    
address: string,
description: string,
image: string,
date: Date,
tags? : string
username?: string,
postBy?: string,
likes?: string,

}
export interface DefaultResponse {
    isSuccess: boolean;
    message: string;
}

export interface UserChange{
    
    description: string,
    foto: string,
    first: string,
    last: string,
    email: string
    }

    export interface ModalProps {
        visible: boolean,
        type?: 'success' | 'error' | 'info' | 'notifications' | 'loading',
        title?: string,
        textBody?: string,
        textCancel?: string,
        textAcept?: string,
        onClose?(): void,
        onCancel?(): void,
        onAcept?(): void,
    }