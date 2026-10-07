/* =========================================
   CAMPUSCARE AUTHENTICATION & SYSTEM
========================================= */


/* =========================================
   HELPER FUNCTIONS
========================================= */

function getUsers() {

    const users = localStorage.getItem("campusCareUsers");

    if (!users) {
        return [];
    }

    try {
        return JSON.parse(users);
    } catch (error) {
        return [];
    }
}


function saveUsers(users) {

    localStorage.setItem(
        "campusCareUsers",
        JSON.stringify(users)
    );

}


function getComplaints() {

    const complaints = localStorage.getItem(
        "campusCareComplaints"
    );

    if (!complaints) {
        return [];
    }

    try {
        return JSON.parse(complaints);
    } catch (error) {
        return [];
    }

}


function saveComplaints(complaints) {

    localStorage.setItem(
        "campusCareComplaints",
        JSON.stringify(complaints)
    );

}


function getCurrentUser() {

    const user = localStorage.getItem(
        "campusCareCurrentUser"
    );

    if (!user) {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch (error) {
        return null;
    }

}


function setCurrentUser(user) {

    localStorage.setItem(
        "campusCareCurrentUser",
        JSON.stringify(user)
    );

}


function showMessage(element, message) {

    if (!element) {
        return;
    }

    element.textContent = message;

    element.style.display = "block";

}


function hideMessage(element) {

    if (!element) {
        return;
    }

    element.style.display = "none";

}


/* =========================================
   PAGE PROTECTION
========================================= */

const currentUser = getCurrentUser();

const protectedPages = [
    "dashboard.html",
    "complaint.html",
    "complaints.html",
    "feedback.html"
];

const currentPage =
    window.location.pathname.split("/").pop();


if (
    protectedPages.includes(currentPage) &&
    !currentUser
) {

    window.location.href = "login.html";

}


/* =========================================
   REGISTER
========================================= */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const fullName =
                document.getElementById("fullName").value.trim();

            const studentId =
                document.getElementById("studentId").value.trim();

            const department =
                document.getElementById("department").value;

            const email =
                document.getElementById("email").value
                .trim()
                .toLowerCase();

            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;

            const terms =
                document.getElementById("terms").checked;


            const errorMessage =
                document.getElementById("registerError");

            const successMessage =
                document.getElementById("registerSuccess");


            hideMessage(errorMessage);
            hideMessage(successMessage);


            /* Check required fields */

            if (
                !fullName ||
                !studentId ||
                !department ||
                !email ||
                !password ||
                !confirmPassword
            ) {

                showMessage(
                    errorMessage,
                    "Please fill in all fields."
                );

                return;

            }


            /* Check email */

            if (!email.includes("@")) {

                showMessage(
                    errorMessage,
                    "Please enter a valid email address."
                );

                return;

            }


            /* Check password length */

            if (password.length < 6) {

                showMessage(
                    errorMessage,
                    "Password must contain at least 6 characters."
                );

                return;

            }


            /* Check password match */

            if (password !== confirmPassword) {

                showMessage(
                    errorMessage,
                    "Passwords do not match."
                );

                return;

            }


            /* Check terms */

            if (!terms) {

                showMessage(
                    errorMessage,
                    "Please agree to the terms and conditions."
                );

                return;

            }


            /* Get existing users */

            const users = getUsers();


            /* Check duplicate email */

            const emailExists =
                users.some(function (user) {

                    return user.email === email;

                });


            if (emailExists) {

                showMessage(
                    errorMessage,
                    "An account with this email already exists."
                );

                return;

            }


            /* Check duplicate student ID */

            const studentIdExists =
                users.some(function (user) {

                    return user.studentId === studentId;

                });


            if (studentIdExists) {

                showMessage(
                    errorMessage,
                    "This Student ID is already registered."
                );

                return;

            }


            /* Create new user */

            const newUser = {

                id: Date.now(),

                fullName: fullName,

                studentId: studentId,

                department: department,

                email: email,

                password: password,

                createdAt:
                    new Date().toISOString()

            };


            users.push(newUser);


            saveUsers(users);


            /* Show success */

            showMessage(
                successMessage,
                "Registration successful! Redirecting to login..."
            );


            registerForm.reset();


            /* Redirect */

            setTimeout(function () {

                window.location.href = "login.html";

            }, 1500);

        }
    );

}


