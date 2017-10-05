const UNIX_SEP = '/', WINDOWS_SEP = '\\';

export function htap(...paths: string[]): string {
    const pathArray: string[] = [];
    let lastChar = '';

    for (let path of paths) {
        path = path.trim();
        let pathChunk: string = '';
        for (let char of path) {
            if (char === WINDOWS_SEP) {
                char = UNIX_SEP; // turn Windows-style separators to Unix-Style
            }

            if (char !== UNIX_SEP) {
                pathChunk += char; // non-separator, add to current chunk
            } else if (lastChar !== UNIX_SEP) {
                addPathChunk(pathChunk, pathArray);
                pathChunk = '';
            }
            lastChar = char;
        }
        lastChar = UNIX_SEP;
        if (pathChunk !== '' || pathArray[pathArray.length - 1] === '') {
            addPathChunk(pathChunk, pathArray);
        }
    }
    const finalPath = pathArray.join(UNIX_SEP);
    if (!finalPath.length) {
        return '.'; // empty string is returned as current folder
    }
    return finalPath;
}

function addPathChunk(pathChunk: string, pathArray: string[]) {
    if (pathArray.length === 2 && pathArray[1] === '' && pathArray[0] === '') {
        pathArray.pop();
    }
    if (pathChunk === '..' && pathArray[pathArray.length - 1] !== '..') {
        const popedChunk = pathArray.pop();
        if (popedChunk === undefined || popedChunk === '.' || (popedChunk === '' && pathArray.length === 0)) {
            pathArray.push(pathChunk)
        } else if (pathArray.length === 1 && pathArray[0] === '') {
            pathArray.push(''); // this retains / at the beginning of the path
        }
    } else if (pathChunk !== '.' || pathArray.length === 0) {
        pathArray.push(pathChunk);
    }
}
