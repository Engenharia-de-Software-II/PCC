#language:pt
@Rules
Funcionalidade: Verifica regras do sistema

  @CancelarEvento
  Cenario: Reembolso de evento cancelado
    Dado que esteja na pagina de gerenciamento de eventos
    Quando eu clico no botao cancelar evento
    E confirmo cancelamento
    E aceito que os reembolsos serao feitos
    Entao confirmo a mensagem de reembolso feito
    
  @AlterarValorEvento
  Cenario: Alterar o valor do evento
    Dado que esteja na pagina de gerenciamento de eventos
    Quando eu clico no botao editar evento
    Entao verifico que o valor nao pode ser alterado
    
  @ReembolsoAntecedenciaCorreto
  Cenario: Reembolso de ingresso comprado
    Dado que esteja na pagina de meus ingressos
    Quando eu clico no botao reembolso de um ingresso valido
    E confirmo reembolso
    Entao confirmo a mensagem de reembolso feito
    
  @ReembolsoAntecedenciaErrado
  Cenario: Reembolso de ingresso expirado
    Dado que esteja na pagina de meus ingressos
    Quando eu clico no botao reembolso de um ingresso expirado
    E confirmo reembolso
    Entao confirmo a mensagem de erro
    
	@NumeroMaximoEvento
	Esquema do Cenario: Valida o numero maximo de pessoas num evento
		Dado que estou na tela de compras de ingresso
		Quando eu escrevo no campo <qntIngressos>
		E clico no botao comprar
		Entao verifica a menssagem de erro
		 
	 Exemplos:
	 |qntIngressos|
	 |99999999999 |
	 
	@IdadeMinimaEventoCerto
  Esquema do Cenario: Valida que o evento tem idade minima
	 Dado que estou na tela de compras de ingresso
	 Quando eu escrevo no campo <idade>
	 E clico no botao comprar
	 Entao verifica a menssagem de sucesso
	 
	 Exemplos:
	 |idade 			|
	 | 18         |
	 
  @IdadeMinimaEventoErro
  Esquema do Cenario: Valida que o evento tem idade minima
	 Dado que estou na tela de compras de ingresso
	 Quando eu escrevo no campo <idade>
	 E clico no botao comprar
	 Entao verifica a menssagem de erro
	 
	 Exemplos:
	 |idade 			|
	 | 0          |
	 | 10         |