/* =========================================
   REGISTER PASSWORD TOGGLE
========================================= */

const togglePassword =
    document.getElementById("togglePassword");


const passwordInput =
    document.getElementById("password");


if (
    togglePassword &&
    passwordInput
) {

    togglePassword.addEventListener(
        "click",
        function () {

            if (
                passwordInput.type === "password"
            ) {

                passwordInput.type = "text";

                togglePassword.textContent =
                    "Hide";

            } else {

                passwordInput.type = "password";

                togglePassword.textContent =
                    "Show";

            }

        }
    );

}


/* =========================================
   CONFIRM PASSWORD TOGGLE
========================================= */

const toggleConfirmPassword =
    document.getElementById(
        "toggleConfirmPassword"
    );


const confirmPasswordInput =
    document.getElementById(
        "confirmPassword"
    );


if (
    toggleConfirmPassword &&
    confirmPasswordInput
) {

    toggleConfirmPassword.addEventListener(
        "click",
        function () {

            if (
                confirmPasswordInput.type === "password"
            ) {

                confirmPasswordInput.type = "text";

                toggleConfirmPassword.textContent =
                    "Hide";

            } else {

                confirmPasswordInput.type =
                    "password";

                toggleConfirmPassword.textContent =
                    "Show";

            }

        }
    );

}


/* =========================================
   LOGIN
========================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value
                .trim()
                .toLowerCase();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const errorMessage =
                document.getElementById(
                    "loginError"
                );


            const successMessage =
                document.getElementById(
                    "loginSuccess"
                );


            hideMessage(errorMessage);
            hideMessage(successMessage);


            /* Check fields */

            if (!email || !password) {

                showMessage(
                    errorMessage,
                    "Please enter your email and password."
                );

                return;

            }


            /* Get users */

            const users = getUsers();


            /* Find user */

            const user =
                users.find(function (item) {

                    return (
                        item.email === email &&
                        item.password === password
                    );

                });


            /* User not found */

            if (!user) {

                showMessage(
                    errorMessage,
                    "Invalid email or password."
                );

                return;

            }


            /* Save logged-in user */

            setCurrentUser(user);


            /* Success */

            showMessage(
                successMessage,
                "Login successful! Redirecting..."
            );


            /* Redirect */

            setTimeout(function () {

                window.location.href =
                    "dashboard.html";

            }, 800);

        }
    );

}


/* =========================================
   LOGIN PASSWORD TOGGLE
========================================= */

const toggleLoginPassword =
    document.getElementById(
        "toggleLoginPassword"
    );


const loginPassword =
    document.getElementById(
        "loginPassword"
    );


if (
    toggleLoginPassword &&
    loginPassword
) {

    toggleLoginPassword.addEventListener(
        "click",
        function () {

            if (
                loginPassword.type === "password"
            ) {

                loginPassword.type = "text";

                toggleLoginPassword.textContent =
                    "Hide";

            } else {

                loginPassword.type = "password";

                toggleLoginPassword.textContent =
                    "Show";

            }

        }
    );

}


/* =========================================
   LOGOUT
========================================= */

const logoutButtons =
    document.querySelectorAll(
        "#logoutBtn"
    );


logoutButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            localStorage.removeItem(
                "campusCareCurrentUser"
            );


            window.location.href =
                "login.html";

        }
    );

});


/* =========================================
   DASHBOARD USER INFORMATION
========================================= */

