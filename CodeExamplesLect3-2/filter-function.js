const words = [
    'spray',
    'limit',
    'elite',
    'exuberant',
    'destruction',
    'present'
];
const filteredWords = words.filter(function (word) {
    return word.length > 6;
});

console.log(filteredWords);
// ["exuberant", "destruction", "present"]