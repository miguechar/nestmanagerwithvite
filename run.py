from flask import Flask
from flask_cors import CORS
from blueprints.pdf.pdfreader.app import pdfparse_bp
from blueprints.pdf.pdfprocessing.app import pdfProcessing_bp
from blueprints.pdf.pcfinder.app import pcfinder_bp
from blueprints.status.app import status_bp
from blueprints.csvreader.app import csvreader_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(status_bp)
app.register_blueprint(pdfparse_bp)
app.register_blueprint(pdfProcessing_bp)
app.register_blueprint(pcfinder_bp)
app.register_blueprint(csvreader_bp)

if __name__ == '__main__':
    app.run(debug= True, host="10.102.13.68", port=8070)