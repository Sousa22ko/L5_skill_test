import { Iinfo } from "./Iinfo.model";
import { responseType } from "./Iresponse.model";

export interface IDataPayload {
    info : Iinfo,
    results: responseType[]
}