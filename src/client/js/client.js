
var employee_card = new CardLookup(
    "Employee Card", 
    document.getElementById("employee_card"),
    "employee",
    function(user) {console.log("On Success"); console.log(user);},
    function(user) {console.log("On Failure"); console.log(user);}
);

var customer_card = new CardLookup(
    "Customer Card", 
    document.getElementById("customer_card"),
    "customer",
    function(user) {console.log("On Success Customer"); console.log(user);},
    function(user) {console.log("On Failure Customer"); console.log(user);}
);
