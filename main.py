from flask import (Flask,
render_template, request)

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
    @app.route('/submitNote', methods=['POST'])
    def notePrint():

        titleText = request.form["quicknote_title"]
        contentText = request.form["qncontents"]
        #qnTitle = "Title: " + titleText
        #qnContent = "Content: " + contentText

        # saves the date the note was created
        #createDate = datetime.datetime.now().strftime("%b %d %Y")
        #dateMessage = "QuickNote Created On: " + str(createDate)
        with open('/submitNotes', 'w') as titleText:
            f.write('contentText\n')


        #Unsure if this would work. Directory is referenced, but seems redundant.
        #outFileName = "\QuickNotes\\submitNotes"
        #outFile = open(outFileName, "w")
        #outFile.write(qnTitle + qnContent)
        #outFile.close()
        #return (qnTitle + '\n' + qnContent+ dateMessage)







    return app