///////////////////////////////////////////////
//     To run this script mongo < ex03.js    //
///////////////////////////////////////////////


// Example 3 Data types -
// Array – [Element1, Element2,…]

// Embeded Documents


//ObjectId


//Basic Math

//JavaScript



// Example 4
// Create(Insert)

//Insert

// Create and insert ”Yannet” document into the collection.

//Insert


// Example 5
// Create documents of terence and shan and insert it to the “friend” collection using bulk insert.


//Bulk Insert 

//Find


// Example 6
//Import raw data - do it on the terminal (not on Mongo shell

//mongoimport --db msds697 --collection business --file ../Data/business.json


// Example 7
// In msds697,
// Find all and only one documents in the friend collection.

// Find all documents where address’s city is San Francisco.


//Example 8
//Find all businesses in "Manhattan" in "business" under the “msds697” database.

//Only business names?

// Example 9
// Update 

// Replace the document

// without upsert

// with upsert


// Example 10
//set the new field using $set

// without multi

// with multi

//unset the field

//increase a value of the field.

//rename a field.

//$min : updates the value of the field to a specified value 
//       if the specified value is less than the current value of the field. 

//$max : Only updates the field to a specified value 
//       if the specified value is greater than the existing field value.


// Example 11

// Change “address” field name to “officeAddress” in all the documents.

// For “Terence Parr”, change the number of cats to be equal to or less than 2.


// Example 12
// In the "business" collection, for "White Castle" on "Pennsylvania Avenue" , 
// insert a new grades with "date" : today, "grade" : "A", and "score" : 9.

// Remove the last grades for for "White Castle" on "Pennsylvania Avenue" 

// Remove all reviews with Cs for restaurant_id, 40364467 .


//Change all scores of "40356483" from 10 to 11.
//$

//$[<identifier>]

//mongoimport --db msds697 --collection business --file business.json 

//$[]

// Example 13
// Delete one item which city is “SF”
// Delete all items which city is “SF”
// What is the best way to drop all? 
//// .deleteMany({}) vs .drop()

//Remove One

//Remove Many

//Drop the entire collection.

