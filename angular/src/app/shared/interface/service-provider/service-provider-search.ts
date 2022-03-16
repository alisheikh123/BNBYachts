import { ServiceProviderType } from "../../enums/service-provider-type";

export interface ServiceProvidSearch{

    location: string,
    latitude: number,
    longitude: number,
    serviceProviderType: ServiceProviderType,
    avaliableDate: Date | null,
}
