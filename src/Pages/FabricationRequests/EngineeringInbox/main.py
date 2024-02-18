# pip install pyautocad

from pyautocad import Autocad, APoint

def create_dwg_and_insert_block(block_path, block_name):
    # Initialize a connection to AutoCAD
    acad = Autocad(create_if_not_exists=True)
    
    # Create a new DWG file (This actually just opens a new drawing in AutoCAD)
    acad.app.Documents.Add()

    # At this point, the newly created document is the active document,
    # so acad.doc should already reference it.
    
    # Define the path to the block you want to insert
    full_block_path = f"{block_path}\\{block_name}.dwg"
    
    # Define the insertion point for the block (for example, at coordinates 0, 0, 0)
    insertion_point = APoint(0, 0, 0)
    
    # Insert the block
    acad.model.InsertBlock(insertion_point, full_block_path, 1, 1, 1, 0)
    
    # Optionally, save the new DWG file if needed
    # Replace 'YourSavePath' with the actual path where you want to save the new drawing
    acad.doc.SaveAs("C:\\Downloads\\NewDrawing.dwg")


# Usage example
block_path = "C:\\Users\\Mchar\\Documents\\Caisson\\Blocks\\nestBlock.dwg"
block_name = "CAISSON NEST BLOCK"
create_dwg_and_insert_block(block_path, block_name)
