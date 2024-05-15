export interface Ipersonagem {
    id: number,	
    name: string,	
    status: string	
    species: string	
    type: string	
    gender: string	
    origin: IOrigin	
    location: object	
    image: string 
    episode: []
    url: string
    created: string,
    dimension: string // corrigir
}

interface IOrigin {
    name: string, 
    url: string
}