# L5

Esse projeto é um desafio técnico da L5 feito usando Angular v17.3.0.

## Servidor de desenvolvimento local

Para executar o projeto localmente use os seguintes comando:
`npm install`
e em seguida
`ng serve` 
e acessar 
`localhost:4200` 

## Tecnologias adicionais utilizadas
O projeto foi desenvolvido usando:
- Angular 17.3
- Componentes utilizados foram os da biblioteca gráfica PrimeNG
- Bootsrap para estilização
- Rxjs e zonejs
- Desenvolvido usando git flow

## Hosting e automação
O projeto foi automatizado usando git actions para automaticamente ser buildado e feito o deploy no Firebase assim que uma atualização de código é feita na branch Master no endereço https://rickandmorty-9f2f7.web.app/

## Resumo da aplicação
A aplicação possui 4 telas principais e um componente de visualização compartilhado
- Home page possui as 4 abas mencionadas acima onde é possivel visualizar um dashboard com algumas informações gerais, alem de 3 abas de listagem das entidades "Personagens", "Locais" e "Episódios".
- Clicando em algum dos cards das telas de listagem o aplicativo abre uma tela de visualização mais detalhada da entidade
- Acima das 3 abas das listagem existe um filtro, permitindo pesquisas mais especificas.
- Cada pagina de listagem de entidade possui o proprio filtro (o componente filtro é compartilhado, porém o conteudo exibido depende da aba selecionada), e limpar um filtro não limpa os outros filtros das outras abas
