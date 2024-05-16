import { Iepisodio } from "./Iepisoido.model";
import { Iinfo } from "./Iinfo.model";
import { Ilocation } from "./Ilocation.model";
import { Ipersonagem } from "./Ipersonagem.model";

export interface IDataPayload<T extends DataType> {

    info: Iinfo,
    results: T
}

type DataType = Ipersonagem | Iepisodio | Ilocation;