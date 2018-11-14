const scraper = require('./scraper.js')

module.exports = function parenthesisBugSplat(sentence) {

    // replace the keyword to => "to", to get around a bug that crops name of the ingredient 
    if ((sentence.indexOf("(")) && (sentence.indexOf(")"))) {
        var inTheParenthesis = sentence.substring(
            sentence.lastIndexOf("(") + 1, 
            sentence.lastIndexOf(")")
        );
        var regex = /to/gi;
        var newSentence = inTheParenthesis.replace(regex, '-to-')
        sentence = sentence.replace(inTheParenthesis, newSentence)
    }

    (sentence.indexOf(",")) ? sentence = sentence.split(',')[0] : sentence;
    (sentence.indexOf("(")) ? sentence = sentence.split('(')[0] : sentence;
    return sentence
}