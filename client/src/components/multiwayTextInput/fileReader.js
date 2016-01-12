function isTextFile(file) {
    return file.type.indexOf('text/') > -1;
}

function readText(file) {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader();
    reader.onload = function resolveWithResult(event) {
      resolve(event.target.result);
    };
    reader.onerror = reject;

    reader.readAsText(file);
  });
}

export function readAllFiles(files) {
  return Promise.all(
    files
      .filter(isTextFile)
      .map(readText)
  );
}

export function readAllFilesFromEvent(event) {
  const files = event.target.files || event.dataTransfer.files || [];
  return readAllFiles([...files]);
}
