"use strict";

const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

function onscroll() {
  const header = document.querySelector("[data-header]");
  const goTopBtn = document.querySelector("[data-go-to-start]");

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 10) {
      header.classList.add("active");
      goTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      goTopBtn.classList.remove("active");
    }
  });
}

onscroll();

function mailSent() {
 
  let userEmail = document.getElementById("email").value;
  let userName = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let message = document.getElementById("message").value;
  if(userEmail && userName && message){
var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://api.emailjs.com/api/v1.0/email/send", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        document.getElementById("sai_contact_form").reset();
        alert(
          "Your request was recieved Please find the acknoledge email into your Email Account."
        );

        var response = JSON.parse(xhr.responseText);
      } else {
        console.log("Error:", xhr.status);
      }
    }
  };

  var data = {
    service_id: "service_90mly3g",
    template_id: "template_t0mmhiv",
    user_id: "AV-3fIpEyj6nlb84l",

    template_params: {
      reply_to: userEmail,
      from_name: "Sai Hemanth Maremalla",
      to_name: userName,
      contact: phone ? phone : "",
      message: message ? message : "Not Specified",
      "g-recaptcha-response": "03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...",
    },
  };

  xhr.send(JSON.stringify(data));
  }
  

  
}

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {
    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) {
      elemToggleFunc(toggleBtns[i]);
    }
    elemToggleFunc(skillsBox);
  });
}


