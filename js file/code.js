// POSTMAN CLONE

console.log("------------------------------------------------------ POSTMAN CLONE ------------------------------------------------------");

console.log("------------------------------- POSTMAN CLONE Code --------------------------------");

// Utility Functions
// Utility Function to get DOM element from string
function getElementFromString(string){
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
};


// Hide parametersBox initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";


// If the user clicks on params, hide the requestJsonBox
let paramsRadio = document.getElementById("paramsRadio");
let requestJsonBox = document.getElementById("requestJsonBox");
paramsRadio.addEventListener("click",()=>{
    requestJsonBox.style.display = "none";
    parametersBox.style.display = "block";
});

// If the user clicks on json, hide the parametersBox
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click",()=>{
    parametersBox.style.display = "none";
    requestJsonBox.style.display = "block";
});

// initialize number of parameters
let addedParamCount = 0;

// If the user clicks on addParam button, add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click",()=>{
    let params = document.getElementById("params");
    let string = `
        <div class="row my-3">
            <label for="parameter" class="col-sm-2 col-form-label">Parameter ${addedParamCount+2}</label>
            <div class="col-md-4">
                <input type="text" class="form-control" id="parameterKey${addedParamCount+2}" placeholder="Enter Parameter ${addedParamCount+2} key">
            </div>
            <div class="col-md-4">
                <input type="text" class="form-control" id="parameterValue${addedParamCount+2}" placeholder="Enter Parameter ${addedParamCount+2} value">
            </div>
            <button class="btn btn-primary col deleteparam">-</button>
        </div>
    `
    addedParamCount++;
    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // Add an event listener to remove the parameter on clicking deleteparam button
    let deleteparam = document.getElementsByClassName("deleteparam");
    for (item of deleteparam){
        item.addEventListener("click",(e)=>{
            e.target.parentElement.remove();
        });
    };
});


// If user clicks on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click",()=>{
    // Show please wait in the response box
    let responseJsonText = document.getElementById("responsePrims");
    responseJsonText.innerHTML = "Please wait... Fetching response...";
    Prism.highlightAll();
    // Fetch the all values user has entered
    let url = document.getElementById("urlField").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    // If user has used params option instead of json, colloect all the parameters in an object
    let data = {};
    if (contentType == "Params"){
        for(i=0;i<addedParamCount+1;i++){
            if((document.getElementById(`parameterKey${i+1}`)) != undefined){
                let key = document.getElementById(`parameterKey${i+1}`).value;
                let value = document.getElementById(`parameterValue${i+1}`).value;
                data[key] = value;
            }
        data = JSON.stringify(data);
        }
    }
    else{
        data = document.getElementById("requestJsonText").value;
        console.log(2);
    };
    // Log all the values in console for debugging
    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(data);
    // If the requestType is GET, invoke fetch api to create a get request
    if(requestType == "GET"){
        fetch(url,{
            method: "GET"
        })
        .then(response=> response.text())
        .then((text) =>{
            responseJsonText.innerHTML = text;
            Prism.highlightAll();
        });
    }
    
    else{
        fetch(url,{
            method: "POST",
            body: data,
            headers: {"Content-type": "application/json; charset=UTF-8",},
        })
        .then(response=> response.text())
        .then((text) =>{
            responseJsonText.innerHTML = text;
            Prism.highlightAll();
        });
    }
});

console.log("-----------------------------------------------------------------------------------");



console.log("---------------------------------------------------------------------------------------------------------------------------");



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// api from https://randomuser.me/api for get request

// api from https://dummy.restapiexample.com/ for post request