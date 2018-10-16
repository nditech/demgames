export default (str, char) => {
    return str.substring(0, str.indexOf(char) - 1);
};