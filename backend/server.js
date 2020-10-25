"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { stock, customers } = require("./data/inventory");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .post("/order", (req, res) => {

    let result_status = "error";

    let errorID= "";


    if(validateRepeat(req.body)["repeat-customer"] == "true"){
		errorID = "repeat-customer";
    }
    else if(validateEmail(req.body)["bad-email"] == "true"){
    	errorID = "missing-data";
    }
    else if(validateEmail(req.body)["bad-email"] == "true"){
    	errorID = "missing-data";
    }
    else if(validateMissing(req.body)["missing-data"] == "true"){
    	errorID = "missing-data";
    }
    else if(validateCanada(req.body)["undeliverable"] == "true"){
    	errorID = "undeliverable";
    }
    else{
    	result_status = "success";
    }

    res.status(200).json({
      "status": result_status,
      "error": errorID
    });
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })




  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));



const validateRepeat = (newCustomer) => {



  for (let i = 0; i < customers.length; i++) {

    if(newCustomer.email == customers[i].email){

    	return  {"repeat-customer":"true"};
    }
    else if(newCustomer.address.toLowerCase() == customers[i].address.toLowerCase()){
    	return  {"repeat-customer":"true"};
    }    
    else if(newCustomer.givenName.toLowerCase() ==customers[i].givenName.toLowerCase()){

    	if(newCustomer.surname.toLowerCase() == customers[i].surname.toLowerCase()){
    		return  {"repeat-customer":"true"};
    	}
    	else{
    		return  {"repeat-customer":"false"};
    	}


    }
    else{

    	if (i == (customers.length-1)) {
	    	return  {"repeat-customer":"false"};
    	}
    }
  }
}

const validateEmail = (newCustomer) => {

  if(newCustomer.email.indexOf('@') <= -1){
    	return  {"bad-email":"true"};
  }
  else{
  	return  {"bad-email":"false"};
  }


}

const validateMissing = (newCustomer) => {

	if(newCustomer.order == "tshirt"){
		if(newCustomer.size == "undefined"){
			return  {"missing-data":"true"};
		}
		else{
			return  {"missing-data":"false"};
		}
	}
	else{
		return  {"missing-data":"false"};
	}

}

const validateCanada = (newCustomer) => {

	if(newCustomer.country.toLowerCase() == "canada"){
		return  {"undeliverable":"false"};

	}
	else{
		return  {"undeliverable":"true"};
	}

}

