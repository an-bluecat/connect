from flask import Flask
import json

import mysql.connector

app = Flask(__name__)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="",
  database="connect"
)
print(mydb)

@app.route('/mypage')
def hello_world():
    x = [{"name": "jerry", "age": 20}]
    return json.dumps(x)

    
