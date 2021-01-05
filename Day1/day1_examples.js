///////////////////////////////////////////////
//     To run this script mongo < ex03.js    //
///////////////////////////////////////////////

use msds697
db.dropDatabase()
db.week1_example.drop()
db.createCollection('week1_example')

// Example 3 Data types -
// Array – [Element1, Element2,…]
diane = {"favorite": ["Children"]}

diane = {"favorite": ["Children", 7, ["Database", "Machine Learning"]]}

// Embeded Documents
diane = {"name" : "Diane MK Woodbridge",
         "address" : {"street" : "101 Howard St", "city" : "San Francisco",
         "state" : "CA"}}

//ObjectId
ObjectId()

//Basic Math
x = 200
x / 23

//JavaScript
Math.sin(Math.PI)

msds_string = "USF MSDS"
msds_string = msds_string.replace("MSDS", "Master in Data Science")


// Example 4
// Create(Insert)
diane = {"name" : "Diane MK Woodbridge",
         "address" : {"street" : "101 Howard St", "city" : "San Francisco",
         "state" : "CA"}}
//Insert
db.friend.insert(diane)
db.friend.find()

// Create and insert ”Yannet” document into the collection.
yannet = {"name":"Yannet Interian", 
    	  "address" : {"street" : "101 Howard", "city" : "San Francisco", 
    	  "state" : "CA"}}

//Insert
db.friend.insert(yannet)
db.friend.find()

// Example 5
// Create documents of terence and shan and insert it to the “friend” collection using bulk insert.
terence =  {"name":"Terence Parr", 
    	 "address" : {"street" : "101 Howard", "city" : "San Francisco", 
    	 "state" : "CA"}}
shan = {"name":"Shan Wang", 
    	 "address" : {"street" : "101 Howard", "city" : "San Francisco", 
    	 "state" : "CA"}}


//Bulk Insert 
db.friend.insert([terence, shan])

//Find
db.friend.find()
db.friend.find(terence)
db.friend.find([terence, shan])

// Example 6
//Import raw data - do it on the terminal (not on Mongo shell

//mongoimport --db msds697 --collection business --file ../Data/business.json
use msds697
db.business.findOne()

// Example 7
// In msds697,
// Find all and only one documents in the friend collection.
db.friend.find()
db.friend.findOne()

// Find all documents where address’s city is San Francisco.
db.friend.find({"address.city":"San Francisco"})


// Example 8
//Find all businesses in "Manhattan" in "business" under the “msds697” database.
db.business.find({"borough":"Manhattan"})
//Only business names?
db.business.find({"borough":"Manhattan"},{"name":true,"_id":false})


// Example 9
// Update 
diane = {"name" : "Diane MK Woodbridge",
         "address" : {"street" : "101 Howard St", "city" : "San Francisco",
         "state" : "CA"}}
diane.title = 'Assistant Professor' //Update the document
diane

// Replace the document
db.friend.find({"name":"Diane MK Woodbridge"})
db.friend.update({"name":"Diane MK Woodbridge"}, diane)
db.friend.find({"name":"Diane MK Woodbridge"})

kirsten = {"name" : "Kirsten Keihl",
         "address" : {"street" : "101 Howard St", "city" : "San Francisco",
         "state" : "CA"}}

// without upsert
db.friend.update({"name":"Kirsten Keihl"}, kirsten) 
db.friend.find({"name":"Kirsten Keihl"})

// with upsert
db.friend.update({"name":"Kirsten Keihl"}, kirsten, {upsert : true})
db.friend.find({"name":"Kirsten Keihl"})


// Example 10
//set the new field using $set
db.friend.find({"name" : "Terence Parr"})
db.friend.update({"name" : "Terence Parr"}, {$set : {"title":"Professor"}})
db.friend.find({"name" : "Terence Parr"})

// without multi
db.friend.update({"address.city" : "San Francisco"}, {$set : {"address.city":"SF"}})
db.friend.find()
// with multi
db.friend.update({"address.city" : "San Francisco"}, {$set : {"address.city":"SF"}},{multi: true})
db.friend.find()

//unset the field
db.friend.update({"name":"Diane MK Woodbridge"},{$unset:{"title":""}})
db.friend.find({"name" : "Diane MK Woodbridge"})

//increase a value of the field.
db.friend.update({"name":"Diane MK Woodbridge"},{db$inc : {"noCats":1 , "kidsCount" : 2}})
db.friend.find({"name" : "Diane MK Woodbridge"})

db.friend.update({"name":"Diane MK Woodbridge"},{$inc : {"noCats":1}})
db.friend.find({"name" : "Diane MK Woodbridge"})

//rename a field.
db.friend.update({"name":"Diane MK Woodbridge"},{$rename : {"noCats":"numCats"}})
db.friend.find({"name" : "Diane MK Woodbridge"})

