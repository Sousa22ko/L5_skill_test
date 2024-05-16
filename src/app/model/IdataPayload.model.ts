import { Iepisodio } from "./Iepisoido.model";
import { Iinfo } from "./Iinfo.model";
import { Ilocation } from "./Ilocalizacao.model";
import { Ipersonagem } from "./Ipersonagem.model";

export interface IDataPayload<T extends DataType> {

    info: Iinfo,
    results: T
}

type DataType = Ipersonagem | Iepisodio | Ilocation;