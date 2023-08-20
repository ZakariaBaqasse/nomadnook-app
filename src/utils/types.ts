export type AuthModalsProps = {
    isOpen:boolean;
    onClose: ()=>void;
};

export type SignupFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type LoginFormData = {
    email: string;
    password: string;
}

export enum ActionType{
    CLOSE="Close",
    OPEN="Open"
}

export type HomeNavBarProps = {
    onSignUp: ()=>void,
    onLogin:()=>void
}