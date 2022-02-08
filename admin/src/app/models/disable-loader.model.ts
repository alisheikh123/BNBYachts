export class DisbaleLoader
{
    urls : string[]
    constructor(urls = ["IsEmailExist","ValidateHDMFNoUnique","IsCompanyExist"]){
        this.urls = urls;
    }
}