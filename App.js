//Listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  //Hide Results
  document.getElementById("results").style.display = "none";

  //Show Loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//Calculate Result
function calculateResults() {
  console.log("calculating");
  //UI Variables
  const amount = document.getElementById("amount");
  const interestRate = document.getElementById("interest-rate");
  const months = document.getElementById("months");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalDue = document.getElementById("total-due");
  const interest = document.getElementById("Interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interestRate.value) / 100 / 12;
  const calculatedPayments = parseFloat(months.value);

  //Monthly Payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalDue.value = (monthly * calculatedPayments).toFixed(2);
    interest.value = (monthly * calculatedPayments - principal).toFixed(2);

    //Show results
    document.getElementById("results").style.display = "block";

    //Hide Spinner
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check the numbers you have used.");
  }
}

function showError(error) {
  //Hide results
  document.getElementById("results").style.display = "none";

  //Hide Spinner
  document.getElementById("loading").style.display = "none";

  //Create a div
  const errorDiv = document.createElement("div");

  //Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  //Add class for bootstrap
  errorDiv.className = "alert alert-danger";

  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above card
  card.insertBefore(errorDiv, heading);

  //Clear error after 5 seconds

  setTimeout(clearError, 5000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