if (
    currentPage === "dashboard.html" &&
    currentUser
) {

    const studentName =
        document.getElementById(
            "studentName"
        );


    const profileName =
        document.getElementById(
            "profileName"
        );


    const profileStudentId =
        document.getElementById(
            "profileStudentId"
        );


    const profileDepartment =
        document.getElementById(
            "profileDepartment"
        );


    const profileEmail =
        document.getElementById(
            "profileEmail"
        );


    if (studentName) {

        studentName.textContent =
            currentUser.fullName;

    }


    if (profileName) {

        profileName.textContent =
            currentUser.fullName;

    }


    if (profileStudentId) {

        profileStudentId.textContent =
            currentUser.studentId;

    }


    if (profileDepartment) {

        profileDepartment.textContent =
            currentUser.department;

    }


    if (profileEmail) {

        profileEmail.textContent =
            currentUser.email;

    }


    updateDashboardStats();

    displayRecentComplaints();

}


/* =========================================
   DASHBOARD STATISTICS
========================================= */

function updateDashboardStats() {

    const complaints =
        getComplaints();


    const userComplaints =
        complaints.filter(function (complaint) {

            return (
                complaint.userEmail ===
                currentUser.email
            );

        });


    const pending =
        userComplaints.filter(function (complaint) {

            return complaint.status === "Pending";

        });


    const progress =
        userComplaints.filter(function (complaint) {

            return complaint.status === "In Progress";

        });


    const resolved =
        userComplaints.filter(function (complaint) {

            return complaint.status === "Resolved";

        });


    const totalElement =
        document.getElementById(
            "totalComplaints"
        );


    const pendingElement =
        document.getElementById(
            "pendingComplaints"
        );


    const progressElement =
        document.getElementById(
            "progressComplaints"
        );


    const resolvedElement =
        document.getElementById(
            "resolvedComplaints"
        );


    if (totalElement) {

        totalElement.textContent =
            userComplaints.length;

    }


    if (pendingElement) {

        pendingElement.textContent =
            pending.length;

    }


    if (progressElement) {

        progressElement.textContent =
            progress.length;

    }


    if (resolvedElement) {

        resolvedElement.textContent =
            resolved.length;

    }

}


/* =========================================
   DISPLAY RECENT COMPLAINTS
========================================= */

