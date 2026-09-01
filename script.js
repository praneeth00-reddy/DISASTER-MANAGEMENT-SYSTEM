// Open Report Modal

function openReport() {
    document.getElementById("reportModal").style.display = "flex";
}


// Close Report Modal

function closeReport() {
    document.getElementById("reportModal").style.display = "none";
}


// Open Login Modal

function openLogin() {
    document.getElementById("loginModal").style.display = "flex";
}


// Close Login Modal

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}


// Report specific disaster

function reportType(type) {

    document.getElementById("reportModal").style.display = "flex";

    document.getElementById("disasterType").value = type;
}


// Submit Disaster Report

function submitReport(event) {

    event.preventDefault();

    const type = document.getElementById("disasterType").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;

    alert(
        "🚨 Disaster Report Submitted!\n\n" +
        "Type: " + type +
        "\nLocation: " + location +
        "\nDescription: " + description
    );

    // Increase incident count

    let count =
        parseInt(document.getElementById("incidentCount").innerText);

    document.getElementById("incidentCount").innerText = count + 1;

    document.querySelector("#reportModal form").reset();

    closeReport();
}


// Login

function loginUser(event) {

    event.preventDefault();

    alert("✅ Login successful!");

    closeLogin();
}


// Find Shelter

function findShelter() {

    alert(
        "🏠 Finding nearby safe shelters...\n\n" +
        "This feature can later be connected to Google Maps or a location API."
    );
}


// Close modal when clicking outside

window.onclick = function(event) {

    const reportModal =
        document.getElementById("reportModal");

    const loginModal =
        document.getElementById("loginModal");

    if (event.target === reportModal) {
        reportModal.style.display = "none";
    }

    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
};