export interface EntityResponseModel{
    returnStatus: boolean;
    returnMessage: string[];
    errors: any;
    data: object;
}