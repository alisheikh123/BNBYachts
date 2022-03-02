import { FileType } from "../../enums/user-roles";

export interface FileModel {
    type:FileType;
    file: any;
}