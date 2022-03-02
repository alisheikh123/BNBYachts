export interface UserDetails{
    id : string
    name :string
    imagePath : string
    creationTime : Date
    roles : UserRole[]
    about : string
    phoneNumber : string
    isPhoneConfirmed : boolean
    email : string
    isInitialLogin : boolean
}
export interface UserRole{
   userId : string
   roleId : string
}