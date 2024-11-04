# Pesquisa Eleitoral

## Descrição

Este projeto consiste em uma aplicação Node.js desenvolvida para estimar a intenção de votos em eleições presidenciais no Brasil. A aplicação considera os diferentes portes dos municípios brasileiros e utiliza uma base de dados atualizada de estados e municípios, permitindo que a aplicação calcule as intenções de votos com base em pesquisas eleitorais recebidas em formato de arquivo.

## Grupos de Municípios

Os municípios são classificados em quatro grupos, de acordo com sua população:

- **Grupo 1**: até 20 mil habitantes
- **Grupo 2**: entre 20 mil e 100 mil habitantes
- **Grupo 3**: entre 100 mil e 1 milhão de habitantes
- **Grupo 4**: acima de 1 milhão de habitantes

## Funcionalidades

1. **Sincronização de Dados**: O sistema pode sincronizar dados da base de municípios e estados brasileiros através de um serviço acionado mensalmente ou manualmente.
2. **Importação de Arquivos**: Permite a importação de arquivos contendo dados de intenção de votos.
3. **Cálculo de Intenções de Voto**: Calcula as intenções de voto para cada candidato com base na população e no porte dos municípios.
4. **Dashboard**: Exibe a evolução temporal das intenções de votos em um dashboard simplificado.

## Requisitos

- Node.js (versão 14 ou superior)
- npm (ou yarn)
- Banco de Dados (opcional, dependendo da implementação)

## Uso

1. **Sincronizar a Base de Dados**: Acesse a rota apropriada para acionar a atualização da base de estados e municípios.
2. **Importar Pesquisa Eleitoral**: Utilize a funcionalidade para importar arquivos com dados de intenção de votos.
3. **Visualizar Resultados**: Acesse o dashboard para visualizar a evolução das intenções de votos ao longo do tempo.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework web para Node.js.
- **Multer**: Middleware para manipulação de arquivos.
- **ExcelJS**: Biblioteca para leitura e escrita de arquivos Excel.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.

## Demonstração

Um vídeo demonstrativo da aplicação pode ser encontrado em: [link_do_video].

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
