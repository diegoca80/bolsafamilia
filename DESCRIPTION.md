# Motiva��o
 
O Governo Brasileiro possui um site na internet denominado Portal da Transpar�ncia (http://www.portaltransparencia.gov.br). O Portal da Transpar�ncia foi uma iniciativa da Controladoria-Geral da Uni�o (CGU), lan�ada em novembro de 2004, para assegurar a boa e correta aplica��o dos recursos p�blicos. O objetivo � aumentar a transpar�ncia da gest�o p�blica, permitindo que o cidad�o acompanhe como o dinheiro p�blico est� sendo utilizado e ajude a fiscalizar.
 
O site pode ser acessado por qualquer cidad�o sem a necessidade de senhas ou cadastros pois o Governo brasileiro acredita que a transpar�ncia � o melhor ant�doto contra corrup��o. Com isto pode-se checar se os recursos dos impostos pagos est�o sendo usados como deveriam.
 
O Portal da Transpar�ncia disponibiliza dados de receitas e despesas de todos os minist�rios e outros �rg�os do Poder Executivo Federal, por serem eles os executores dos programas de governo e os respons�veis pela gest�o das a��es governamentais.
 
Em uma parte do site � poss�vel baixar os dados de receitas, gastos diretos, transfer�ncias, programas sociais, conv�nios em um formato CSV (Comma-Separated Values - arquivos de texto cujos valores s�o separados por v�rgulas). Numa outra parte, � poss�vel visualizar alguns gr�ficos pr�-estabelecidos sobre Bolsa Fam�lia e transfer�ncias do Governo Federal para estados em �reas como educa��o, sa�de, agricultura dentre outras.
 
Contudo, devido ao volume imenso dos dados, fica complicado baixar cada CSV ou se contentar com os gr�ficos prontos.
 
A nossa motiva��o foi tornar o grande volume de dados disponibilizados mais acess�veis ao usu�rio comum. Para verificar se isto seria poss�vel, escolhemos os dados do programa Bolsa Fam�lia (BF).
 
O Bolsa Fam�lia � um programa social que procura garantir �s fam�lias o direito � alimenta��o e o acesso � educa��o e � sa�de. A popula��o alvo do programa � constitu�da por fam�lias em situa��o de pobreza ou extrema pobreza, ou seja, aquelas que t�m renda mensal de at� R$ 85,00 ou com renda entre R$ 85,01 at� R$ 170,00 desde que tenham em sua composi��o gestantes e crian�as ou adolescentes entre 0 e 17 anos. Para se candidatar ao programa, � necess�rio que a fam�lia esteja inscrita no Cadastro �nico para Programas Sociais do Governo Federal, com seus dados atualizados h� menos de 2 anos. A sele��o das fam�lias � feita pelo Minist�rio do Desenvolvimento Social e Combate � Fome, com base nos dados inseridos pelas prefeituras no Cadastro �nico dos Programas Sociais do Governo Federal. A sele��o � mensal, e os crit�rios usados s�o a composi��o familiar e a renda de cada integrante da fam�lia.
 
# Proposta
 
Criar uma plataforma de visualiza��o interativa na qual o usu�rio pode ter uma percep��o geogr�fica da distribui��o dos recursos destinados pelo BF, sendo capaz de realizar compara��es entre diferentes regi�es e em diferentes �pocas, ou visualizar os dados em formato de painel (dashboard: quadro com v�rias informa��es visuais juntas) com diferentes possibilidades de agrupamentos ou detalhes.

#  Metodologia

## Fonte dos dados (Sele��o)

Os dados foram obtidos do portal do Portal da Transpar�ncia, do Governo Federal: http://www.portaldatransparencia.gov.br/downloads/mensal.asp?c=BolsaFamiliaFolhaPagamento
 
Os dados s�o disponibilizados mensalmente, para cada ano a partir de 2011, no formato CSV.
 
Como os dados cont�m s�ries hist�ricas envolvendo a popula��o brasileira, tamb�m foram obtidos dados de popula��o do portal do IBGE: http://www.ibge.gov.br/home/estatistica/populacao/estimativa2016/default.shtm.
 
Neste site h� as estimativas populacionais para todos os munic�pios brasileiros desde 1985. Foram usadas as estimativas de 2011, 2012, 2013, 2014, 2015 e 2016. Foram usados os arquivos de estimativas no formato MS Excel.
 
Em rela��o aos mapas do Brasil, optou-se por usar os mapas disponibilizados tamb�m pelo IBGE no site http://portaldemapas.ibge.gov.br/portal.php#homepage. Neste site h� mapas em diversos formatos, sendo que no projeto utilizamos os formatos Shapefile e KML/KMZ.
 
Tamb�m foram pesquisados outros dados relacionados aos estados e munic�pios brasileiros que tivessem rela��o com a popula��o. Estes dados serviriam para efeito de compara��o com o programa do BF e suas an�lises poderiam resultar na descoberta de correla��es entre os beneficiados do programa e suas respectivas cidades/regi�es. Como o programa BF visa distribuir renda e diminuir a pobreza da popula��o, um �ndice interessante (mas que n�o foi usado) foi o IDH (�ndice de Desenvolvimento Humano) que classifica os munic�pios quanto � renda, quanto � expectativa de vida e quanto � educa��o. Este �ndice � divulgado a cada 10 anos e o �ltimo foi disponibilizado em 2010. Se o �ndice fosse anual, daria para ser usado. Pode ser obtido no site http://www.br.undp.org/content/brazil/pt/home/idh0.html.

## Pr� processamento

Os dados foram visualizados e carregados usando as ferramentas Microsoft Excel e RStudio para que se pudesse ter uma no��o do tipo de informa��o que seria poss�vel obter a partir deles.

Em rela��o aos mapas do Brasil com a visualiza��o do contorno dos estados e dos munic�pios foram utilizadas as APIs do Google Maps e a su�te QGIS.

## Transforma��es realizadas

Os dados obtidos dos arquivos CSV foram trabalhados seguindo estas etapas:

1. Filtragem: remo��o de colunas de dados dos arquivos CSV, mantendo apenas os dados de interesse. Originalmente s�o disponibilizadas 12 colunas de dados, das quais apenas 5 s�o utilizadas. As demais cont�m dados redundantes ou desnecess�rios para gerar a compara��o entre benefici�rios do programa Bolsa Fam�lia.

2. Armazenamento: o grande volume de dados disponibilizado foi armazenado em Banco de Dados Relacional (MySQL), a fim de tornar seu acesso mais estruturado e simples. Este formato tamb�m permite aplicar novos filtros com mais flexibilidade usando a linguagem SQL (Structured Query Language).

3. Sumariza��o: os dados s�o disponibilizados como uma lista de valores, contendo dados de cada benefici�rio individualmente. Entretanto, para uma melhor visualiza��o � prefer�vel condensar os dados por grupos de benefici�rios, por estados e munic�pios. Assim foram gerados novos arquivos CSV contendo as somas por localidade e para cada per�odo.

4. Integra��o: para a apresenta��o sobre os mapas das regi�es foi necess�rio integrar os dados sumarizados � estrutura de dados cartogr�ficos. A partir do formato GeoJSON, contendo informa��es sobre as coordenadas de cada munic�pio e estado, foi poss�vel apontar os valores aplic�veis a cada regi�o.

Os contornos dos mapas foram obtidos dos arquivos Shapefile. O formato shapefile permite al�m da informa��o geogr�fica, uma camada contendo dados. Isto foi muito �til para fazer a concilia��o (batimento) entre os estados e munic�pios contidos nos arquivos CSV.

# Ferramentas utilizadas

Para manipular os arquivos CSV foram utilizados scripts de computador desenvolvidos nas linguagens Python e SQL. A transcri��o dos arquivos de dados brutos foi feita em SQL para que todo o armazenamento fosse baseado em Banco de Dados Relacional. Para a convers�o/integra��o aos dados cartogr�ficos foram utilizadas as bibliotecas json e pandas em linguagem Python.

O banco de dados relacional que pudesse armazenar os dados obtidos no site do programa foi de grande import�ncia para dar ganho de performance e agilidade na visualiza��o. O banco de dados escolhido foi o MySQL (https://www.mysql.com) por se tratar de um banco de c�digo aberto, que suporta comandos SQL e de f�cil instala��o.

Os exemplos de script abaixo foram utilizados mais de uma vez, cada vez que o processamento de um m�s contendo os dados do programa foram carregados. Seguem os exemplos (considerando o m�s de dezembro de 2016):

1. Script para criar uma tabela para armazenar um m�s com os dados obtidos do arquivo CSV:

>	CREATE TABLE CSV201612 (
>	X1 VARCHAR(2),
>	X2 VARCHAR(5),
>	X3 VARCHAR(50),
>	X4 VARCHAR(5),
>	X5 VARCHAR(5),
>	X6 VARCHAR(5),
>	X7 VARCHAR(5),
>	X8 VARCHAR(20),
>	X9 VARCHAR(50),
>	X10 VARCHAR(30),
>	X11 VARCHAR(10),
>	X12 VARCHAR(8)
>	);

2. Script para carregar o arquivo CSV na tabela do banco de dados:

>	LOAD DATA LOCAL INFILE
>	"201612_BolsaFamiliaFolhaPagamento.csv"
>	INTO TABLE CSV201612
>	COLUMNS TERMINATED BY '\t'
>	OPTIONALLY ENCLOSED BY '"'
>	ESCAPED BY '"'
>	LINES TERMINATED BY '\n'
>	IGNORE 1 LINES;

3. Script para criar a tabela que ter� os dados relevantes e que s�o utilizados na visualiza��o:

>	CREATE TABLE BF201612 (
>	UF VARCHAR(2),
>	NOME_MUNICIPIO VARCHAR(50),
>	NIS_FAVORECIDO VARCHAR(15),
>	NOME_FAVORECIDO VARCHAR(50),
>	VALOR_PARCELA DECIMAL(15,2),
>	ANO_MES_COMPETENCIA VARCHAR(7), 
>	ANO_MES_PAGAMENTO VARCHAR(7)
>	);

4. Script para carregar os dados do CSV considerados para a visualiza��o:

>	INSERT INTO BF201612
>	SELECT 	X1, 
>	X3, 
>	X8, 
>	X9, 
>	CAST(REPLACE(X11,',','') AS DECIMAL(15,2)),
>	CONCAT(SUBSTR(X12,4,4),"/",SUBSTR(X12,1,2)), '2016/12'
>	FROM CSV201612;

5. Script para criar uma tabela contendo os totais por UF, Cidade, Ano e M�s de pagamento. Nesta tabela tamb�m ser�o guardadas as popula��es de cada localidade (oriundas do IBGE) e dados estat�sticos para uso futuro.

>	CREATE TABLE BFTOTAISUF (
>	UF VARCHAR(2),
>	NOME_MUNICIPIO VARCHAR(50),
>	COUNT_BENEFICIADOS INTEGER(10),
>	SUM_PARCELAS DECIMAL(15,2),
>	AVG_PARCELAS DECIMAL(15,2),
>	MIN_PARCELAS DECIMAL(15,2),
>	MAX_PARCELAS DECIMAL(15,2),
>	STD_PARCELAS DECIMAL(15,2),
>	ANO_MES_PAGAMENTO VARCHAR(7),
>	CD_GEOCMU VARCHAR(7),
>	POPULACAO DECIMAL(15,2),
>	PORC_BF DECIMAL(5,2),
>	ANO VARCHAR(4)
>	);

6. Script para calcular os dados de cada localidade:

>	INSERT INTO BFTOTAISUF ( 
>	UF, 
>	NOME_MUNICIPIO, 
>	COUNT_BENEFICIADOS, 
>	SUM_PARCELAS, 
>	AVG_PARCELAS, 
>	MIN_PARCELAS, 
>	MAX_PARCELAS, 
>	STD_PARCELAS, 
>	ANO_MES_PAGAMENTO)
>	SELECT 	UF,
>	NOME_MUNICIPIO,
>	COUNT(NIS_FAVORECIDO),
>	SUM(VALOR_PARCELA),
>	AVG(VALOR_PARCELA),
>	MIN(VALOR_PARCELA),
>	MAX(VALOR_PARCELA),
>	STD(VALOR_PARCELA),
>	ANO_MES_PAGAMENTO
>	FROM 	BF201612
>	GROUP BY 	UF,
>	NOME_MUNICIPIO,
>	ANO_MES_PAGAMENTO;


Posteriormente nesta tabela foi feita uma atualiza��o para incluir os valores para os demais campos e calcular a porcentagem da popula��o que recebe o pagamento do programa.

A partir destas tabelas foram geradas as informa��es que foram carregadas na p�gina do projeto. Para isto, foram utilizados comandos SQL de sele��o, agrupamento e contabiliza��o. Como temos para cada m�s mais de 1,5 milh�o de registros, foram criados �ndices nas tabelas para aumentar a performance do banco.

A integra��o dos dados filtrados (gerados com o Banco de Dados) foi realizada utilizando a biblioteca pandas em linguagem Python. Esta plataforma foi escolhida por ser suficientemente flex�vel para tratar diferentes codifica��es de arquivo e tamb�m manipular um grande volume de dados.

Os CSVs gerados foram lidos utilizando a fun��o read_csv, gerando uma estrutura de dados otimizada chamada dataframe, definida na biblioteca. A partir dessa estrutura � poss�vel fazer buscas por segmentos dos dados, facilitando a correla��o necess�ria para a integra��o dos mesmos aos dados cartogr�ficos.

O tratamento da codifica��o dos arquivos � feita a partir da mesma fun��o, utilizando o argumento encoding. O valor para este argumento � latin-1, capaz de representar caracteres acentuados, t�picos da l�ngua portuguesa. Sem esse tratamento n�o seria poss�vel fazer a leitura dos dados originais sem incorrer em erros de formata��o.

Ap�s gerar os dataframes necess�rios, a segmenta��o dos mesmos � realizada sob demanda utilizando a fun��o loc. Os argumentos para essa fun��o s�o alterados dinamicamente, de acordo com o n�vel de especificidade desejada (dados por munic�pio/UF e por m�s/ano).

Para realizar a integra��o propriamente, utilizando como base os arquivos GeoJSON (preenchidos j� com os dados cartogr�ficos), foi utilizada a biblioteca json. Essa biblioteca permite a leitura de arquivos JSON em estruturas pr�prias da linguagem Python (dicion�rios e listas), com a fun��o load.

Uma vez carregados os arquivos GeoJSON, a rotina do script deve iterar sobre todos os itens da lista de localidades (munic�pios e estados), integrando os dados correspondentes ao Bolsa Fam�lia. Esta � uma tarefa que envolve v�rias la�os de processamento, pois os dados precisam ser carregados de forma estruturada nos dicion�rios.

Ao concluir a atualiza��o da estrutura de dados, esta precisa ser novamente escrita em um arquivo, para utiliza��o nos sistemas de visualiza��o. Para a convers�o em texto � utilizada a fun��o dumps da biblioteca json, que permite controlar caracter�sticas de indenta��o e codifica��o. Para a escrita em arquivo � utilizada a fun��o write, nativa da linguagem Python. Essa fun��o recebe o mesmo argumento encoding, utilizada na etapa de leitura do CSV. Entretanto o valor atribu�do neste caso � utf-8, para melhor compatibilidade dos arquivos com os sistemas Web, que s�o empregados na etapa seguinte. Esse padr�o de codifica��o � o mais adotado e tamb�m � capaz de representar os caracteres especiais da l�ngua portuguesa.

Para o desenvolvimento das visualiza��es finais, utilizou-se diversas bibliotecas em JavaScript como Crossfilter, DC, D3 e Bootstrap. A biblioteca DC.js funciona como uma esp�cie de extens�o ao D3, j� que � respons�vel por possibilitar a utiliza��o de gr�ficos j� customizados no dashboard juntamente com o uso de algumas fun��es do D3.js. O Crossfilter.js � respons�vel pela integra��o entre os gr�ficos, promovendo a mudan�a nas coordenadas e valores quando se tem a intera��o com determinado gr�fico do dashboard. J� a biblioteca Bootstrap.js � utilizada para tornar a p�gina responsiva, adaptando para diferentes resolu��es de tela.

Al�m disso, Google Maps API foi utilizado para desenvolvimento do mapa. Suas funcionalidades e adapta��es foram usadas juntamente com a biblioteca JQuery.js para o carregamento de arquivos geojson, exibi��o e eventos de mouse.


# Visualiza��es

A p�gina resultados permite duas visualiza��es interativas. 
 
A primeira � um painel (dashboard) onde o usu�rio pode interagir com as diferentes dimens�es e em forma gr�fica tirar ou confirmar suas pr�prias interpreta��es sobre o programa Bolsa Fam�lia. Tamb�m � poss�vel fazer agrupamentos nesta visualiza��o escolhendo mais de um fato.
 
Um exemplo de intera��o com os gr�ficos seria escolher o ano de 2014 e o m�s de outubro como base, al�m de selecionar os estados do Nordeste do pa�s. Com isso, pode-se notar os cinco munic�pios que receberam maior quantidade neste per�odo, al�m do valor total e total de benefici�rios.

O Dashboard foi desenvolvido pensando no conceito da an�lise explorat�ria de dados, que permite tanto usu�rios leigos quanto pessoas com certo conhecimento em estat�stica, avaliarem segundo suas perspectivas, o resultado do programa ao longo dos dados.

A segunda � um mapa do Brasil, inicialmente mostrado com os contornos dos estados. Ao interagir com o contorno de cada estado, � poss�vel ver os valores do programa em um determinado per�odo. Per�odo este que tamb�m pode ser alterado. Ao aumentar o n�vel de detalhe (ou zoom) no mapa, o contorno mostrado passa a ser dos munic�pios do estado escolhido.  

O per�odo selecionado inicialmente � o de dezembro de 2016, mas o usu�rio pode escolher outro ano a partir de 2011 e outro m�s, ou mesmo o condensado de todos os meses. Ao alterar essa sele��o o usu�rio dever� notar a atualiza��o das cores do mapa, refletindo as novas escalas utilizadas para o per�odo.

As cores de cada regi�o s�o definidas pela escala da legenda, baseada no percentual da popula��o que recebe o benef�cio. Quanto maior for esse percentual, mais quente � a cor utilizada. A partir dessa percep��o o usu�rio pode comparar as diferentes regi�es, indicando onde uma maior parte da popula��o participa do programa.

Ao clicar sobre um dos estados � poss�vel ver os mesmos dados a n�vel de munic�pios. O mapa contendo os contornos de cada munic�pio � carregados com os respectivos dados. A intera��o se d� de maneira semelhante �quela com os estados, assim como a atribui��o de cores segue o mesmo princ�pio, respeitando a abrang�ncia do estado. Para retornar � visualiza��o de todos os estados basta clicar em qualquer munic�pio da visualiza��o corrente.

Para enriquecer a percep��o sobre os dados � apresentado para cada regi�o o valor total destinado pelo programa. Assim o usu�rio pode facilmente entender a ordem de grandeza, juntamente com a abrang�ncia, dos recursos do programa.

# Premissas

Considerando que os dados trabalhados tem rela��o direta com localidades no territ�rio brasileiro, a premissa diretriz para o projeto de visualiza��o foi a representa��o dos mesmos utilizando os mapas dos estados e munic�pios como base.

Para tornar a compara��o entre regi�es mais intuitiva foram tamb�m consideradas diferentes escalas de cor e como melhor atribuir colora��es a cada regi�o. Inicialmente foram utilizados os valores dos pagamentos do programa Bolsa Fam�lia para gerar a escala, conferindo cores mais quentes �s regi�es que recebiam valores maiores em dado per�odo. Entretanto observou-se que esse par�metro n�o trazia uma percep��o satisfat�ria, uma vez que estados mais populosos poderiam receber mais recursos sem que isso efetivamente significasse uma condi��o mais favor�vel. Assim foi definido que a escala de cores seria baseada nas propor��es da popula��o beneficiada pelo programa, indicando efetivamente a abrang�ncia em cada regi�o.

# Resultados

Como resultados expressivos do projeto, podemos destacar a possibilidade de navegar em diversas dimens�es (UF, estado, ano e m�s) para ver os fatos que se deseja interpretar e avaliar (Data mining). Utilizando o dashboard � poss�vel visualizar o n�mero de beneficiados, os valores totais das parcelas, os principais munic�pios e a distribui��o pelos estados. Al�m disso, a visualiza��o no mapa permite comparar as regi�es por cores, utilizando os filtros mencionados.

# Li��es aprendidas

O trabalho sobre o grande volume de dados foi um dos maiores desafios para a realiza��o do projeto. Dado que muitas ferramentas tradicionais n�o est�o preparadas para manipular arquivos t�o grandes, houve uma dificuldade inicial para definir e estruturar a cadeia de processamento. Dessa forma uma grande quantidade de tempo e esfor�o foram aplicados para esta que � uma etapa anterior � visualiza��o propriamente.
 
Cada arquivo (mensal) do BF compactado ocupa aproximadamente 350 MB. Descompactado, o tamanho salta para mais de 1,5 GB. Como h� muita informa��o redundante, optou-se por gerar um novo arquivo somente com o que seria relevante para as transforma��es descritas acima.
 
Houve tamb�m uma preocupa��o em manipular e transformar o conjunto completo de dados, ao inv�s de tratar um subconjunto por vez. Essa abordagem trouxe maior robustez � solu��o, ao custo de um incremento de tempo de desenvolvimento. Dessa forma ficou evidente que um correto dimensionamento do esfor�o, com redu��o do escopo e balanceamento do tempo dedicado a cada etapa, s�o fundamentais para o andamento de um projeto de visualiza��o de dados.
 
Uma dificuldade encontrada, comum para grandes volumes de dados, foi a convers�o de formatos adequados para as ferramentas utilizadas.
 
Outra dificuldade interessante, por se tratar de s�ries hist�ricas de dados, foi conferir a exatid�o (acur�cia) dos nomes dos munic�pios brasileiros, pois al�m da adi��o de novos munic�pios a cada ano, existe tamb�m a mudan�a de nomes de munic�pios. S�o ocorr�ncias pequenas, mas que aconteceram e exigiram esfor�o adicional para contorn�-las. Uma solu��o que teria dado um ganho ao projeto seria ter utilizado um c�digo (�nico) para identificar cada UF+Munic�pio. Como os shapefiles do IBGE j� cont�m um c�digo �nico, este teria sido uma boa escolha.

Integrar as informa��es geogr�ficas tamb�m foi um grande desafio. Como os dados do Bolsa Fam�lia possuem informa��es de munic�pios brasileiros, foi decidido visualizar um mapa com os contornos destes munic�pios, al�m � claro dos estados. Para isto foram feitas diversas experi�ncias em manipular arquivos cartogr�ficos e adicion�-los a uma p�gina na internet. Para isto foi decidido usar o formato GeoJSON, que � um padr�o aberto projetado para representar caracter�sticas geogr�ficas simples, juntamente com seus atributos n�o espaciais, com base na Nota��o de Objeto JavaScript.

# Oportunidades de melhoria

O projeto de visualiza��o de dados do programa BF foi desenvolvido utilizando os dados disponibilizados at� o ano de 2016. Para a atualiza��o da visualiza��o com dados mais recentes que esta data seria necess�ria a execu��o manual da cadeia de processamento, compreendendo a filtragem de colunas, inclus�o no banco de dados, gera��o das tabelas sumarizadas e integra��o ao formato cartogr�fico. Estes passos teriam que ser repetidos mensalmente para manter a visualiza��o sempre atualizada com os �ltimos dados, a cada novo arquivo CSV lan�ado.
 
Portanto a primeira melhoria seria a automatiza��o da verifica��o e inclus�o de novas tabelas CSV. Um script poderia ser executado em um servidor para verificar se novos dados est�o dispon�veis e, caso encontrados, adicion�-los � visualiza��o.
 
Uma outra ideia que surgiu foi criar um framework que pudesse ser usado em qualquer informa��o disponibilizada pelo site Portal da Transpar�ncia, permitindo que mesmo a partir de grandes volumes de dados um p�gina sintetizando as informa��es e mostrando-as num painel integrado a um mapa fosse disponibilizada ao usu�rio final. Seria um framework de ETL (Extract-Transform-Load) que mostraria s�ries hist�ricas (baseadas no tempo ano/m�s).

Basicamente, todos os arquivos que est�o no site do governo trazem as seguintes informa��es (h� outras informa��es que n�o interessam para a proposta do framework):

1. UF: qual estado onde o recurso foi gasto ou disponibilizado

2. Munic�pio: qual cidade onde o recurso foi gasto ou disponibilizado

3. Pessoa: que foi o beneficiado, que tanto pode ser uma pessoa f�sica (como no caso do BF) como pode ser uma pessoa f�sica (o pr�prio munic�pio ou �rg�o ou institui��o que recebeu o recurso)

4. Identifica��o �nica da pessoa: no caso do BF foi o N�mero de Inscri��o Social (NIS). Trata-se de uma informa��o opcional uma vez que j� temos a identifica��o da pessoa

5. Valor: quantidade monet�ria paga � pessoa

6. Ano e M�s do Pagamento: informa��o contida no pr�prio nome do arquivo disponibilizada

7. Ano e M�s da Compet�ncia: alguns pagamentos s�o retroativos.

No framework, uma vez escolhida a �rea que seria analisada, uma ferramenta para obter os dados dos arquivos CSV e convert�-los para o modelo do framework faria a convers�o necess�ria. Uma vez, convertidos, as rotinas de sumariza��o e/ou agrupamento fariam as atualiza��es necess�rias para deixar os dados no formato que o framework utilizaria para a visualiza��o.
 
Numa interface de configura��o, o usu�rio definiria o nome do novo programa/�rea de an�lise e selecionaria os dados obtidos no passo anterior.
 
O framework tamb�m teria diversos indicadores tais como popula��o, IDH, �ndice de desemprego, etc... prontos para serem usados pelo usu�rio
 
No painel do framework, o usu�rio faria a escolha da s�rie hist�rica que desejaria usar e tamb�m os indicadores escolhidos. Para cada escolha, uma janela no painel seria adicionada. A visualiza��o da s�rie hist�rica tamb�m poderia ser feita no mapa correspondente do estado/munic�pio.


