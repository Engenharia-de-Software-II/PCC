#language:pt
@Ecommerce
Funcionalidade: Navegacao no site de roupas

  @login
  Esquema do Cenario: Login valido
    Dado que esteja na pagina inicial do sistema
    Quando clicar no botao SignIn
    E preencher o campo email <Email>
    E preencher o campo senha <Senha>
    E clicar no botao para confirmar
    Entao devo logar no sistema

    Exemplos: 
      | Email                  | Senha    |
      | "caue.teste@teste.com" | "123456" |
      | "caue.teste@teste.com" | "123"    |
      | "email@teste.com"      | "123"    |


 	@automatico
  Cenario: teste automatico
    Dado que esteja na pagina inicial
    E preencher o campo de busca <search>
    Quando clicar no botao buscar
    Entao resultado sao carregados
    
    Exemplos: 
    | search       |
    | "busca um"   |