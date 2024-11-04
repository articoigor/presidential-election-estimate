# Pesquisa Eleitoral

## Descrição

A aplicação foi desenvolvida com o Nest.js + instância do Azure SQL Server, tendo em mente a especificação contida no arquivo Teste_pratico_2024.pdf. A idéia foi disponibilizar 3 rotas para que fosse possível: sincronizar os dados dos municípios de acordo com os dados mais recentes, estimar as porcentagens em relação à intenção de votos através de médias ponderadas (aplicando pesos arbitrários de acordo com os grupos) de acordo com uma pesquisa e também fazer o upload de novas pesquisas eleitorais.

## Grupos de Municípios

Os municípios são classificados em quatro grupos, de acordo com sua população:

- **Grupo 1**: Até 20 mil habitantes
- **Grupo 2**: Entre 20 mil e 100 mil habitantes
- **Grupo 3**: Entre 100 mil e 1 milhão de habitantes
- **Grupo 4**: Acima de 1 milhão de habitantes

## Funcionalidades

1. **Cálculo de Intenções de Voto**: Calcula as intenções de voto para cada candidato com base na população e no porte dos municípios.
2. **Sincronização de Dados**: O sistema pode sincronizar dados da base de municípios e estados brasileiros através de um serviço acionado mensalmente ou manualmente.
3. **Importação de Arquivos**: Permite a importação de arquivos contendo dados de intenção de votos.

## Requisitos

- Node.js
- npm

## Tecnologias Utilizadas

- **Nest.js**: Framework para construção de aplicações backEnd em Node.js (TypeScript).
- **Multer**: Middleware para manipulação de arquivos (recepção do binário do .csv com os resultados das pesquisa de intenção).

## Execução

1. Basta utilizar o comando _npm run start_, tendo o arquivo .env já no diretório principal (encaminharei como anexo junto ao link deste repositório) !

## Demonstração

[![Watch the video](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
