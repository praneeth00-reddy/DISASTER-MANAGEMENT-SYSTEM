// ==============================
// REPORT MODAL
// ==============================

// Open Report Modal

function openReport() {

    document.getElementById("reportModal").style.display = "flex";

}


// Close Report Modal

function closeReport() {

    document.getElementById("reportModal").style.display = "none";

}


// Report Specific Disaster

function reportType(type) {

    document.getElementById("reportModal").style.display = "flex";

    document.getElementById("disasterType").value = type;

}


// Submit Disaster Report

function submitReport(event) {

    event.preventDefault();

    const type =
        document.getElementById("disasterType").value;

    const location =
        document.getElementById("location").value;

    const description =
        document.getElementById("description").value;


    alert(
        "🚨 Disaster Report Submitted!\n\n" +
        "Type: " + type +
        "\nLocation: " + location +
        "\nDescription: " + description
    );


    // Increase Incident Count

    let count =
        parseInt(
            document.getElementById("incidentCount").innerText
        );


    document.getElementById("incidentCount").innerText =
        count + 1;


    // Reset Form

    document
        .querySelector("#reportModal form")
        .reset();


    // Close Modal

    closeReport();

}



// ==============================
// USER LOGIN
// ==============================

// Open User Login

function openLogin() {

    document.getElementById("loginModal").style.display = "flex";

}


// Close User Login

function closeLogin() {

    document.getElementById("loginModal").style.display = "none";

}


// User Login

function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById("userEmail").value;

    const password =
        document.getElementById("userPassword").value;


    // Basic demo validation

    if (email && password) {

        alert(
            "✅ User Login Successful!\n\n" +
            "Welcome User!"
        );

        closeLogin();

    } else {

        alert(
            "❌ Please enter email and password."
        );

    }

}



// ==============================
// ADMIN LOGIN
// ==============================

// Open Admin Login

function openAdminLogin() {

    document
        .getElementById("adminLoginModal")
        .style.display = "flex";

}


// Close Admin Login

function closeAdminLogin() {

    document
        .getElementById("adminLoginModal")
        .style.display = "none";

}


// Admin Login

function loginAdmin(event) {

    event.preventDefault();


    const email =
        document.getElementById("adminEmail").value;

    const password =
        document.getElementById("adminPassword").value;


    // Demo Admin Credentials

    const adminEmail =
        "admin@disasterguard.com";

    const adminPassword =
        "admin123";


    if (
        email === adminEmail &&
        password === adminPassword
    ) {

        alert(
            "🛠️ Admin Login Successful!\n\n" +
            "Welcome Administrator!"
        );

        closeAdminLogin();


    } else {

        alert(
            "❌ Invalid Admin Email or Password!"
        );

    }

}



// ==============================
// FIND SHELTER
// ==============================

function findShelter() {

    alert(
        "🏠 Finding nearby safe shelters...\n\n" +
        "This feature can later be connected to " +
        "Google Maps or a location API."
    );

}



// ==============================
// CLOSE MODALS BY CLICKING OUTSIDE
// ==============================

window.onclick = function(event) {

    const reportModal =
        document.getElementById("reportModal");

    const loginModal =
        document.getElementById("loginModal");

    const adminLoginModal =
        document.getElementById("adminLoginModal");


    if (event.target === reportModal) {

        reportModal.style.display = "none";

    }


    if (event.target === loginModal) {

        loginModal.style.display = "none";

    }


    if (event.target === adminLoginModal) {

        adminLoginModal.style.display = "none";

    }

};