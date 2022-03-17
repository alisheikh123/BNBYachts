export interface UserBoats{
    id : number
    name : string
    description : string
    creatorId : string
    creationTime : Date
    boatGalleries :BoatGalleryDTO[]
}
export interface BoatGalleryDTO{
    id : number
    fileName : string
    fileType : string
    fileData : string
    title : string
    imagePath : string
    isCoverPic : boolean
    boatEntityId : number
}