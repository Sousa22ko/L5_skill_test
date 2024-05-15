import { Iinfo } from "./Iinfo.model";
import { Ilocation } from "./Ilocation.model";

export interface IdataPayloadLocalizacao {
    info : Iinfo,
    results: Ilocation[]
}