//$min : updates the value of the field to a specified value 
//       if the specified value is less than the current value of the field. 
db.friend.update({"name":"Diane MK Woodbridge"},{$min : {"numCats":1}})
db.friend.find({"name" : "Diane MK Woodbridge"})

//$max : Only updates the field to a specified value 
//       if the specified value is greater than the existing field value.
db.friend.update({"name":"Diane MK Woodbridge"},{$max : {"numDogs":1}})
db.friend.find({"name" : "Diane MK Woodbridge"})


// Example 11
db.friend.find()
// Change “address” field name to “officeAddress” in all the documents.
db.friend.update({},{$rename : {"address":"officeAddress"}},{multi:true})

// For “Terence Parr”, change the number of cats to be equal to or less than 2.
db.friend.update({"name":"Terence Parr"}, {$min : {"numCats" : 2}})


// Example 12
// In the "business" collection, for "White Castle" on "Pennsylvania Avenue" , 
// insert a new grades with "date" : today, "grade" : "A", and "score" : 9.
db.business.find({"name":"White Castle", "address.street":"Pennsylvania Avenue"})
db.business.update({"name":"White Castle" ,"address.street":"Pennsylvania Avenue"}, {$push : {"grades": {
            "date" : new Date() ,
            "grade" : "A", 
            "score" : NumberInt(9)
        }}})
db.business.find({"name":"White Castle", "address.street":"Pennsylvania Avenue"})   

// Remove the last grades for for "White Castle" on "Pennsylvania Avenue" 
db.business.update({"name":"White Castle" ,"address.street":"Pennsylvania Avenue"},{$pop:{"grades":1}})
db.business.find({"name":"White Castle", "address.street":"Pennsylvania Avenue"})   


// Remove all reviews with Cs for restaurant_id, 40364467 .
db.business.find({"restaurant_id" : "40364467"}) // Two Cs
db.business.update({"restaurant_id" : "40364467"},{$pull:{"grades":{"grade":"C"}}})
db.business.find({"restaurant_id" : "40364467"}) // Zero Cs

 
//Change all scores of "40356483" from 10 to 11.
//$
db.business.find({"restaurant_id": "40356483"}) // has total 6 grades and 3 grades with 10 as a numeric score.
db.business.update({"restaurant_id": "40356483", "grades.score" : 10}, {$set:{"grades.$.score": 11}}) //One element is changed
db.business.find({"restaurant_id": "40356483"}) 
db.business.update({"restaurant_id": "40356483", "grades.score" : 10}, {$set:{"grades.$.score": 11}}) //One element is changed
db.business.find({"restaurant_id": "40356483"}) 
db.business.update({"restaurant_id": "40356483", "grades.score" : 10}, {$set:{"grades.$.score": 11}}) //One element is changed
db.business.find({"restaurant_id": "40356483"}) 
db.business.update({"restaurant_id": "40356483", "grades.score" : 10}, {$set:{"grades.$.score": 11}}) //One element is changed
db.business.find({"restaurant_id": "40356483"}) 

//$[<identifier>]
db.business.drop()
//mongoimport --db msds697 --collection business --file business.json 
db.business.update({"restaurant_id": "40356483", "grades.score" : 10},
		   {$set:{"grades.$[element].score": 11}}, { arrayFilters: [ { "element.score": 10 } ]})
db.business.update({"restaurant_id":"40356483"}, {$set:{"grades.$[element].score":11}},
		   {arrayFilters:[{"element.score":10}]})
db.business.find({"restaurant_id": "40356483"})  // Change all 3

//$[]
db.business.drop()
//mongoimport --db msds697 --collection business --file business.json 
db.business.update({"restaurant_id": "40356483", "grades.score" : 11}, {$set:{"grades.$[].score": 11}}) 
db.business.find({"restaurant_id": "40356483"}) // Change all 6

// Example 13
// Delete one item which city is “SF”
// Delete all items which city is “SF”
// What is the best way to drop all? 
//// .deleteMany({}) vs .drop()

//Remove One
db.friend.deleteOne({"address.city":"SF"})
db.friend.count()

//Remove Many
db.friend.deleteMany({"address.city":"SF"})
db.friend.count()

//Drop the entire collection.
db.friend.drop()
db.friend.count()


//Extra -
// For documents in business where zipcode is 10462, and street is "Castle Hill Avenue",
// Update its grade to "A+" if score is greater than 10.
db.business.find({"address.zipcode" : "10462", "address.street" : "Castle Hill Avenue"})

db.business.update({"address.zipcode" : "10462", "address.street" : "Castle Hill Avenue"},
                   {$set:{"grades.$[elem].grade":"A+"}},
                   {arrayFilters:[{"elem.score":{$gt:10}}], multi:true})
