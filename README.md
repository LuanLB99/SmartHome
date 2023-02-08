# Smart Ports

# Sobre

Bem-Vindo à minha aplicação gerenciadora de planilhas no google drive. No caso, alterações na planilha de investimentos/gastos através de simples funções!
A ideia da aplicação é ser integrada com o BixBy, para que as funções sejam disparadas através do comando de voz do usuário. (O código bixby encontra-se no seguinte repositório: https://github.com/LuanLB99/SmartPorts-Bixby).

## Como rodar a aplicação back-end

1. Clone esse repositório
2. É necessário ter o docker instalado na sua máquina. Tendo o docker instalado na maquina, basta digitar:

`$ docker-compse up --build`

3. As chaves de acesso para fazer alterações na planilha estão no arquivo env.example.
4. Com as chaves acima, estará liberado o acesso para fazer alterações nas planilhas cadastradas.
5. A partir daí, temos duas opções:

- 5.1. Seguir a documentação da API abaixo;

- 5.2. Seguir a documentação da API do respositório mencionado acima;

## Ideia

A ideia da aplicação é facilitar, por meio da integração com o comando de voz, a inserção de novos dados na planilha, sem ter de acessa-la através do navegador. Assim o usuário consegue fazer as alterações desejadas, através do celular com simples comando de voz. Assim, economizando tempo e facilitando a interação do usuário com a ferramenta.

---

## Documentação da API

#### Adiciona um novo gasto.

```http
  POST http://localhost:5000/finances/newSpent
```

| Parâmetro             | Tipo     | Descrição                                                  |
| :-------------------- | :------- | :--------------------------------------------------------- |
| `Despesa`             | `string` | **Obrigatório**. O nme da despesa.                         |
| `Valor`               | `string` | **Obrigatório**. Valor gasto.                              |
| `Forma_de_Pagamento ` | `string` | **Opcional**. Forma do pagamento (Pix, Débito ou Crédito). |

#### Adiciona um novo gasto.

```http
  POST http://localhost:5000/finances/newInvest
```

| Parâmetro         | Tipo     | Descrição                                              |
| :---------------- | :------- | :----------------------------------------------------- |
| `Ativo`           | `string` | **Obrigatório**. O nome do arquivo que você quer.      |
| `Quantidade`      | `string` | **Obrigatório**. A quantidade de ativos que você quer. |
| `Preço`           | `string` | **Obrigatório**. O preço do ativo que você quer.       |
| `Valor_Investido` | `string` | **Obrigatório**. O valor que foi investido.            |

## Apêndice

Observação importante. O projeto foi projetado para uso pessoal e o ideal é que seja utilizado pela tecnologia bixby. Mas para rodar direto no localhost através do thunderclient e fazer as inserções na planilha.
