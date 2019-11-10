from flask import (Flask,
render_template, request)

import datetime
import os.path


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
        return ("put data here")

        save_path = ".\submitNote"
        name_of_file = titleText
        completeName = os.path.join(save_path, name_of_file + ".txt")
        file1 = open(completeName, "w")
        toFile = contentText # "Write what you want into the field"
        file1.write(toFile)
        file1.close()

        # Unsure if this would work. Directory is referenced, but seems redundant.
        return (qnTitle + '\n' + qnContent+ dateMessage)

    # Very old iteration of saveFile. Disregard.
    # def save('/submitNote', 'w'):
    #    with open('/submitNote', 'w') as f:
    #        f.write('contentText\n')
    return app

