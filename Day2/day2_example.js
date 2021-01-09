//Load data to world_bank_project in msds697.
//mongoimport --db msds697 --collection world_bank_project --file=world_bank_project.json

use msds697

// Example 1
// Load world_bank_project.json to ”msds697” database’s “world_bank_project” collection and print only “borrower” information.

// Count the number of documents
db.world_bank_project.find().count() // 500

// Display results in an easy-to-read format.
db.world_bank_project.find().pretty()

db.world_bank_project.find({},{"borrower":true}).pretty() //returns _id
// To format the result, you can add the .pretty() to the operation.
db.world_bank_project.find({},{"borrower":1,"_id":0}).pretty() 
// The result from the below query is same as the above.
db.world_bank_project.find({},{"borrower":true,"_id":false}).pretty() 

// For the “world_bank_project” collection, return a document with the smallest approvalfy value.
// Sort and limit
db.world_bank_project.find().sort({"approvalfy":1}).limit(1)

// Example 2
// 1) From “world_bank_project” collection, find the number of documents where their sector1’s Percent is greater than or equal to  60.
db.world_bank_project.find({"sector1.Percent":{$gte:60}}).count()
// 2) From 1), print only “borrower” information.
db.world_bank_project.find({"sector1.Percent":{$gte:60}},{"borrower":true, "_id":false}).pretty()

// Example 3
// Find URLs of document where them1’s Name is “Water resource management” or themecode is 65.
db.world_bank_project.find({$or:[{"theme1.Name":"Water resource management"}, 
    					   {"themecode" : "65"}]},
    					   {"url":1, "_id":0})
    					   
// Example 4
// Find borrowers with impagency is either “MINISTRY OF EDUCATION” or “MINISTRY OF FINANCE”.
db.world_bank_project.find({"impagency":{$in:["MINISTRY OF EDUCATION","MINISTRY OF FINANCE"]}},
						   {"borrower":1, "_id":0})
				     .pretty()
				     
// Example 5
// From the world_bank_project collection, find all the project names ending with “project”.
db.world_bank_project.find({"project_name":{$regex:"Project$", $options:'i'}},
						   {"project_name":1,"_id":0})			
						   
// Example 6 
// Find impagency with project_name for which impagency is either “ministry of education” or “ministry of finance” 
// (case insensitive and multiline allowed).
db.world_bank_project.find({"impagency": {$in:[{$regex:"^ministry of education$", $options:'im'},
                                               {$regex:"^ministry of finance$", $options:'im'}]}},
						   {"impagency":1, "project_name":1, "_id":0})		
						   

// Example 7
// Find all project_name s ending with “Projects” and return its project_name and last theme_namecode.
db.world_bank_project.find({"project_name":{$regex:"project$", $options:'i'}}).pretty()

db.world_bank_project.find({"project_name":{$regex:"project$", $options:'i'}},
						   {"theme_namecode":{$slice:-1},"project_name":1, "_id":0})
					 .pretty()
					 
// For "Kihansi Catchment Conservation and Management Project", return its project_name and 2nd and 3rd theme_namecode.
db.world_bank_project.find({"project_name":"Kihansi Catchment Conservation and Management Project"}, 
                           {"theme_namecode":{$slice:[1,2]}, "project_name":true, "_id":false})
                           
                           
// Example 8
// Return majorsector_percent and project_name, where majorsector_percent’s Percent is greater than or equal to 70.
db.world_bank_project.find()
db.world_bank_project.find({"majorsector_percent.Percent":{$gte:70}}, 
                           {"majorsector_percent.$":true, "project_name":true, "_id":false})
                           
                           
// Example 9
// Return projectdocs, project_name for documents 
// which majorsector_percent's Percent is greater than or eqaul to 70.
db.world_bank_project.find({$and:[{"majorsector_percent.Percent":{$gte:70}}]})
db.world_bank_project.find({"majorsector_percent.Percent":{$gte:70}},
                           {"projectdocs.$":true, "project_name":true, "_id":false}) //Error
db.world_bank_project.find({"majorsector_percent.Percent":{$gte:70}},
                           {"projectdocs":{$elemMatch:{}}, 
                           "project_name":true, "_id":false})
                           
// Return projectdocs, project_name for documents 
// which majorsector_percent's Percent is greater than or eqaul to 70.
// Only include project docs if DocType is "PID" and DocDate is 2013.
db.world_bank_project.find({"majorsector_percent.Percent":{$gte:70}},
                           {"projectdocs":{$elemMatch:{"DocType" : "PID", "DocDate":{$regex:"2013$"}}}, 
                            "project_name":true, "_id":false})

// Example 10
// In world_bank_project, find documents where majorsector_percent is 
// {"Name" : "Health and other social services", "Percent" : NumberInt(100)}
majorsector_percent_input = {
            "Name" : "Health and other social services", 
            "Percent" : NumberInt(100)
        }
db.world_bank_project.find({"majorsector_percent":majorsector_percent_input})

