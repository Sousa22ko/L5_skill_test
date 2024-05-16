import { Iinfo } from "./Iinfo.model";
import { Ilocation } from "./Ilocalizacao.model";

export interface IdataPayloadLocalizacao {
    info : Iinfo,
    results: Ilocation[]
}