module.exports.fix = function fix(sentence) {

    // replace the keyword to => "to", to get around a bug that crops name of the ingredient 
    if ((sentence.indexOf("(")!== -1) && (sentence.indexOf(")")!== -1)) {
        var inTheParenthesis = sentence.substring(
            sentence.lastIndexOf("(") + 1, 
            sentence.lastIndexOf(")")
        );
        var regex = /to/gi;
        var newSentence = inTheParenthesis.replace(regex, '*to*')
        sentence = sentence.replace(inTheParenthesis, newSentence)
    }

    return sentence
}

module.exports.beautify = function(sentence) {
    (sentence.indexOf(",") !== -1) ? sentence = sentence.split(',')[0] : sentence;
    (sentence.indexOf("(") !== -1) ? sentence = sentence.split('(')[0] : sentence;
    return sentence;
} 