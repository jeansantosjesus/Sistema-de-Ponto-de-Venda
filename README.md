# Desafio Módulo 5 do curso de Desenvolvimento de Software com foco em backend da Cubos Academy.

Descrição do desafio:

Criar uma API para um PDV (Frente de Caixa). 

Esse será um projeto piloto, ou seja, no futuro outras funcionalidades serão implementadas.


## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e testes.

### 📋 Pré-requisitos

Antes de executar este projeto no seu computador, você precisará de alguns pacotes instalados como:

```
Node.js - Para executar os códigos Javascript fora do navegador;
Express - Pacote do Node.js para subir um servidor http localmente;
Bcrypt - Para criar as hashs das senhas dos usuários;
jsonwebtoken - Pacote usado para gerenciar o login do usuário via token;
Joi - Validar corpo da requisição, além de parâmetros de consulta e de url;
pg - Biblioteca PostgreSQL (usado quando estiver em deploy);
sqlite3 - Biblioteca usada para gerar banco de dados leve (para uso local)
dotenv - Para configurar as variáveis de ambiente;
Insomnia ou Postman - Para testar a API com requisições via GET, POST, PUT e DELETE.
```

### 🔧 Instalação


Para executar o projeto no seu ambiente de desenvolvimento em execução, primeiramente faça o clone desse repositório em sua maquina local na pasta desejada:

```

git clone https://github.com/flavioms86/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t08.git
```

Depois abra o projeto em seu editor de códigos, abra o terminal e digite o seguinte comando para a instalação dos pacotes e dependências necessárias:

```
npm install
```

Após a instalação, verificar as variáveis de ambiente devem ser configuradas. Para uso na máquina local, as seguintes variáveis devem ser configuradas:

```
PORT= (porta na qual o node estará ouvindo).
NODE_ENV= (aqui define qual será o ambiente de execução do node, para uso na maquina local, especifique "development", na nuvem, em deploy, especifique "production".
IS_LOCALHOST= (true para execução local e false em deploy).
JWT_SECRET= (senha para o jwt, pode ser uma senha qualquer no formato string).
JWT_EXPIRES_IN= (tempo de expiração do token, deve ser no formato 8h para 8 horas, por exemplo).
EMAIL_HOST= (host do provedor de email).
EMAIL_PORT= (porta de conexão).
EMAIL_USER= (usuário).
EMAIL_PASS= (senha).
EMAIL_NAME= (nome do remetente do email).
EMAIL_FROM= (email do remetente).
ENDPOINT_S3= (endereço do bucket para upload de imagem, aqui usado a backblaze).
REGION= (região a ser conectada)
KEY_ID= (id da chave)
KEY_NAME= (nome da chave)
APP_KEY= (key)
STORAGE_NAME= (nome do bucket de armazenamento)
```

As variáveis relacionadas ao banco de dados não precisam ser configuradas para uso na máquina local, pois será utilizado o banco de dados leve SQlite3, gerenciado pelo próprio knex. 
Mas se for fazer o deploy as mesmas devem ser configuradas:

```
DB_HOST= (endereço do banco de dados).
DB_USER= (usuário).
DB_NAME= (nome do usuário).
DB_PASS= (senha do banco de dados).
DB_PORT= (porta de conexão)
```

Obs.: As variáveis de ambiente devem ser configuradas no arquivo .env em ambiente local e em deploy, devem ser configuradas nas configurações da aplicação no painel do provedor.

Antes de executar o servidor na máquina local, primeiro faça as migrations e execute os seeds para popular o banco com os seguintes comandos:

```
npm run knex:migrate-latest

npm run knex:seed-run
```

Os comandos do knex para fazer as migrations e o seed são executadas automaticamente quando em deploy, lembrando que a variável de ambiente IS_LOCALHOST deverá ser false e a NODE_ENV em production.

Para iniciar o servidor, basta executar o nodemon (para não precisar restartar o servidor depois de alguma alteração):

```
npm run dev
```

Ou pelo node:

```
npm run start
```

O servidor estará executando localmente e aceitando requisições na porta 3000:

```
localhost:3000
```

## ⚙️ Estrutura do projeto

<img src="./estrutura_projeto.png" alt="Estrutura do Projeto" width="250">

## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/usuario`

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

### **Login do usuário**

#### `POST` `/login`


#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O campo senha é obrigatório."
}
```

### **Detalhar usuário**

#### `GET` `/usuario`

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O token deve ser informado."
}
```

### **Atualizar usuário**

