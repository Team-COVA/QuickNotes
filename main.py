from flask import (Flask,
render_template)

def create_app():
    # create and configure the app
    app = Flask(__name__)

    # a simple page that says hello
    # listen for requests on route "/"
    @app.route('/')
    def index():
        return render_template("index.html")

    return app
