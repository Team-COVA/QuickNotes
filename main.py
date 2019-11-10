from flask import (Flask,
render_template, request)

import datetime
import os.path
import stat
THIS_FILE_PATH = os.path.dirname(os.path.realpath(__file__))

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

    @app.route('/submitNote', methods=['POST'])
    def submitNote():

        titleText = request.json["Title"]
        contentText = request.json["Contents"]
        qnTitle = "Title: " + titleText
        qnContent = "Content: " + contentText

        # saves the date the note was created
        createDate = datetime.datetime.now().strftime("%b %d %Y")
        dateMessage = "QuickNote Created On: " + str(createDate)
        # Open, Write, Save

        save_path = "submitNote"
        save_path = os.path.join(THIS_FILE_PATH, save_path)
        name_of_file = titleText
        completeName = os.path.join(save_path, name_of_file + ".txt")
        if not os.path.isdir(save_path):
            os.makedirs(save_path)
            os.chmod(save_path,
                     stat.S_IRUSR | stat.S_IRGRP | stat.S_IROTH | stat.S_IXUSR | stat.S_IRUSR |
                     stat.S_IWUSR|stat.S_IWGRP|stat.S_IXGRP) # need to delete this eventually
        file1 = open(completeName, "w+")
        toFile = contentText # "Write what you want into the field"
        file1.write(toFile)
        file1.close()

        # Unsure if this would work. Directory is referenced, but seems redundant.
        return (qnTitle + '\n' + qnContent+ dateMessage)

    return app