#### `PUT` `/usuario`

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O campo email é obrigatório."
}
```

### **Listar categorias**

#### `GET` `/categoria`

#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

Obs.: Retorno resumido para fins de demonstração):

```javascript
// HTTP Status 200 / 201 / 204
[
  {
    id: 1,
    descricao: "Informática",
  },
  {
    id: 2,
    descricao: "Celulares",
  },
...
];
```

### **Cadastrar produto**

#### `POST` `/produto`

#### **Exemplo de requisição**

Obs.: O campo "produto_imagem" recebe a imagem no formato base64. Mo exemplo a baixo o código foi reduzido propositalmente para melhor visualização.

```javascript
// POST /produto
{
	"descricao": "Nintendo Switch",
	"quantidade_estoque": 5,
	"valor": 850000,
	"categoria_id": 9,
	"produto_imagem": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2sAAALSCAIAAADMZd7OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8Y...."
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"id": 5,
	"descricao": "Nintendo Switch",
	"quantidade_estoque": 5,
	"valor": 850000,
	"categoria_id": 9,
	"produto_imagem": "https://linkparaimagem.com/imagem.jpg"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "O campo categoria_id é obrigatório"
}
```

### **Editar dados do produto**

#### `PUT` `/produto/:id`

#### **Exemplo de requisição**

```javascript
// PUT /produto/5
{
	"descricao": "Nintendo Switch Oled",
	"quantidade_estoque": 5,
	"valor": 1200000,
	"categoria_id": 9,
	"produto_imagem": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2sAAALSCAIAAADMZd7OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8Y...."
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"id": 5,
	"descricao": "Nintendo Switch Oled",
	"quantidade_estoque": 5,
	"valor": 1200000,
	"categoria_id": 9,
	"produto_imagem": "https://linkparaimagem.com/imagem.jpg"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "O campo valor é obrigatório"
}
```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Não existe produto para a id informado."
}
```

### **Listar produtos**

#### `GET` `/produto`

Obs.: Esta rota aceita parâmetro de busca via req.query. O parâmetro aceito é "?categoria_id=id" onde id é a id da categoria a ser filtrada.

#### **Exemplo de requisição**

```javascript
// GET /produto
// Sem conteúdo no corpo (body) da requisição
```

```javascript
// GET /produto?categoria_id=5
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

Obs.: Alguns resultados foram omitidos para melhor visualização.

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 1,
		"descricao": "Smartphone Moto G9 Play Azul",
		"quantidade_estoque": 25,
		"valor": 231000,
		"categoria_id": 2
	},
	{
		"id": 2,
		"descricao": "Smartphone Moto G9 Play Preto",
		"quantidade_estoque": 5,
		"valor": 212000,
		"categoria_id": 2
	},
	... 
]
```

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 5,
		"descricao": "Nintendo Switch Oled",
		"quantidade_estoque": 5,
		"valor": 1200000,
		"categoria_id": 9
	}
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "O token deve ser informado"
}
```

### **Detalhar produto**

#### `GET` `/produto/:id`

#### **Exemplo de requisição**

```javascript
// GET /produto/5
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"id": 5,
	"descricao": "Nintendo Switch Oled",
	"quantidade_estoque": 5,
	"valor": 1200000,
	"categoria_id": 9
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Não existe produto para a id informado."
}
```

### **Excluir produto por ID**

#### `DELETE` `/produto/:id`

#### **Exemplo de requisição**

```javascript
// DELETE /produto/5
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "O produto não pode ser excluído porque está cadastrado em algum pedido."
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Não existe produto para a id informado."
}
```

### **Cadastrar cliente**

#### `POST` `/cliente`

#### **Exemplo de requisição**

```javascript
// POST /cliente
{
	"nome": "cliente dois",
	"email": "cliente2@email.com",
	"cpf": "00000000002",
	"cep": "00000-000",
	"rua": "Rua dois",
	"numero": "113",
	"bairro": "Jardin das flores",
	"cidade": "São Paulo",
	"estado": "SP"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"id": 2,
	"nome": "cliente dois",
	"email": "cliente2@email.com",
	"cpf": "00000000002",
	"cep": "00000-000",
	"rua": "Rua dois",
	"numero": "113",
	"bairro": "Jardin das flores",
	"cidade": "São Paulo",
	"estado": "SP"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "O campo email é obrigatório"
}
```

### **Editar dados do cliente**

#### `PUT` `/cliente/:id`

#### **Exemplo de requisição**

```javascript
// PUT /cliente/2
{
	"nome": "cliente Dois",
	"email": "cliente2@email.com",
	"cpf": "00000000012",
	"cep": "00000-000",
	"rua": "Rua dois",
	"numero": "113",
	"bairro": "Jardin das flores",
	"cidade": "São Paulo",
	"estado": "SP"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 2,
	"nome": "cliente Dois",
	"email": "cliente2@email.com",
	"cpf": "00000000012",
	"cep": "00000-000",
	"rua": "Rua dois",
	"numero": "113",
	"bairro": "Jardin das flores",
	"cidade": "São Paulo",
	"estado": "SP"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "O campo email é obrigatório"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "O cliente informado não existe."
}
```
### **Listar clientes**

#### `GET` `/cliente`

#### **Exemplo de requisição**

```javascript
// GET /cliente
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