function displayRecentComplaints() {

    const container =
        document.getElementById(
            "recentComplaints"
        );


    if (!container || !currentUser) {
        return;
    }


    const complaints =
        getComplaints();


    const userComplaints =
        complaints.filter(function (complaint) {

            return (
                complaint.userEmail ===
                currentUser.email
            );

        });


    const recent =
        userComplaints
        .slice()
        .reverse()
        .slice(0, 5);


    if (recent.length === 0) {

        container.innerHTML = `

            <div class="complaint-item">

                <div class="complaint-top">

                    <span class="complaint-title">
                        No complaints yet
                    </span>

                </div>

                <p>
                    Your submitted complaints will appear here.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    recent.forEach(function (complaint) {

        let statusClass =
            "status-pending";


        if (complaint.status === "In Progress") {

            statusClass =
                "status-progress";

        }


        if (complaint.status === "Resolved") {

            statusClass =
                "status-resolved";

        }


        const item =
            document.createElement("div");


        item.className =
            "complaint-item";


        item.innerHTML = `

            <div class="complaint-top">

                <span class="complaint-title">
                    ${escapeHTML(complaint.subject)}
                </span>

                <span class="complaint-date">
                    ${formatDate(complaint.createdAt)}
                </span>

            </div>

            <p>
                ${escapeHTML(complaint.category)}
                -
                ${escapeHTML(complaint.location)}
            </p>

            <span class="status ${statusClass}">
                ${escapeHTML(complaint.status)}
            </span>

        `;


        container.appendChild(item);

    });

}


/* =========================================
   SUBMIT COMPLAINT
========================================= */

const complaintForm =
    document.getElementById(
        "complaintForm"
    );


if (complaintForm) {

    complaintForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (!currentUser) {

                window.location.href =
                    "login.html";

                return;

            }


            const category =
                document.getElementById(
                    "complaintCategory"
                ).value;


            const location =
                document.getElementById(
                    "complaintLocation"
                ).value.trim();


            const subject =
                document.getElementById(
                    "complaintSubject"
                ).value.trim();


            const description =
                document.getElementById(
                    "complaintDescription"
                ).value.trim();


            const priorityElement =
                document.querySelector(
                    'input[name="priority"]:checked'
                );


            const priority =
                priorityElement
                ? priorityElement.value
                : "Low";


            const message =
                document.getElementById(
                    "complaintMessage"
                );


            if (
                !category ||
                !location ||
                !subject ||
                !description
            ) {

                showMessage(
                    message,
                    "Please fill in all required fields."
                );

                return;

            }


            /* Get complaints */

            const complaints =
                getComplaints();


            /* Create complaint ID */

            const complaintId =
                "CC-" +
                Date.now();


            /* Create complaint */

            const newComplaint = {

                id: complaintId,

                userEmail:
                    currentUser.email,

                studentId:
                    currentUser.studentId,

                studentName:
                    currentUser.fullName,

                category:
                    category,

                location:
                    location,

                subject:
                    subject,

                description:
                    description,

                priority:
                    priority,

                status:
                    "Pending",

                createdAt:
                    new Date().toISOString(),

                feedback:
                    null

            };


            complaints.push(
                newComplaint
            );


            saveComplaints(
                complaints
            );


            /* Show success */

            showMessage(
                message,
                "Complaint submitted successfully! Complaint ID: " +
                complaintId
            );


            /* Reset form */

            complaintForm.reset();


            /* Redirect after 2 seconds */

            setTimeout(function () {

                window.location.href =
                    "complaints.html";

            }, 2000);

        }
    );

}


/* =========================================
   DISPLAY ALL COMPLAINTS
========================================= */

const complaintsList =
    document.getElementById(
        "complaintsList"
    );


if (
    complaintsList &&
    currentPage === "complaints.html"
) {

    displayAllComplaints();


    const statusFilter =
        document.getElementById(
            "statusFilter"
        );


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            function () {

                displayAllComplaints(
                    statusFilter.value
                );

            }
        );

    }

}


/* =========================================
   DISPLAY ALL COMPLAINTS FUNCTION
========================================= */

function displayAllComplaints(
    filter = "all"
) {

    if (!complaintsList || !currentUser) {
        return;
    }


    const complaints =
        getComplaints();


    let userComplaints =
        complaints.filter(function (complaint) {

            return (
                complaint.userEmail ===
                currentUser.email
            );

        });


    if (filter !== "all") {

        userComplaints =
            userComplaints.filter(
                function (complaint) {

                    return (
                        complaint.status ===
                        filter
                    );

                }
            );

    }


    userComplaints =
        userComplaints
        .slice()
        .reverse();


    if (userComplaints.length === 0) {

        complaintsList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📋
                </div>

                <h2>
                    No Complaints Found
                </h2>

                <p>
                    There are no complaints matching your selection.
                </p>

                <a
                    href="complaint.html"
                    class="new-complaint-btn"
                >
                    Submit a Complaint
                </a>

            </div>

        `;

        return;

    }


    complaintsList.innerHTML = "";


    userComplaints.forEach(
        function (complaint) {

            let statusClass =
                "status-pending";


            if (
                complaint.status ===
                "In Progress"
            ) {

                statusClass =
                    "status-progress";

            }


            if (
                complaint.status ===
                "Resolved"
            ) {

                statusClass =
                    "status-resolved";

            }


            const card =
                document.createElement("div");


            card.className =
                "complaint-card";


            card.innerHTML = `

                <div class="complaint-card-top">

                    <div>

                        <div class="complaint-card-category">

                            ${escapeHTML(
                                complaint.category
                            )}

                        </div>

                        <h2>
                            ${escapeHTML(
                                complaint.subject
                            )}
                        </h2>

                        <div class="complaint-id">

                            Complaint ID:
                            ${escapeHTML(
                                complaint.id
                            )}

                        </div>

                    </div>


                    <span class="status ${statusClass}">

                        ${escapeHTML(
                            complaint.status
                        )}

                    </span>

                </div>


                <p class="complaint-card-description">

                    ${escapeHTML(
                        complaint.description
                    )}

                </p>


                <div class="complaint-meta">

                    <span class="meta-item">

                        📍
                        ${escapeHTML(
                            complaint.location
                        )}

                    </span>


                    <span class="meta-item">

                        ⚡ Priority:
                        ${escapeHTML(
                            complaint.priority
                        )}

                    </span>


                    <span class="meta-item">

                        📅
                        ${formatDate(
                            complaint.createdAt
                        )}

                    </span>

                </div>

            `;


            complaintsList.appendChild(card);

        }
    );

}


