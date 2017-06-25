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

Para manipular os arquivos Shapefile foi utilizada a suíte QGIS que permite manipular os arquivos e gerar várias saídas além dos contornos que podem ser usados tanto pelo Google Maps, Google Earth ou mesmo como recursos para serem manipulados em desenvolvimento de aplicativos e páginas WEB. Uma saída da suíte é o formato GeoJSON citado acima.

