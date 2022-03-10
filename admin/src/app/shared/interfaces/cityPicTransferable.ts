export interface cityPicTransferable{
    id : number;
    fileName : string
    fileType : string;
    fileData : string | ArrayBuffer;
    isCoverPic : boolean;
}