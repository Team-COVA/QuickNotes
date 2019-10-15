# Quick Notes

This is a simple on-disk note taking/saving app for learning purposes.

## Installation

Quick Notes uses Flask for dealing with requests. In order to run it flask must be installed.

You can install flask using [pip, which can be installed here.](https://pip.pypa.io/en/stable/installing/)

After installing pip open a terminal window and run:

```bash
pip install flask
```

## Usage
The application just needs to have a main.py for flask to point to before it can be run.

Navigate to the project directory in a terminal window and on Linux/OSX run:

```bash
export FLASK_APP=main.py
```
On Windows command prompt run:

```cmd
set FLASK_APP=main.py
```

After the environment variable has been set, go ahead and type:

```bash
flask run
```
You can navigate to 127.0.0.1:/5000 or localhost:5000/ in a web browser to see the app running.

If you wish to use PyCharm community edition to work with the application, you can follow the setup steps [here](https://blog.miguelgrinberg.com/post/setting-up-a-flask-application-in-pycharm)

## License
[MIT](https://choosealicense.com/licenses/mit/)