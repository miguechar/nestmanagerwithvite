from flask import Blueprint, request, jsonify
import pandas as pd
import uuid

csvreader_bp = Blueprint("csvreaderbp", __name__)


@csvreader_bp.route("/csvreader", methods=['POST'])
def index():
    files = request.files.getlist('files')

    for file in files:
        try:
            df = pd.read_excel(file)
            if pd.api.types.is_numeric_dtype(df.columns[0]) and pd.api.types.is_numeric_dtype(df.columns[1]):
                # This is a simplified check; adjust as needed.
                return jsonify(df.to_dict())
        except Exception as e:
            # Handle exceptions or invalid files
            print(e)
            continue

    return jsonify({'error': 'No suitable file found'}), 400

@csvreader_bp.route("/excelreader", methods=['POST'])
def read():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        sheet_index = 0
        df = pd.read_excel(file, sheet_name=0)
        # df = df.where(pd.notnull(df), None)
        df.fillna(value="", inplace=True)
        print(df)
        # Process the DataFrame as needed
        return df.to_dict('records')
        # return jsonify(df.head().to_dict(orient='records'))  # Using orient='records' for a list of dicts
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@csvreader_bp.route('/lcstrialcards', methods=['POST'])
def process_excel_paths():
    paths = request.json  # This should be your array of objects containing paths
    results = []

    for item in paths:
        vessel = item.get('vessel')
        file_path = item.get('path')
        try:
            df = pd.read_excel(file_path, sheet_name=0)
            df.fillna(value="", inplace=True)
            # Generate a UUID for each row and add it as a new column
            df['uid'] = [str(uuid.uuid4()) for _ in range(len(df))]
            processed_data = df.to_dict('records')
            results.append({
                'vessel': vessel,
                'data': processed_data
            })
        except Exception as e:
            # Handle exceptions, e.g., file not found, or log errors
            print(f"Error processing {file_path}: {e}")
            results.append({
                'vessel': vessel,
                'error': str(e)
            })
    
    return jsonify(results)