Obs.: Alguns resultados foram omitidos para melhor visualização.

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"id": 1,
		"nome": "cliente um",
		"email": "cliente1@email.com",
		"cpf": "00000000011",
		"cep": "00000-000",
		"rua": "Rua dois",
		"numero": "113",
		"bairro": "Jardin das flores",
		"cidade": "São Paulo",
		"estado": "SP"
	},
	{
		"id": 2,
		"nome": "cliente Dois",
		"email": "cliente2@email.com",
		"cpf": "00000000012",
		"cep": "00000-000",
		"rua": "Rua dois",
		"numero": "113",
		"bairro": "Jardin das flores",
		"cidade": "São Paulo",
		"estado": "SP"
	}
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "O token deve ser informado"
}
```

### **Detalhar cliente**

#### `GET` `/cliente/:id`

#### **Exemplo de requisição**

```javascript
// GET /cliente/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"id": 2,
	"nome": "cliente Dois",
	"email": "cliente2@email.com",
	"cpf": "00000000012",
	"cep": "00000-000",
	"rua": "Rua dois",
	"numero": "113",
	"bairro": "Jardin das flores",
	"cidade": "São Paulo",
	"estado": "SP"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Não existe cliente para a id informado."
}
```

### **Cadastrar pedido**

#### `POST` `/pedido`

#### **Exemplo de requisição**

```javascript
// POST /pedido
{
    "cliente_id": 1,
    "observacao": "Deixar na portaria",
    "pedido_produtos": [
        {
            "produto_id": 68,
            "quantidade_produto": 1
        },
        {
            "produto_id": 71,
            "quantidade_produto": 1
        }
    ]
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"mensagem": "Pedido cadastrado com sucesso!"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Não existe cliente para o id informado."
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
	"mensagem": "Não existe o produto com o id 682."
}
```

### **Listar pedido**

#### `GET` `/pedido`

#### **Exemplo de requisição**

```javascript
// GET /pedido
// Sem conteúdo no corpo (body) da requisição
```

```javascript
// GET /pedido?cliente_id=1
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"pedido": {
			"id": 1,
			"valor_total": 2120000,
			"observacao": "Pedido cliente 1",
			"cliente_id": 1
		},
		"pedido_produtos": [
			{
				"id": 1,
				"quantidade_produto": 1,
				"valor_produto": 2120000,
				"pedido_id": 1,
				"produto_id": 68
			}
		]
	},
	{
		"pedido": {
			"id": 2,
			"valor_total": 250000,
			"observacao": "Deixar com a vizinha do 34",
			"cliente_id": 2
		},
		"pedido_produtos": [
			{
				"id": 2,
				"quantidade_produto": 1,
				"valor_produto": 250000,
				"pedido_id": 2,
				"produto_id": 71
			}
		]
	}
]
```

```javascript
// HTTP Status 200 / 201 / 204
[
	{
		"pedido": {
			"id": 1,
			"valor_total": 2120000,
			"observacao": "Pedido cliente 1",
			"cliente_id": 1
		},
		"pedido_produtos": [
			{
				"id": 1,
				"quantidade_produto": 1,
				"valor_produto": 2120000,
				"pedido_id": 1,
				"produto_id": 68
			}
		]
	}
]
```

```javascript
// HTTP Status 200 / 201 / 204
[]
```

Novos endpoints serão adicionado nas próximas sprints.

---
### ⌨️ Ajustes e melhorias

O projeto poderá ter novos recursos e melhorias como:

- [ ] Nova tarefa a ser definida.
- [ ] Nova tarefa a ser definida.
- [ ] Nova tarefa a ser definida.

## 🛠️ Construído com

Ferramentas utilizadas no desenvolvimento do projeto.

* [Node.js](https://nodejs.org/en) - Javascript runtime environment
* [Express](https://expressjs.com/pt-br/) - Framework para aplicação Web do Node.js

## ✒️ Autores

* **Everton Silva** - *Projeto Curso Backend da Cubos Academy - M05* - [silvaevertondev](https://github.com/silvaevertondev)
* **Flávio M. Silva** - *Projeto Curso Backend da Cubos Academy - M05* - [flavioms86](https://github.com/flavioms86)
* **Jean Jesus** - *Projeto Curso Backend da Cubos Academy - M05* - [JeanNewb](https://github.com/JeanNewb)
* **Luiz Felipe Reis** - *Projeto Curso Backend da Cubos Academy - M05* - [DevFelipreis](https://github.com/DevFelipreis)

## 📄 Licença

Não se aplica.
