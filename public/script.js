function onSignIn(googleUser) {

      // Get the user's ID token and basic profile information
    var id_token = googleUser.credential;
    console.log(id_token)
      // Send the ID token to server-side script called index.js for verification and
      // to create a session.

    fetch('/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Referrer-Policy': 'no-referrer-when-downgrade'},
    body: JSON.stringify({ id_token:id_token})
    })
    .then(response => {
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
    })
    .then(data => {
    console.log("success", data);
    console.log(data.allInfo)
    const allInfo = data.allInfo;
    
    // check if email ends in stuy.edu
    if (allInfo.email.endsWith("stuy.edu") || allInfo.email===("zkarim7676@gmail.com")) {
        window.username = allInfo.name;
        window.email = allInfo.email;
        document.getElementById("submit").className = "button";
        document.getElementById("googleButton").className = "googleHide";
        document.getElementById("signInSuccess").className = "signInShow"
        document.getElementById("signInSuccess").innerHTML = "Successfully signed in as " + window.username;
        // store email in local storage
        localStorage.setItem("email", window.email);
        // store name in local storage
        localStorage.setItem("name", window.username);

        // show signOut button
        document.getElementById("signOut").className = "signOutShow";

    }
    else {
        alert("You are not a Stuyvesant student. Please use a Stuyvesant email address.");
    }

    })
    .catch(error => {
    console.log("error", error);
    // Handle the error, for example, by displaying an error message to the user.
    });
}

function signOut() {
    // hide submit button
    document.getElementById("submit").className = "hiddenButton";
    // show google button
    document.getElementById("googleButton").className = "g_id_signin";

    // hide signOut button
    document.getElementById("signOut").className = "signOutHide";

    // hide signInSuccess
    document.getElementById("signInSuccess").className = "signInHide";

    // remove email from local storage
    localStorage.removeItem("email");
    localStorage.removeItem("name");
}
  

processUser = () => {
    
    

    courseCode1 = document.getElementById("course-code1").value.toUpperCase().trim() ;
    section1 = document.getElementById("section1").value.toUpperCase().trim() ;
    room1 = ""  ;

    courseCode2 = document.getElementById("course-code2").value.toUpperCase().trim();
    section2 = document.getElementById("section2").value.toUpperCase().trim();
    room2 = "";

    courseCode3 = document.getElementById("course-code3").value.toUpperCase().trim();
    section3 = document.getElementById("section3").value.toUpperCase().trim();
    room3 = "";

    courseCode4 = document.getElementById("course-code4").value.toUpperCase().trim();
    section4 = document.getElementById("section4").value.toUpperCase().trim();
    room4 = "";

    courseCode5 = document.getElementById("course-code5").value.toUpperCase().trim();
    section5 = document.getElementById("section5").value.toUpperCase().trim();
    room5 = "";

    courseCode6 = document.getElementById("course-code6").value.toUpperCase().trim();
    section6 = document.getElementById("section6").value.toUpperCase().trim();
    room6 = "";

    courseCode7 = document.getElementById("course-code7").value.toUpperCase().trim();
    section7 = document.getElementById("section7").value.toUpperCase().trim();
    room7 = "";
    
    courseCode8 = document.getElementById("course-code8").value.toUpperCase().trim();
    section8 = document.getElementById("section8").value.toUpperCase().trim();
    room8 = "";

    courseCode9 = document.getElementById("course-code9").value.toUpperCase().trim();
    section9 = document.getElementById("section9").value.toUpperCase().trim();
    room9 = "";

    courseCode10 = document.getElementById("course-code10").value.toUpperCase().trim();
    section10 = document.getElementById("section10").value.toUpperCase().trim();
    room10 = "";


    fullInfo = {
        "Name": window.username,
        "Email": window.email,
        "Period1": {
            "CourseCode": courseCode1,
            "Section": section1,
            "Room": room1
        },
        "Period2": {
            "CourseCode": courseCode2,
            "Section": section2,
            "Room": room2
        },
        "Period3": {
            "CourseCode": courseCode3,
            "Section": section3,
            "Room": room3
        },
        "Period4": {
            "CourseCode": courseCode4,
            "Section": section4,
            "Room": room4
        },
        "Period5": {
            "CourseCode": courseCode5,
            "Section": section5,
            "Room": room5
        },
        "Period6": {
            "CourseCode": courseCode6,
            "Section": section6,
            "Room": room6
        },
        "Period7": {
            "CourseCode": courseCode7,
            "Section": section7,
            "Room": room7
        },
        "Period8": {
            "CourseCode": courseCode8,
            "Section": section8,
            "Room": room8
        },
        "Period9": {
            "CourseCode": courseCode9,
            "Section": section9,
            "Room": room9
        },
        "Period10": {
            "CourseCode": courseCode10,
            "Section": section10,
            "Room": room10
        }

    }
    console.log('button was clicked');
    console.log(fullInfo);

    fetch('/sendSharedVariable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sharedVariable : fullInfo })
        })
        .then(response => {
            console.log(response.status);
            if (response.status == 200) {
                document.getElementById("submit").className = "hiddenButton"
                console.log("hidden!")
                document.getElementById("success").style.display = "block"
            }
            else alert("Something went wrong");
        })
        .catch(error => {
            console.log(error);
        });
            
        ;
}



