from flask import Flask, render_template

DEBUG = False
app = Flask(__name__)


@app.route('/') 
def accueil():
    return render_template('index.html')

@app.route('/1') 
def first():
    return render_template('index1.html')

@app.route('/2') 
def second():
    return render_template('index2.html')

@app.route('/3') 
def third():
    return render_template('index3.html')

@app.route('/4') 
def fourth():
    return render_template('index4.html')

@app.route('/5') 
def fifth():
    return render_template('index5.html')

@app.route('/6') 
def sixth():
    return render_template('index6.html')

@app.route('/7') 
def seventh():
    return render_template('index7.html')
