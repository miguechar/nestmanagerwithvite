from flask import Blueprint, request, send_file, render_template, redirect
from PyPDF2 import PdfMerger
import tempfile
import os

pdfProcessing_bp = Blueprint("pdfProcessing", __name__)

@pdfProcessing_bp.route('/merge-pdfs', methods=['POST'])
def merge_pdfs():
    data = request.json
    pdf_paths = data['paths']
    
    merger = PdfMerger()

    for path in pdf_paths:
        full_path = os.path.join(path)
        merger.append(full_path + ".pdf")

    temp_file = tempfile.NamedTemporaryFile(delete=False)
    merger.write(temp_file.name)
    merger.close()

    return send_file(temp_file.name, mimetype='application/pdf')