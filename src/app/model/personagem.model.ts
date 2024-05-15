export interface Personagem {
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
    created: string
}

interface IOrigin {
    name: string, 
    url: string
}