/* =========================================
   FEEDBACK
========================================= */

const feedbackForm =
    document.getElementById(
        "feedbackForm"
    );


if (feedbackForm) {

    loadFeedbackComplaints();


    feedbackForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (!currentUser) {

                window.location.href =
                    "login.html";

                return;

            }


            const complaintId =
                document.getElementById(
                    "feedbackComplaint"
                ).value;


            const ratingElement =
                document.querySelector(
                    'input[name="rating"]:checked'
                );


            const comment =
                document.getElementById(
                    "feedbackComment"
                ).value.trim();


            const message =
                document.getElementById(
                    "feedbackMessage"
                );


            if (!complaintId) {

                showMessage(
                    message,
                    "Please select a complaint."
                );

                return;

            }


            if (!ratingElement) {

                showMessage(
                    message,
                    "Please select a rating."
                );

                return;

            }


            if (!comment) {

                showMessage(
                    message,
                    "Please write your feedback."
                );

                return;

            }


            const rating =
                ratingElement.value;


            const complaints =
                getComplaints();


            const complaintIndex =
                complaints.findIndex(
                    function (complaint) {

                        return (
                            complaint.id ===
                            complaintId
                        );

                    }
                );


            if (complaintIndex === -1) {

                showMessage(
                    message,
                    "Complaint not found."
                );

                return;

            }


            complaints[
                complaintIndex
            ].feedback = {

                rating:
                    Number(rating),

                comment:
                    comment,

                submittedAt:
                    new Date().toISOString()

            };


            saveComplaints(
                complaints
            );


            showMessage(
                message,
                "Thank you! Your feedback has been submitted."
            );


            feedbackForm.reset();


            setTimeout(function () {

                loadFeedbackComplaints();

            }, 500);

        }
    );

}


/* =========================================
   LOAD RESOLVED COMPLAINTS
========================================= */

function loadFeedbackComplaints() {

    const select =
        document.getElementById(
            "feedbackComplaint"
        );


    if (!select || !currentUser) {
        return;
    }


    const complaints =
        getComplaints();


    const resolvedComplaints =
        complaints.filter(
            function (complaint) {

                return (
                    complaint.userEmail ===
                    currentUser.email &&

                    complaint.status ===
                    "Resolved" &&

                    !complaint.feedback
                );

            }
        );


    select.innerHTML = `

        <option value="">
            Select a resolved complaint
        </option>

    `;


    resolvedComplaints.forEach(
        function (complaint) {

            const option =
                document.createElement("option");


            option.value =
                complaint.id;


            option.textContent =
                complaint.subject +
                " (" +
                complaint.id +
                ")";


            select.appendChild(option);

        }
    );


    if (resolvedComplaints.length === 0) {

        select.innerHTML = `

            <option value="">
                No resolved complaints available
            </option>

        `;

    }

}


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }


    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}


/* =========================================
   SECURITY HELPER
========================================= */

function escapeHTML(value) {

    if (value === undefined ||
        value === null) {

        return "";

    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}
