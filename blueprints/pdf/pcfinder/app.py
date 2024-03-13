import os
from flask import Blueprint, request, render_template, redirect, jsonify

pcfinder_bp = Blueprint("pcfinder", __name__)

@pcfinder_bp.route('/get-folders', methods=['GET'])
def get_folders():
    directory_path = "//fmmfs001/File Transfer Folder/CBOM TEAM - WORK FROM ENGINEERING/COMPLETE"
    try:
        directories_info = []
        # List all folders in the directory_path
        folders = [name for name in os.listdir(directory_path) if os.path.isdir(os.path.join(directory_path, name))]
        
        for folder in folders:
            folder_path = os.path.join(directory_path, folder)
            module = None  # Default module to None
            
            # Scan through each folder for PDF files
            for file in os.listdir(folder_path):
                if file.endswith('.pdf'):
                    # Check if the 4th and 5th characters are "00"
                    if file[3:5] == "00":
                        # Extract the first three letters as module
                        module = file[:3]
                        # find hull
                        string = file
                        spacePosition = string.find(" ")
                        formatPosition = string.find(".pdf")
                        hull = file [spacePosition : formatPosition]
                        break  # Stop checking once a matching file is found
            
            # Append the directory (folder) name and module to the list
            directories_info.append({"name": folder, "module": module, "hull": hull})
        
        # Return the list of directories and their modules as JSON
        return jsonify(directories_info)
    except Exception as e:
        return jsonify({"error": str(e)})