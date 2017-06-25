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

