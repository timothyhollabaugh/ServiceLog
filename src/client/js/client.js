
var requests_div = document.getElementById("requests");

var alerts_div = document.getElementById("alerts");

var employee_card = new CardLookup(
    "Employee Card", 
    document.getElementById("employee_card"),
    "employee",
);

var customer_card = new CardLookup(
    "Customer Card", 
    document.getElementById("customer_card"),
    "customer",
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
    self.employee = user;
}

customer_card.on_success = function(user) {
    search.focus();
    self.customer = user;
}

search.onadd = function(search) {
    service_list.add_service(search);
}

submit.get_info = function() {
    return {
        services: service_list.services,
        employee: employee,
        customer: customer
    }
}

submit.on_submit = function() {
    self.employee_card.clear();
    self.customer_card.clear();
    self.service_list.clear();
    self.employee = null;
    self.customer = null;

    show_alert("Submission successful", "success");
}

submit.on_failed_submit = function() {
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
