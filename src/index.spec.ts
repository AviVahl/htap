import { expect } from 'chai';
import { htap } from './index';

describe('htap', () => {
    let testCases: { [input: string]: string } = Object.create(null);

    // testCases['INPUT'] = 'EXPECTED OUTPUT';

    // empty input
    testCases[''] = '.';

    // unix
    testCases['/'] = '/';
    testCases['/path'] = '/path';
    testCases['/path/'] = '/path';
    testCases['/some/path'] = '/some/path';

    // windows
    testCases['c'] = 'c';
    testCases['c:'] = 'c:';
    testCases['c:/'] = 'c:';
    testCases['c:/path'] = 'c:/path';
    testCases['c:/path/'] = 'c:/path';
    testCases['c:/some/path/'] = 'c:/some/path';

    // regex safety
    testCases['c:\\temp\\new'] = 'c:/temp/new';

    // relative paths
    testCases['.'] = '.';
    testCases['./'] = '.';
    testCases['./path'] = './path';
    testCases['./path/'] = './path';
    testCases['..'] = '..';
    testCases['../'] = '..';
    testCases['../path'] = '../path';
    testCases['../path/'] = '../path';
    testCases['../../path'] = '../../path';

    // relative mixed . and ..
    testCases['./..'] = '..';
    testCases['../.'] = '..';
    testCases['./../'] = '..';
    testCases['../././..'] = '../..';
    testCases['/../..'] = '../..';
    testCases['/../../'] = '../..';
    testCases['../../'] = '../..';

    // two paramaters
    testCases['/some, ./file'] = '/some/file';
    testCases['/usr/local, /root/bin'] = '/usr/local/root/bin';
    testCases['/some/path, ../file'] = '/some/file';
    testCases['/some/../path, ./to/a/../file'] = '/path/to/file';
    testCases['/some, ..'] = '/';
    testCases['/some, ../..'] = '..';
    testCases['/some, ../..'] = '..';
    testCases['some/path, ..'] = 'some';
    testCases['some/path, ../../'] = '.';
    testCases['some/path, ../../..'] = '..';
    testCases['some/path, /..'] = 'some';
    testCases['some/path, folder/file'] = 'some/path/folder/file';
    testCases['some/path, ../folder/file'] = 'some/folder/file';
    testCases['some/path, ../../folder/file'] = 'folder/file';

    // no initial slash
    testCases['path'] = 'path';
    testCases['path/'] = 'path';
    testCases['some/path'] = 'some/path';
    testCases['some/path/'] = 'some/path';
    testCases['some, ..'] = '.';

    for (let input in testCases) {
        const expectedOutput = testCases[input];
        testInput(input, expectedOutput);

        // all base cases only include Unix-style separators
        // the following section creates the Windows-style and mixed-style cases
        // if (input.includes('/')) {
        //     testInput(input.replace(/\//g, '\\'), expectedOutput);
        //     testInput(input.replace(/\//g, '/\\'), expectedOutput);
        // }
    };
});

function testInput(params: string, expectedOutput: string) {
    const paramsArr = params.split(', ');
    it(`htap(${serializeParameters(paramsArr)}) => ${expectedOutput}`, () => {
        expect(htap(...paramsArr)).to.equal(expectedOutput);
    });

}
function serializeParameters(params: string[]) {
    return `'${escapeWinSlash(params.join(`', '`))}'`
};
function escapeWinSlash(path: string) {
    return path.replace(/\\/g, '\\\\');
}
