import { Iinfo } from "./Iinfo.model";
import { Ipersonagem } from "./Ipersonagem.model";

export interface IDataPayloadPersonagem {
    info : Iinfo,
    results: Ipersonagem[]
}