import { Iepisodio } from "./Iepisodio.model";
import { Iinfo } from "./Iinfo.model";
import { Ilocalizacao } from "./Ilocalizacao.model";
import { Ipersonagem } from "./Ipersonagem.model";

export interface IDataPayload<T extends DataType> {

    info: Iinfo,
    results: T []
}

type DataType = Ipersonagem | Iepisodio | Ilocalizacao;