window.onload = function() {
    if (localStorage.getItem('darkCheck') === null) {

    localStorage.setItem('darkCheck', true);
    }

    darkmode();

    // if email exists in local storage, do these
    
};
function switchColors() {
    if (localStorage.getItem('darkCheck') === "true") {
        localStorage.setItem('darkCheck', false);
    }
    else {
        localStorage.setItem('darkCheck', true);
    }
    darkmode();
}


function darkmode() {
    
    var element = document.body;
    
    if (localStorage.getItem('darkCheck') === "false") {
        element.className = "dark-mode";

        var descriptions = document.querySelectorAll(".description");
        descriptions.forEach(function(description){
            description.className = "description-dark";
        });
        var notes = document.querySelectorAll(".notes");
        notes.forEach(function(note){
            note.className = "notes-dark";
        });
        
        var elements = document.querySelectorAll(".navbar li a");
        elements.forEach(function(element){
            element.style.color = "white";
            element.style.border = "2px solid white";
        });
        // make all borders white
        var elements = document.querySelectorAll(".main-table");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });
        var elements = document.querySelectorAll(".main-table th");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });
        var elements = document.querySelectorAll(".main-table td");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });
        var elements = document.querySelectorAll(".main-table tr");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });

        var elements = document.querySelectorAll(".periodRow");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });
        var elements = document.querySelectorAll(".periodRow td");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });
        var elements = document.querySelectorAll(".periodRow tr");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });
        var elements = document.querySelectorAll(".periodRow th");
        elements.forEach(function(element){
            element.style.border = "1px solid #fff";
        });


        //console.log(localStorage.getItem('darkCheck') + "second");
    }
    else {
        //console.log(localStorage.getItem('darkCheck') + "0.5");
        element.className = "light-mode";
        var elements = document.querySelectorAll(".navbar li a");
        elements.forEach(function(element){
            element.style.color = "black";
            element.style.border = "2px solid black";
            
        });

        var descriptions = document.querySelectorAll(".description-dark");
        descriptions.forEach(function(description){
            description.className = "description";
        });
        var notes = document.querySelectorAll(".notes-dark");
        notes.forEach(function(note){
            note.className = "notes";
        });

        // make all borders white
        var elements = document.querySelectorAll(".main-table");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });
        var elements = document.querySelectorAll(".main-table th");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });
        var elements = document.querySelectorAll(".main-table td");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });
        var elements = document.querySelectorAll(".main-table tr");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });

        var elements = document.querySelectorAll(".periodRow");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });
        var elements = document.querySelectorAll(".periodRow td");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });
        var elements = document.querySelectorAll(".periodRow tr");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });
        var elements = document.querySelectorAll(".periodRow th");
        elements.forEach(function(element){
            element.style.border = "1px solid #000";
        });

        
        //console.log(localStorage.getItem('darkCheck') + "third");
        
    }
}
