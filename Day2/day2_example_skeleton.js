//Load data to world_bank_project in msds697.
//mongoimport --db msds697 --collection world_bank_project --file=world_bank_project.json


// Example 1
// Load world_bank_project.json to ”msds697” database’s “world_bank_project” collection and print only “borrower” information.

// Count the number of documents

// Display results in an easy-to-read format.


db.world_bank_project.find({},{"borrower":true}).pretty() //returns _id
// To format the result, you can add the .pretty() to the operation.

// The result from the below query is same as the above.

// For the “world_bank_project” collection, return a document with the smallest approvalfy value.
// Sort and limit

// Example 2
// 1) From “world_bank_project” collection, find the number of documents where their sector1’s Percent is greater than or equal to  60.

// 2) From 1), print only “borrower” information.

// Example 3
// Find URLs of document where them1’s Name is “Water resource management” or themecode is 65.

    					   
// Example 4
// Find borrowers with impagency is either “MINISTRY OF EDUCATION” or “MINISTRY OF FINANCE”.


// Example 5
// From the world_bank_project collection, find all the project names ending with “project”.
		
						   
// Example 6 
// Find impagency of project_name is either “ministry of education” or “ministry of finance” 
// (case insensitive and multiline allowed).
						   
						   

// Example 7
// Find all project_name s ending with “Projects” and return its project_name and last theme_namecode.


// For "Kihansi Catchment Conservation and Management Project", return its project_name and 2nd and 3rd theme_namecode.


// Example 8
// Return majorsector_percent and project_name, where majorsector_percent’s Percent is greater than or equal to 70.
                      
                           
// Example 9
// Return projectdocs, project_name for documents 
// which majorsector_percent's Percent is greater than or eqaul to 70.


// Return projectdocs, project_name for documents 
// which majorsector_percent's Percent is greater than or eqaul to 70.
// Only include project docs if DocType is "PID" and DocDate is 2013.


// Example 10
// In world_bank_project, find documents where majorsector_percent is 
// {"Name" : "Health and other social services", "Percent" : NumberInt(100)}


// Example 11

//Using aggregate(), return documents where "id" is "P130164"

//Using aggregate(), return documents where "id" is "P130164" and its lendprojectcost in 1000s (lendprojectcost_k)


//Using aggregate(), return documents where "id" is "P130164" and its lendprojectcost in 1000s (lendprojectcost_k)
//and its projectdocs




// Using aggregate(), return documents where "id" is "P130164" and its lendprojectcost in 1000s (lendprojectcost_k)
// and its unwinded projectdocs


// Using aggregate(), return documents where "id" is "P130164" and its lendprojectcost in 1000s (lendprojectcost_k)
// and its unwinded projectdocs
// ordered by projectdocs.DocTypeDesc in ascending order

                                
// Using aggregate(), return documents' unique projectdocs.DocTypeDesc and its count 
// for document which "id" is "P130164" 
// ordered by projectdocs.DocTypeDesc in ascending order                                
                           
                                
                                
// Example 12
// In world_bank_project, 1) find a doucment where totalcommamt is 75000000 and 
// 2) find the unique names of projectdocs’ DocType and the number of projectdocs belonging to the sorted by DocType.
//Step 1


//Step 2					 


//Step 3					 

		
//Step 4						


//Step 5
		
							
//Step 6							    

								
// Example 13
// For world_bank_project, 
// 1) Find a document where  "countrycode" is "AO” and see its executionStats using cursor.explain("executionStats").

// 2) Create a hashed-index  on “countrycode”.

// 3) Find a document where  "countrycode" is "AO” and see its executionStats using cursor.explain("executionStats").
                  
// 4) Drop the index
