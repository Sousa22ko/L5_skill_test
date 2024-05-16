import { Iepisodio } from "./Iepisoido.model";
import { Iinfo } from "./Iinfo.model";

export interface IDataPayloadEpisodio {
    info : Iinfo,
    results: Iepisodio[]
}