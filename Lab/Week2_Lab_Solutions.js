//Use Visual Studio Code (VSCode) for these exercises
//VSCode format shortcut: Shift + Option + F (Mac) and Shift + Alt + F (Windows)

//Start node in the command line app (Terminal on Mac). Test your solutions in command-line node by copying parts of your code from VSCode 
//and pasting them in node command-line app. You can copy/paste several lines at a time.

//If you want to run an entire nodeJS file, exit the command-line node (Ctrl + D), and type: node yourfilename.js

//Exercises

//1. Create an object "user" containing information about the user's: 
//	- first name
//	- last name
//	- department
//	- campus

var user = {
    firstName: "Olga",
    lastName: "Vechtomova",
    department: "Management",
    campus: "Waterloo"
};

//2. Change the value of "department".

user.department = "Management Sciences";

//3. Delete the attribute "campus" (both key and value).

delete user.campus;

//4. Add new attribute "university" and assign to it a value of your choice.

user.university = "University of Waterloo";

//5. Write a one-line statement to get the list of attribute names (i.e. keys).

Object.keys(user);

//6. Write a one-line statement to count the number of attributes the object "user" has.

Object.keys(user).length;


//7. Write a for...in loop to achieve the same result as in Exercise #5.

for (var key in user) {
    console.log(key);
}

//8. Write a method "isTermCoop" for object "user". The method will take two arguments (year, term) and will calculate 
// whether the user is on co-op term or not. The method should return a Boolean variable (true, false). The logic for the 
// calculation is as follows:
//
// - year 1, term "S" --> co-op;
// - year 2, term "W" --> co-op;
// - everything else --> not coop.
//
// Call this method with various parameters. What do you see?

user.isTermCoop = function (year, term) {
    var isCoop = false;
    if (year == 1 && term == 'S') {
        isCoop = true; 
    } else if (year == 2 && term == 'W') {
        isCoop = true;
    }
    return isCoop;
}

user.isTermCoop(1, 'S');

//9. Create a second object "user2" with the same keys as "user", but different values. Create an array "users" containing objects "user" and "user2". 
//How would you print to console the value of a given attribute (e.g., "lastName") of the second element of the array?

users[1].lastName;

//10. Create a prototype class "student" with attributes: 
//firstName: ""
//lastName: ""
//program: "",
//year: 1,
//term: 'F', 
//university: "University of Waterloo",
//
//and the following methods: 
//startNewTerm(year, term), which will assign new values to "year" and "term" attributes
//isTermCoop(year, term). Keep this method as a placeholder only (throw an error if called). See Slide 15 on Lect_2-1.pdf.


function student() { };

student.prototype.startNewTerm = function (year, term) {
    this.year = year;
    this.term = term;
}

student.prototype.isTermCoop = function (year, term) {
    throw new Error("I don't have a form yet");
}

student.prototype.firstName = "";
student.prototype.lastName = "";
student.year = 1;
student.term = 'F';



//11. Create an instance (object) of "student" class. 
//a) Call "startNewTerm(year, term)" method.
//b) Call "isTermCoop(year, term)" method. What do you see? 

var s = new student();
s.startNewTerm(1, "W"); 
console.log(s.isTermCoop(1, "S"));


//12. Create a subclass "MEngStudent" which will inherit the prototype of "student". See Slide 16.
//Extend this class by defining a new isTermCoop(year, term) method, following the logic in Exercise #8 above.


function MEngStudent() { };

MEngStudent.prototype = new student(); 
MEngStudent.prototype.__proto__ = student.prototype;
MEngStudent.prototype.isTermCoop = function (year, term) {
    var isCoop = false;
    if (year == 1 && term == 'S') {
        isCoop = true;
    } else if (year == 2 && term == 'W') {
        isCoop = true;
    }
    return isCoop;
}


//13. Create an instance (object) of "MengStudent" class, and assign specific values to attributes. Call the methods "startNewTerm()", "isTermCoop(year, term)".
//What do you see?

var mEngS = new MEngStudent();
mEngS.startNewTerm(1, "W"); 
console.log(mEngS.isTermCoop(1, "S"));







