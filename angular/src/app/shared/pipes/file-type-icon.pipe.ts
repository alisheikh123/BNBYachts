import { Pipe, PipeTransform } from '@angular/core';
const iconList = [
    { type: "xls", icon: "fa fa-lg fa-file-excel text-success" },
    { type: "xlsx", icon: "fa fa-lg fa-file-excel text-success" },
    { type: "pdf", icon: "fa fa-lg fa-file-pdf text-danger" },
    { type: "txt", icon: "fa fa-lg fa-file-alt text-muted" },
    { type: "rtf", icon: "fa fa-lg fa-file-alt text-muted" },
    { type: "doc", icon: "fa fa-lg fa-file-word text-info" },
    { type: "docx", icon: "fa fa-lg fa-file-word text-info" }
];

@Pipe({ name: 'fileTypeIcon' })
export class FileTypePipe implements PipeTransform {
    transform(fileName: string) {
        let ext = fileName.split(".").pop();
        let obj = iconList.filter(row => {
            if (row.type === ext) {
                return true;
            }
        });
        if (obj.length > 0) {
            let icon = obj[0].icon;
            return icon;
        } else {
            return "";
        }
    }
}
