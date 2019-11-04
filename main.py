from flask import (Flask,
render_template, jsonify)
import datetime

def create_app():
    # create and configure the app
    app = Flask(__name__)

    # a simple page that says hello
    # listen for requests on route "/"
    @app.route('/')
    def index():
        return render_template("index.html")



    @app.route('/getServerTime')
    def getServerTime():
        #set a nice message to send to the user
        message = "The current time on the server is: "

        #gets current time and formats it nicely
        currentTime = datetime.datetime.now().strftime("%b %d %Y")
        message += str(currentTime) + "\n"

        #send the message as a response
        return message

    @app.route('/submitNote')
    def submitNote():
        return("put data here")


    return app



