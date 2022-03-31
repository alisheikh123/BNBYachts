export interface NewsLetterTransferable{
    id : number;
    fileName : string
    fileType : string;
    fileData : string | ArrayBuffer;
    isCoverPic : boolean;
}