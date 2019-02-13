const expect = require('chai').expect;

/**
 * Function removes everything after the last occurrence of a character/word.
 * @param {str} str input string
 * @param {char} char character used as last position of string to cut
 */
const trimStr = (str, char) => {
    return str.substring(0, str.indexOf(char) - 1);
}

const cutStrInput = 'http://www.bbc.co.uk/news/world-us-canada-45052705';

describe('trim-str', () => {
    it('should remove everything before the last occurrence of a character', () => {
        expect(trimStr(cutStrInput, 'news')).to.equal('http://www.bbc.co.uk');
    });
});