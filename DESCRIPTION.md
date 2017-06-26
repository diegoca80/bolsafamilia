# Motivação
 
O Governo Brasileiro possui um site na internet denominado Portal da Transparência (http://www.portaltransparencia.gov.br). O Portal da Transparência foi uma iniciativa da Controladoria-Geral da União (CGU), lançada em novembro de 2004, para assegurar a boa e correta aplicação dos recursos públicos. O objetivo é aumentar a transparência da gestão pública, permitindo que o cidadão acompanhe como o dinheiro público está sendo utilizado e ajude a fiscalizar.
 
O site pode ser acessado por qualquer cidadão sem a necessidade de senhas ou cadastros pois o Governo brasileiro acredita que a transparência é o melhor antídoto contra corrupção. Com isto pode-se checar se os recursos dos impostos pagos estão sendo usados como deveriam.
 
O Portal da Transparência disponibiliza dados de receitas e despesas de todos os ministérios e outros órgãos do Poder Executivo Federal, por serem eles os executores dos programas de governo e os responsáveis pela gestão das ações governamentais.
 
Em uma parte do site é possível baixar os dados de receitas, gastos diretos, transferências, programas sociais, convênios em um formato CSV (Comma-Separated Values - arquivos de texto cujos valores são separados por vírgulas). Numa outra parte, é possível visualizar alguns gráficos pré-estabelecidos sobre Bolsa Família e transferências do Governo Federal para estados em áreas como educação, saúde, agricultura dentre outras.
 
Contudo, devido ao volume imenso dos dados, fica complicado baixar cada CSV ou se contentar com os gráficos prontos.
 
A nossa motivação foi tornar o grande volume de dados disponibilizados mais acessíveis ao usuário comum. Para verificar se isto seria possível, escolhemos os dados do programa Bolsa Família (BF).
 
O Bolsa Família é um programa social que procura garantir às famílias o direito à alimentação e o acesso à educação e à saúde. A população alvo do programa é constituída por famílias em situação de pobreza ou extrema pobreza, ou seja, aquelas que têm renda mensal de até R$ 85,00 ou com renda entre R$ 85,01 até R$ 170,00 desde que tenham em sua composição gestantes e crianças ou adolescentes entre 0 e 17 anos. Para se candidatar ao programa, é necessário que a família esteja inscrita no Cadastro Único para Programas Sociais do Governo Federal, com seus dados atualizados há menos de 2 anos. A seleção das famílias é feita pelo Ministério do Desenvolvimento Social e Combate à Fome, com base nos dados inseridos pelas prefeituras no Cadastro Único dos Programas Sociais do Governo Federal. A seleção é mensal, e os critérios usados são a composição familiar e a renda de cada integrante da família.
 
# Proposta
 
Criar uma plataforma de visualização interativa na qual o usuário pode ter uma percepção geográfica da distribuição dos recursos destinados pelo BF, sendo capaz de realizar comparações entre diferentes regiões e em diferentes épocas, ou visualizar os dados em formato de painel (dashboard: quadro com várias informações visuais juntas) com diferentes possibilidades de agrupamentos ou detalhes.

#  Metodologia

## Fonte dos dados (Seleção)

Os dados foram obtidos do portal do Portal da Transparência, do Governo Federal: http://www.portaldatransparencia.gov.br/downloads/mensal.asp?c=BolsaFamiliaFolhaPagamento
 
Os dados são disponibilizados mensalmente, para cada ano a partir de 2011, no formato CSV.
 
Como os dados contém séries históricas envolvendo a população brasileira, também foram obtidos dados de população do portal do IBGE: http://www.ibge.gov.br/home/estatistica/populacao/estimativa2016/default.shtm.
 
Neste site há as estimativas populacionais para todos os municípios brasileiros desde 1985. Foram usadas as estimativas de 2011, 2012, 2013, 2014, 2015 e 2016. Foram usados os arquivos de estimativas no formato MS Excel.
 
Em relação aos mapas do Brasil, optou-se por usar os mapas disponibilizados também pelo IBGE no site http://portaldemapas.ibge.gov.br/portal.php#homepage. Neste site há mapas em diversos formatos, sendo que no projeto utilizamos os formatos Shapefile e KML/KMZ.
 
Também foram pesquisados outros dados relacionados aos estados e municípios brasileiros que tivessem relação com a população. Estes dados serviriam para efeito de comparação com o programa do BF e suas análises poderiam resultar na descoberta de correlações entre os beneficiados do programa e suas respectivas cidades/regiões. Como o programa BF visa distribuir renda e diminuir a pobreza da população, um índice interessante (mas que não foi usado) foi o IDH (índice de Desenvolvimento Humano) que classifica os municípios quanto à renda, quanto à expectativa de vida e quanto à educação. Este índice é divulgado a cada 10 anos e o último foi disponibilizado em 2010. Se o índice fosse anual, daria para ser usado. Pode ser obtido no site http://www.br.undp.org/content/brazil/pt/home/idh0.html.

## Pré processamento

Os dados foram visualizados e carregados usando as ferramentas Microsoft Excel e RStudio para que se pudesse ter uma noção do tipo de informação que seria possível obter a partir deles.

Em relação aos mapas do Brasil com a visualização do contorno dos estados e dos municípios foram utilizadas as APIs do Google Maps e a suíte QGIS.

## Transformações realizadas

Os dados obtidos dos arquivos CSV foram trabalhados seguindo estas etapas:

1. Filtragem: remoção de colunas de dados dos arquivos CSV, mantendo apenas os dados de interesse. Originalmente são disponibilizadas 12 colunas de dados, das quais apenas 5 são utilizadas. As demais contém dados redundantes ou desnecessários para gerar a comparação entre beneficiários do programa Bolsa Família.

2. Armazenamento: o grande volume de dados disponibilizado foi armazenado em Banco de Dados Relacional (MySQL), a fim de tornar seu acesso mais estruturado e simples. Este formato também permite aplicar novos filtros com mais flexibilidade usando a linguagem SQL (Structured Query Language).

3. Sumarização: os dados são disponibilizados como uma lista de valores, contendo dados de cada beneficiário individualmente. Entretanto, para uma melhor visualização é preferível condensar os dados por grupos de beneficiários, por estados e municípios. Assim foram gerados novos arquivos CSV contendo as somas por localidade e para cada período.

4. Integração: para a apresentação sobre os mapas das regiões foi necessário integrar os dados sumarizados à estrutura de dados cartográficos. A partir do formato GeoJSON, contendo informações sobre as coordenadas de cada município e estado, foi possível apontar os valores aplicáveis a cada região.

Os contornos dos mapas foram obtidos dos arquivos Shapefile. O formato shapefile permite além da informação geográfica, uma camada contendo dados. Isto foi muito útil para fazer a conciliação (batimento) entre os estados e municípios contidos nos arquivos CSV.

# Ferramentas utilizadas

Para manipular os arquivos CSV foram utilizados scripts de computador desenvolvidos nas linguagens Python e SQL. A transcrição dos arquivos de dados brutos foi feita em SQL para que todo o armazenamento fosse baseado em Banco de Dados Relacional. Para a conversão/integração aos dados cartográficos foram utilizadas as bibliotecas json e pandas em linguagem Python.

O banco de dados relacional que pudesse armazenar os dados obtidos no site do programa foi de grande importância para dar ganho de performance e agilidade na visualização. O banco de dados escolhido foi o MySQL (https://www.mysql.com) por se tratar de um banco de código aberto, que suporta comandos SQL e de fácil instalação.

Os exemplos de script abaixo foram utilizados mais de uma vez, cada vez que o processamento de um mês contendo os dados do programa foram carregados. Seguem os exemplos (considerando o mês de dezembro de 2016):

1. Script para criar uma tabela para armazenar um mês com os dados obtidos do arquivo CSV:

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

3. Script para criar a tabela que terá os dados relevantes e que são utilizados na visualização:

>	CREATE TABLE BF201612 (
>	UF VARCHAR(2),
>	NOME_MUNICIPIO VARCHAR(50),
>	NIS_FAVORECIDO VARCHAR(15),
>	NOME_FAVORECIDO VARCHAR(50),
>	VALOR_PARCELA DECIMAL(15,2),
>	ANO_MES_COMPETENCIA VARCHAR(7), 
>	ANO_MES_PAGAMENTO VARCHAR(7)
>	);

4. Script para carregar os dados do CSV considerados para a visualização:

>	INSERT INTO BF201612
>	SELECT 	X1, 
>	X3, 
>	X8, 
>	X9, 
>	CAST(REPLACE(X11,',','') AS DECIMAL(15,2)),
>	CONCAT(SUBSTR(X12,4,4),"/",SUBSTR(X12,1,2)), '2016/12'
>	FROM CSV201612;

5. Script para criar uma tabela contendo os totais por UF, Cidade, Ano e Mês de pagamento. Nesta tabela também serão guardadas as populações de cada localidade (oriundas do IBGE) e dados estatísticos para uso futuro.

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


Posteriormente nesta tabela foi feita uma atualização para incluir os valores para os demais campos e calcular a porcentagem da população que recebe o pagamento do programa.

A partir destas tabelas foram geradas as informações que foram carregadas na página do projeto. Para isto, foram utilizados comandos SQL de seleção, agrupamento e contabilização. Como temos para cada mês mais de 1,5 milhão de registros, foram criados índices nas tabelas para aumentar a performance do banco.

A integração dos dados filtrados (gerados com o Banco de Dados) foi realizada utilizando a biblioteca pandas em linguagem Python. Esta plataforma foi escolhida por ser suficientemente flexível para tratar diferentes codificações de arquivo e também manipular um grande volume de dados.

Os CSVs gerados foram lidos utilizando a função read_csv, gerando uma estrutura de dados otimizada chamada dataframe, definida na biblioteca. A partir dessa estrutura é possível fazer buscas por segmentos dos dados, facilitando a correlação necessária para a integração dos mesmos aos dados cartográficos.

O tratamento da codificação dos arquivos é feita a partir da mesma função, utilizando o argumento encoding. O valor para este argumento é latin-1, capaz de representar caracteres acentuados, típicos da língua portuguesa. Sem esse tratamento não seria possível fazer a leitura dos dados originais sem incorrer em erros de formatação.

Após gerar os dataframes necessários, a segmentação dos mesmos é realizada sob demanda utilizando a função loc. Os argumentos para essa função são alterados dinamicamente, de acordo com o nível de especificidade desejada (dados por município/UF e por mês/ano).

Para realizar a integração propriamente, utilizando como base os arquivos GeoJSON (preenchidos já com os dados cartográficos), foi utilizada a biblioteca json. Essa biblioteca permite a leitura de arquivos JSON em estruturas próprias da linguagem Python (dicionários e listas), com a função load.

Uma vez carregados os arquivos GeoJSON, a rotina do script deve iterar sobre todos os itens da lista de localidades (municípios e estados), integrando os dados correspondentes ao Bolsa Família. Esta é uma tarefa que envolve várias laços de processamento, pois os dados precisam ser carregados de forma estruturada nos dicionários.

Ao concluir a atualização da estrutura de dados, esta precisa ser novamente escrita em um arquivo, para utilização nos sistemas de visualização. Para a conversão em texto é utilizada a função dumps da biblioteca json, que permite controlar características de indentação e codificação. Para a escrita em arquivo é utilizada a função write, nativa da linguagem Python. Essa função recebe o mesmo argumento encoding, utilizada na etapa de leitura do CSV. Entretanto o valor atribuído neste caso é utf-8, para melhor compatibilidade dos arquivos com os sistemas Web, que são empregados na etapa seguinte. Esse padrão de codificação é o mais adotado e também é capaz de representar os caracteres especiais da língua portuguesa.

Para o desenvolvimento das visualizações finais, utilizou-se diversas bibliotecas em JavaScript como Crossfilter, DC, D3 e Bootstrap. A biblioteca DC.js funciona como uma espécie de extensão ao D3, já que é responsável por possibilitar a utilização de gráficos já customizados no dashboard juntamente com o uso de algumas funções do D3.js. O Crossfilter.js é responsável pela integração entre os gráficos, promovendo a mudança nas coordenadas e valores quando se tem a interação com determinado gráfico do dashboard. Já a biblioteca Bootstrap.js é utilizada para tornar a página responsiva, adaptando para diferentes resoluções de tela.

Além disso, Google Maps API foi utilizado para desenvolvimento do mapa. Suas funcionalidades e adaptações foram usadas juntamente com a biblioteca JQuery.js para o carregamento de arquivos geojson, exibição e eventos de mouse.


# Visualizações

A página resultados permite duas visualizações interativas. 
 
A primeira é um painel (dashboard) onde o usuário pode interagir com as diferentes dimensões e em forma gráfica tirar ou confirmar suas próprias interpretações sobre o programa Bolsa Família. Também é possível fazer agrupamentos nesta visualização escolhendo mais de um fato.
 
Um exemplo de interação com os gráficos seria escolher o ano de 2014 e o mês de outubro como base, além de selecionar os estados do Nordeste do país. Com isso, pode-se notar os cinco municípios que receberam maior quantidade neste período, além do valor total e total de beneficiários.

O Dashboard foi desenvolvido pensando no conceito da análise exploratória de dados, que permite tanto usuários leigos quanto pessoas com certo conhecimento em estatística, avaliarem segundo suas perspectivas, o resultado do programa ao longo dos dados.

A segunda é um mapa do Brasil, inicialmente mostrado com os contornos dos estados. Ao interagir com o contorno de cada estado, é possível ver os valores do programa em um determinado período. Período este que também pode ser alterado. Ao aumentar o nível de detalhe (ou zoom) no mapa, o contorno mostrado passa a ser dos municípios do estado escolhido.  

O período selecionado inicialmente é o de dezembro de 2016, mas o usuário pode escolher outro ano a partir de 2011 e outro mês, ou mesmo o condensado de todos os meses. Ao alterar essa seleção o usuário deverá notar a atualização das cores do mapa, refletindo as novas escalas utilizadas para o período.

As cores de cada região são definidas pela escala da legenda, baseada no percentual da população que recebe o benefício. Quanto maior for esse percentual, mais quente é a cor utilizada. A partir dessa percepção o usuário pode comparar as diferentes regiões, indicando onde uma maior parte da população participa do programa.

Ao clicar sobre um dos estados é possível ver os mesmos dados a nível de municípios. O mapa contendo os contornos de cada município é carregados com os respectivos dados. A interação se dá de maneira semelhante àquela com os estados, assim como a atribuição de cores segue o mesmo princípio, respeitando a abrangência do estado. Para retornar à visualização de todos os estados basta clicar em qualquer município da visualização corrente.

Para enriquecer a percepção sobre os dados é apresentado para cada região o valor total destinado pelo programa. Assim o usuário pode facilmente entender a ordem de grandeza, juntamente com a abrangência, dos recursos do programa.

# Premissas

Considerando que os dados trabalhados tem relação direta com localidades no território brasileiro, a premissa diretriz para o projeto de visualização foi a representação dos mesmos utilizando os mapas dos estados e municípios como base.

Para tornar a comparação entre regiões mais intuitiva foram também consideradas diferentes escalas de cor e como melhor atribuir colorações a cada região. Inicialmente foram utilizados os valores dos pagamentos do programa Bolsa Família para gerar a escala, conferindo cores mais quentes às regiões que recebiam valores maiores em dado período. Entretanto observou-se que esse parâmetro não trazia uma percepção satisfatória, uma vez que estados mais populosos poderiam receber mais recursos sem que isso efetivamente significasse uma condição mais favorável. Assim foi definido que a escala de cores seria baseada nas proporções da população beneficiada pelo programa, indicando efetivamente a abrangência em cada região.

# Resultados

Como resultados expressivos do projeto, podemos destacar a possibilidade de navegar em diversas dimensões (UF, estado, ano e mês) para ver os fatos que se deseja interpretar e avaliar (Data mining). Utilizando o dashboard é possível visualizar o número de beneficiados, os valores totais das parcelas, os principais municípios e a distribuição pelos estados. Além disso, a visualização no mapa permite comparar as regiões por cores, utilizando os filtros mencionados.

# Lições aprendidas

O trabalho sobre o grande volume de dados foi um dos maiores desafios para a realização do projeto. Dado que muitas ferramentas tradicionais não estão preparadas para manipular arquivos tão grandes, houve uma dificuldade inicial para definir e estruturar a cadeia de processamento. Dessa forma uma grande quantidade de tempo e esforço foram aplicados para esta que é uma etapa anterior à visualização propriamente.
 
Cada arquivo (mensal) do BF compactado ocupa aproximadamente 350 MB. Descompactado, o tamanho salta para mais de 1,5 GB. Como há muita informação redundante, optou-se por gerar um novo arquivo somente com o que seria relevante para as transformações descritas acima.
 
Houve também uma preocupação em manipular e transformar o conjunto completo de dados, ao invés de tratar um subconjunto por vez. Essa abordagem trouxe maior robustez à solução, ao custo de um incremento de tempo de desenvolvimento. Dessa forma ficou evidente que um correto dimensionamento do esforço, com redução do escopo e balanceamento do tempo dedicado a cada etapa, são fundamentais para o andamento de um projeto de visualização de dados.
 
Uma dificuldade encontrada, comum para grandes volumes de dados, foi a conversão de formatos adequados para as ferramentas utilizadas.
 
Outra dificuldade interessante, por se tratar de séries históricas de dados, foi conferir a exatidão (acurácia) dos nomes dos municípios brasileiros, pois além da adição de novos municípios a cada ano, existe também a mudança de nomes de municípios. São ocorrências pequenas, mas que aconteceram e exigiram esforço adicional para contorná-las. Uma solução que teria dado um ganho ao projeto seria ter utilizado um código (único) para identificar cada UF+Município. Como os shapefiles do IBGE já contém um código único, este teria sido uma boa escolha.

Integrar as informações geográficas também foi um grande desafio. Como os dados do Bolsa Família possuem informações de municípios brasileiros, foi decidido visualizar um mapa com os contornos destes municípios, além é claro dos estados. Para isto foram feitas diversas experiências em manipular arquivos cartográficos e adicioná-los a uma página na internet. Para isto foi decidido usar o formato GeoJSON, que é um padrão aberto projetado para representar características geográficas simples, juntamente com seus atributos não espaciais, com base na Notação de Objeto JavaScript.

# Oportunidades de melhoria

O projeto de visualização de dados do programa BF foi desenvolvido utilizando os dados disponibilizados até o ano de 2016. Para a atualização da visualização com dados mais recentes que esta data seria necessária a execução manual da cadeia de processamento, compreendendo a filtragem de colunas, inclusão no banco de dados, geração das tabelas sumarizadas e integração ao formato cartográfico. Estes passos teriam que ser repetidos mensalmente para manter a visualização sempre atualizada com os últimos dados, a cada novo arquivo CSV lançado.
 
Portanto a primeira melhoria seria a automatização da verificação e inclusão de novas tabelas CSV. Um script poderia ser executado em um servidor para verificar se novos dados estão disponíveis e, caso encontrados, adicioná-los à visualização.
 
Uma outra ideia que surgiu foi criar um framework que pudesse ser usado em qualquer informação disponibilizada pelo site Portal da Transparência, permitindo que mesmo a partir de grandes volumes de dados um página sintetizando as informações e mostrando-as num painel integrado a um mapa fosse disponibilizada ao usuário final. Seria um framework de ETL (Extract-Transform-Load) que mostraria séries históricas (baseadas no tempo ano/mês).

Basicamente, todos os arquivos que estão no site do governo trazem as seguintes informações (há outras informações que não interessam para a proposta do framework):

1. UF: qual estado onde o recurso foi gasto ou disponibilizado

2. Município: qual cidade onde o recurso foi gasto ou disponibilizado

3. Pessoa: que foi o beneficiado, que tanto pode ser uma pessoa física (como no caso do BF) como pode ser uma pessoa física (o próprio município ou órgão ou instituição que recebeu o recurso)

4. Identificação única da pessoa: no caso do BF foi o Número de Inscrição Social (NIS). Trata-se de uma informação opcional uma vez que já temos a identificação da pessoa

5. Valor: quantidade monetária paga à pessoa

6. Ano e Mês do Pagamento: informação contida no próprio nome do arquivo disponibilizada

7. Ano e Mês da Competência: alguns pagamentos são retroativos.

No framework, uma vez escolhida a área que seria analisada, uma ferramenta para obter os dados dos arquivos CSV e convertê-los para o modelo do framework faria a conversão necessária. Uma vez, convertidos, as rotinas de sumarização e/ou agrupamento fariam as atualizações necessárias para deixar os dados no formato que o framework utilizaria para a visualização.
 
Numa interface de configuração, o usuário definiria o nome do novo programa/área de análise e selecionaria os dados obtidos no passo anterior.
 
O framework também teria diversos indicadores tais como população, IDH, índice de desemprego, etc... prontos para serem usados pelo usuário
 
No painel do framework, o usuário faria a escolha da série histórica que desejaria usar e também os indicadores escolhidos. Para cada escolha, uma janela no painel seria adicionada. A visualização da série histórica também poderia ser feita no mapa correspondente do estado/município.


