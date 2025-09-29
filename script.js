let pythonString = '';
let functionString = '';
let variableString = '';
let dictString = '';
let dictCreated = false;

for(currentDefinition in schema.definitions){
	console.log("\nDEFINITION: ",currentDefinition);
	startFunction(currentDefinition);
  let requiredArray = schema.definitions[currentDefinition].required;

	for(currentProperty in schema.definitions[currentDefinition].properties){
		addVariable(currentProperty);
		addDict(currentProperty,requiredArray);
	}
	finishFunction(currentDefinition);
}
downloadPythonFile('json_to_dict.py', pythonString);

function camelToSnakecase(camelCase){
	return camelCase
		.replace(/([A-Z])/,(match,p1) => `_${p1.toLowerCase()}`)
		.replace(/^_/,'')
}

function startFunction(currentDefinition){
	functionString += `\ndef ${camelToSnakecase(currentDefinition)}(client_data):`
}

function addVariable(currentProperty){
	variableString += `\n\t${currentProperty} = ""`
}

function addDict(currentProperty,requiredArray) {
	let isRequired = requiredArray.find(required =>
		required === currentProperty) ?
		true : false;
	if(!dictCreated){
		dictString += `\n\n\tdata = {}`;
		dictCreated = true;
	};
	let spacing = `\n\t`;
	if(!isRequired){
		dictString += `\n\tif ${currentProperty}:`;
		spacing = `\n\t\t`;
	};
	dictString += `${spacing}data["${currentProperty}"] = ${currentProperty}`;
}

function finishFunction(currentDefinition){
	pythonString +=
	functionString + variableString + dictString +
		`\n\n\tprint(data)\n\treturn data\n\n${camelToSnakecase(currentDefinition)}('')\n`;
	console.log('pythonString: ',pythonString);
	functionString = '';
	variableString = '';
	dictString = '';
	dictCreated = false;
}	

function downloadPythonFile(filename, content) {
    const file = new Blob([content], {type: 'text/plain'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}
