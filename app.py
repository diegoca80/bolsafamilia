import pandas as pd
from flask import Flask
from flask import render_template
import json
import os
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")
	
@app.route("/data")
def get_data():
    df1 = pd.read_csv("data/split_city_data.csv", sep = "\t", encoding = "latin1")
    df2 = pd.read_csv("data/BFTOTAISUF.csv", sep = "\t", encoding = "latin1")
    df = df1.merge(df2,how='left', left_on='city', right_on='NOME_MUNICIPIO')
	#Get n_samples records
    #n_samples = len(df.index)
    #df = df.sample(n=n_samples)
    df = df.dropna()
    df = df[["city", "uf", "latitude", "longitude", "SUM_PARCELAS", "ANO_MES_PAGAMENTO"]][:400000]
    return df.to_json(orient='records')	

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0',port=port,debug=True)