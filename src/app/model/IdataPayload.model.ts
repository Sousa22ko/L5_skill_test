import { Iinfo } from "./Iinfo.model";
import { responseType } from "./ResponseType";

export interface IDataPayload {
    info : Iinfo,
    results: responseType[]
}