// Example 11
db.world_bank_project.find({"id":"P130164"})
//Using aggregate(), return documents where "id" is "P130164"
db.world_bank_project.aggregate({$match:{"id":"P130164"}})
//Using aggregate(), return documents where "id" is "P130164" and its lendprojectcost in 1000s (lendprojectcost_k)
db.world_bank_project.aggregate({$match:{"id":"P130164"}},
                                {$project:{lendprojectcost_k:{$divide:["$lendprojectcost",1000]}}})
db.world_bank_project.aggregate({$project : {new_field : {$log:[100, 10]}}})
//Using aggregate(), return documents where "id" is "P130164" and its lendprojectcost in 1000s (lendprojectcost_k)
//and its projectdocs
db.world_bank_project.aggregate({$match:{"id":"P130164"}},
                                {$project:{lendprojectcost_k:{$divide:["$lendprojectcost",1000]}, 
                                           "projectdocs":true}})
// Using aggregate(), return documents where "id" is "P130164" and its lendprojectcost in 1000s (lendprojectcost_k)
// and its unwinded projectdocs
db.world_bank_project.aggregate({$match:{"id":"P130164"}},
                                {$project:{lendprojectcost_k:{$divide:["$lendprojectcost",1000]}, 
                                           "projectdocs":true}},
                                {$unwind:"$projectdocs"})

// Using aggregate(), return documents where "id" is "P130164" and its lendprojectcost in 1000s (lendprojectcost_k)
// and its unwinded projectdocs
// ordered by projectdocs.DocTypeDesc in ascending order
db.world_bank_project.aggregate({$match:{"id":"P130164"}},
                                {$project:{lendprojectcost_k:{$divide:["$lendprojectcost",1000]},
                                           "projectdocs":true}},
                                {$unwind:"$projectdocs"},
                                {$sort:{"projectdocs.DocTypeDesc":1}})
                                
// Using aggregate(), return documents' unique projectdocs.DocTypeDesc and its count 
// for document which "id" is "P130164" 
// ordered by projectdocs.DocTypeDesc in ascending order                                
db.world_bank_project.aggregate({$match:{"id":"P130164"}},
                                {$project:{"projectdocs":true}},
                                {$unwind:"$projectdocs"},
                                {$group:{_id :"$projectdocs.DocTypeDesc", count:{$sum:1}}},
                                {$sort:{"_id":1}})                                
                                
                                
// Example 12
// In world_bank_project, 1) find a doucment where totalcommamt is 75000000 and 
// 2) find the unique names of projectdocs’ DocType and the number of projectdocs belonging to the sorted by DocType.
//Step 1
db.world_bank_project.aggregate({$match:{"totalcommamt" : 75000000}}).pretty()

//Step 2					 
db.world_bank_project.aggregate({$match:{"totalcommamt" : 75000000}},
								{$project:{"projectdocs":1}}).pretty()

//Step 3					 
db.world_bank_project.aggregate({$match:{"totalcommamt" : 75000000}},
								{$project:{"projectdocs":1}},
								{$unwind:"$projectdocs"})
		
//Step 4						
db.world_bank_project.aggregate({$match:{"totalcommamt" : 75000000}},
								{$project:{"projectdocs":1}},
								{$unwind:"$projectdocs"},
								{$group:{"_id":{"DocType":"$projectdocs.DocType"}}}) // _id is required.

//Step 5
db.world_bank_project.aggregate({$match:{"totalcommamt" : 75000000}},
								{$project:{"projectdocs":1}},
								{$unwind:"$projectdocs"},
								{$group:{"_id":{"DocType":"$projectdocs.DocType"}, 
								    	 "count": {$sum: 1}}}
								)		
							
//Step 6							    
db.world_bank_project.aggregate({$match:{"totalcommamt" : 75000000}},
								{$project:{"projectdocs":1}},
								{$unwind:"$projectdocs"},
								{$group:{"_id":{"DocType":"$projectdocs.DocType"}, 
								    	 "count": {$sum: 1}}},
								{$sort:{"_id.DocType":1}}) 
								
// Example 13
// For world_bank_project, 
// 1) Find a document where  "countrycode" is "AO” and see its executionStats using cursor.explain("executionStats").
db.world_bank_project.find({"countrycode" : "AO"}).explain("executionStats") //"nReturned" : 1.0, "totalDocsExamined" : 500.0

// 2) Create a hashed-index  on “countrycode”.
db.world_bank_project.createIndex({"countrycode":"hashed"})

// 3) Find a document where  "countrycode" is "AO” and see its executionStats using cursor.explain("executionStats").
db.world_bank_project.find({"countrycode" : "AO"}).explain("executionStats")	//"nReturned" : 1.0, "totalDocsExamined" : 1.0				
                   
// 4) Drop the index
db.world_bank_project.dropIndex({"countrycode":"hashed"})


// Extra Question
// List the address’ coordinate and the number of documents belong to it in descending order.
db.business.aggregate({$project:{"address.coord":true, "_id":false}},
                      {$group:{"_id":"$address", "count":{$sum:1}}},
                      {$sort:{"count":-1}},
                      {$project:{"address":"$_id", "_id":false, "count":true}})
