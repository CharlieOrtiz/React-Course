// We write the Modash library in this file in the Unit Testing chapter
//1
function truncate(string, limit) {
    if(string.length > limit) {
        return string.slice(0, limit) + '...';
    } else {
        return string;
    }
}

function capitalize(string) {
    return (
        string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    );
}

function camelCase(string) {
    const words = string.split(/[\s|\-|_]+/);
    return [
        words[0].toLowerCase(), ...words.slice(1).map((word)=>capitalize(word)),
    ].join('');
}

const Modash = {
    truncate,
    capitalize,
    camelCase
};

export default Modash;