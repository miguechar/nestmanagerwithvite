from flask import Blueprint

status_bp = Blueprint("status", __name__)

@status_bp.route('/api/status')
def status_of_server():
    return({"status" : "Server is Running"})

