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

Para manipular os arquivos Shapefile foi utilizada a su�te QGIS que permite manipular os arquivos e gerar v�rias sa�das al�m dos contornos que podem ser usados tanto pelo Google Maps, Google Earth ou mesmo como recursos para serem manipulados em desenvolvimento de aplicativos e p�ginas WEB. Uma sa�da da su�te � o formato GeoJSON citado acima.

# Visualiza��es

???????????????????????????????????????????????????????????????????????

# Premissas

Considerando que os dados trabalhados tem rela��o direta com localidades no territ�rio brasileiro, a premissa diretriz para o projeto de visualiza��o foi a representa��o dos mesmos utilizando os mapas dos estados e munic�pios como base.

Para tornar a compara��o entre regi�es mais intuitiva foram tamb�m consideradas diferentes escalas de cor e como melhor atribuir colora��es aos valores dos pagamentos do programa BF.

# Resultados

???????????????????????????????????????????????????????????????????????

# Li��es aprendidas

O trabalho sobre o grande volume de dados foi um dos maiores desafios para a realiza��o do projeto. Dado que muitas ferramentas tradicionais n�o est�o preparadas para manipular arquivos t�o grandes, houve uma dificuldade inicial para definir e estruturar a cadeia de processamento. Dessa forma uma grande quantidade de tempo e esfor�o foram aplicados para esta que � uma etapa anterior � visualiza��o propriamente.
 
Cada arquivo (mensal) do BF compactado ocupa aproximadamente 350 MB. Descompactado, o tamanho salta para mais de 1,5 GB. Como h� muita informa��o redundante, optou-se por gerar um novo arquivo somente com o que seria relevante para as transforma��es descritas acima.
 
Houve tamb�m uma preocupa��o em manipular e transformar o conjunto completo de dados, ao inv�s de tratar um subconjunto por vez. Essa abordagem trouxe maior robustez � solu��o, ao custo de um incremento de tempo de desenvolvimento. Dessa forma ficou evidente que um correto dimensionamento do esfor�o, com redu��o do escopo e balanceamento do tempo dedicado a cada etapa, s�o fundamentais para o andamento de um projeto de visualiza��o de dados.
 
Uma dificuldade encontrada, comum para grandes volumes de dados, foi a convers�o de formatos adequados para as ferramentas utilizadas.
 
Outra dificuldade interessante, por se tratar de s�ries hist�ricas de dados, foi conferir a exatid�o (acur�cia) dos nomes dos munic�pios brasileiros, pois al�m da adi��o de novos munic�pios a cada ano, existe tamb�m a mudan�a de nomes de munic�pios. S�o ocorr�ncias pequenas, mas que aconteceram e exigiram esfor�o adicional para contorn�-las. Uma solu��o que teria dado um ganho ao projeto seria ter utilizado um c�digo (�nico) para identificar cada UF+Munic�pio. Como os shapefiles do IBGE j� cont�m um c�digo �nico, este teria sido uma boa escolha.

???????????????????????????????????????????????????????????????????????TBD: falar sobre dificuldade de tratar arquivos com informa��es geogr�ficas.

# Oportunidades de melhoria

O projeto de visualiza��o de dados do programa BF foi desenvolvido utilizando os dados disponibilizados at� a data de mar�o de 2017, quando foi iniciado. Para a atualiza��o da visualiza��o com dados mais recentes que esta data seria necess�ria a execu��o manual da cadeia de processamento, compreendendo a filtragem de colunas, inclus�o no banco de dados, gera��o das tabelas sumarizadas e integra��o ao formato cartogr�fico. Estes passos teriam que ser repetidos mensalmente para manter a visualiza��o sempre atualizada com os �ltimos dados, a cada novo arquivo CSV lan�ado.
 
Portanto a primeira melhoria seria a automatiza��o da verifica��o e inclus�o de novas tabelas CSV. Um script poderia ser executado em um servidor para verificar se novos dados est�o dispon�veis e, caso encontrados, adicion�-los � visualiza��o.
 
Uma outra ideia que surgiu foi criar um framework que pudesse ser usado em qualquer informa��o disponibilizada pelo site Portal da Transpar�ncia, permitindo que mesmo a partir de grandes volumes de dados um p�gina sintetizando as informa��es e mostrando-as num painel integrado a um mapa fosse disponibilizada ao usu�rio final. Seria um framework de ETL (Extract-Transform-Load) que mostraria s�ries hist�ricas (baseadas no tempo � ano/m�s).

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


