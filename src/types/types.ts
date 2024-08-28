export type TButton = {
    children: React.ReactNode
    className: string
    icon: boolean
    onClick: () => unknown
    type: string
}
export interface IPtCard {
    image: string
    title: string
    desc: string
}
export interface ICard {
    id: number
    image: string
    title: string
}
export interface ICardLeft {
    id: number
    handleStepClick: (id: number) => unknown
    isActive: boolean
    length: number
    isCompleted: boolean
    title: string
}
export type TCardData = ICard[]
//carosal
export interface ICarosul {
    id: number
    title: string
    desc: string
    clientName: string
    label: string
    profileImg: string
}
export interface IPricing {
    id: number
    title: string
    price: number
    features: string[]
    width?: number
}

export interface IAuth {
    title?: string
    placeholder: string
    type: string
    name: string
    id: string
    label: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

/// for chat panel..
export interface IChat {
    title: string
    day: string
}
export interface IToaster {
    message: string
    isVisible: boolean
    onClose: () => void
    bg_color: string
}
/// ref types
export type TRef = {
    textareaRef: React.RefObject<HTMLInputElement>
    fileInputRef: React.RefObject<HTMLInputElement>
}
// custom context
export interface ICustomContextType {
    fileRef: React.RefObject<HTMLInputElement> | null
    uploadMedicFile: (element: React.RefObject<HTMLInputElement>) => void
    respond: any[]
    handleNewResponse: (newResponse: any) => {}
    handlePrevResponse: (newResponse: any) => {}
}
