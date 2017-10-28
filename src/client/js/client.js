
var requests_div = document.getElementById("requests");

var alerts_div = document.getElementById("alerts");

var employee_card = new CardLookup(
    "Employee", 
    document.getElementById("employee_card"),
    "employee",
    false,
);

var customer_card = new CardLookup(
    "Customer", 
    document.getElementById("customer_card"),
    "customer",
    true,
);

var search = new Search(
    document.getElementById("search"),
    [
        {
            name: "Parts Request",
            type: "parts_request"
        },
        {
            name: "Parts Loan",
            type: "parts_loan"
        },
        {
            name: "Other",
            type: "other"
        }
    ]
);

var service_list = new ServiceList(
    requests_div
);

var submit = new Submit(
    document.getElementById("submit")
);

var employee = null;
var customer = null;

employee_card.focus();
employee_card.on_success = function(user) {
    customer_card.focus();
    employee = user;
}

employee_card.on_failure = function(user) {
    employee = null;
}

customer_card.on_success = function(user) {
    search.focus();
    customer = user;
}

customer_card.on_failure = function(user) {
    customer = null;
}

search.onadd = function(service) {
    search.focus();
    service_list.add_service(service);
    console.log(service);
}

submit.get_info = function() {
    return {
        services: service_list.services,
        employee: employee,
        customer: customer
    }
}

submit.on_submit = function() {
    employee_card.focus();

    employee_card.clear();
    customer_card.clear();
    service_list.clear();
    employee = null;
    customer = null;

    show_alert("Submission successful", "success");
}

submit.on_failed_submit = function() {
    if(employee === null){
        employee_card.focus();
    }else{
        customer_card.focus();
    }    
    show_alert("Both an employee and a customer are required for submission", "danger");
}

function show_alert(alert_text, level){

    while(alerts_div.firstChild){
        alerts_div.removeChild(alerts_div.firstChild);
    }

    var alert = document.createElement("div");
    alert.classList += " alert";
    alert.classList += " alert-" + level;
    alert.role = "alert";

    var text = document.createElement("p");
    text.textContent = alert_text;
    alert.appendChild(text);

    alerts_div.appendChild(alert);
}
