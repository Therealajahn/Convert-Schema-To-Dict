# JSON Schema to Python Dict Generator

This project provides a JavaScript utility that converts **JSON Schema definitions** into Python functions.  
Each generated Python function creates a dictionary (`dict`) from schema properties, handling both required and optional fields.

---

## 📖 Overview

The script iterates over `schema.definitions` and:

1. Creates a Python function for each definition.
2. Initializes variables for each property.
3. Builds a dictionary (`data`) with keys corresponding to schema properties.
4. Handles required vs. optional properties:
   - **Required**: always included in the dictionary.
   - **Optional**: only included if a value is provided.
5. Prints and returns the generated dictionary(in the browser console).
6. Downloads the result as `json_to_dict.py`.

---

## 🧩 Key Functions

- **`camelToSnakecase(camelCase)`**  
  Converts camelCase names from the schema into Pythonic `snake_case`.

- **`startFunction(currentDefinition)`**  
  Creates a new Python function header for the current schema definition.

- **`addVariable(currentProperty)`**  
  Adds placeholder variable assignments (`property = ""`) for each property.

- **`addDict(currentProperty, requiredArray)`**  
  Adds each property into the `data` dictionary, respecting required/optional rules.

- **`finishFunction(currentDefinition)`**  
  Combines the generated code and appends it to the `pythonString`.

- **`downloadPythonFile(filename, content)`**  
  Triggers download of the generated Python file.

---

## 🚀 Usage

1. Define your JSON Schema in a variable called `schema` (must include `definitions`).
2. Run the script in a browser environment (Node.js version would require minor adjustments).
3. After processing, a Python file `json_to_dict.py` will be downloaded containing the generated functions.

---

## 📂 Example Output

For a schema definition like:

```json
"User": {
  "required": ["id"],
  "properties": {
    "id": {"type": "string"},
    "name": {"type": "string"}
  }
}
```
The generated Python function will look like:
```
def user(client_data):
    id = ""
    name = ""

    data = {}
    data["id"] = id
    if name:
        data["name"] = name

    print(data)
    return data

user('')
```
