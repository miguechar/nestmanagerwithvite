from flask import Blueprint, request, render_template, redirect

pdfparse_bp = Blueprint("pdfreader", __name__)

@pdfparse_bp.route("/testing")
def index():
    return "Hello World.... again!"