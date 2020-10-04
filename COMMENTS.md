
## Planejamento

* Backend
    * Configurações iniciais e libs

        * HttpStatusCode
        * Compression
        * Typescript
        * Celebrate
        * Express
        * Dotenv
        * Jest
        * Jest
        * Knex
        * Pg

    * Cofigurar os padrões de projeto
      
        * Adicionar a classe base de Crud para os cruds
        * Preparar os padrões de criação de crud
    
    * Definir a forma de conexão com o postgress
    * Definição da modelagem de dados
    * Criar as migrations para o knex
    * Criar os testes de unidate para os providers
    * Criar os providers para cada ação sobre as tabelas
    * Criar as controllers e definir as validações com celebrate
    * Criar rotas e testar funcionamento 


*  Frontend

    * Configurações iniciais e libs

        * Axios
        * vee-validate
        * Vuetify
        * Typescript

    * Cofigurar os padrões de projeto

        * Para view e outras configurações usado padrão do vue
        * Adicionar os DataSources para padronizar as consultas na API
    
    * Criar as páginas principais de consulta e edição
    * Realizar conexão das telas com as consultas da API


---

## Decisão da arquitetura utilizada

* Backend
    * Utilizei o express com typescript para construir o servidor.
    * A estrutura está organizada em dois principais agrupamentos, os providers e os controllers.
    * Cada feature de acesso a tabela está separada em arquivo e pasta específico para facilitar a manuenções futuras.

* Frontend

    * Utilizei o vue para a construção da SPA
    * Utilizei o axios como lib para facilitar a conexão com o backend
    * A estrutura do projeto está separada por pastas, cada uma com sua responsabilidade

## Lista de bibliotecas de terceiros utilizadas

* Backend

    * HttpStatusCode - Usada para facilitar a definição dos status code das respostas da API
    * Compression - Usada para comprimir a resposta da API e reduzir o consumo de banda do servidor
    * Typescript - Superset do javascript, usado para auxiliar a escalabilidade do projeto e a evidar bugs ;)
    * Celebrate - Ajuda na validação dos dados recebidos pela API no body, params, header...
    * Express - Facilita a construção do servidor http
    * Dotenv - Configura as varáveis globais
    * Jest - Usada para auxilixar com os testes
    * Cors - Usada para ajudar a ajustar o Cross-Origin Resource Sharing
    * Knex - Querie builder usado para facilitar e agilizar o acesso a base de dados
    * Pg - Usada pelo knex para acessar o postgress

* Frontend

    * Axios - Facilita a conexão com o backend
    * vee-validate - Facilita a validação de formulário
    * Vuetify - Entrega uma estensa quantidade de componentes de UI para utilização simples, além de toda a configuração de tema, tradução e acessibilidade
    * Typescript - Auxilia com tipagens e torna mais facila definição de padrões, além de melhorar o intelisens do vscode

## O que você melhoraria se tivesse mais tempo

* Backend

    * Desenvolvia algumas melhorias na arquitetura e organização do projeto
    * Melhorarias os testes, talvez adicionaria testes de integração
    * Consultas grandes trazer com paginação

* Frontend

    *Da lista tiro questões de login, e outros afins básicos e obrigatórios para aplicações web*
    * Os tratamentos para erros no cadastro
    * A exibição de modais ou snackbar para mensagens de erro
    * Trataria o carregamento na listagem quando a conexão estiver ruim
    * Adicionaria feedback visual para ações do usuário que precisassem de loading
    * Adicionaria mascaras nas inputs para facilitar o entendimento do usuário do que precisa preencher
    * Pensaria em alguma forma de padronizar o desenvolvimento de telas(para o caso de ter muitas telas)
    * Melhoraria o suporte ao typescript e tipagens para agilizar o desenvolvimento
    * Melhoraria o meu(Lucas) conhecimento sobre o framework vue e o vuetify, porque ainda é pouco
    * Melhoraria a contrução dos componentes do vue para se integrarem melhor com o typecript
    * Adicionaria testes unitário e com o cypress para as telas e componente criados
    * Melhoraria o processo de busca para realizar a consulta na API e não local

## Quais requisitos obrigatórios que não foram entregues

* Backend
    * Todos foram entegues

* Frontend

    * Todos foram entegues 


 