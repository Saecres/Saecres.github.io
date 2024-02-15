// "use strict";
// IIFE - Immediately invoked functional expression
(function () {

    function CheckLogin() {
        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#"> <i class="fas fa-undo"></i> Logout </a>`)
        }
        $("#logout").on("click", function(){
            sessionStorage.clear();
            location.href = "index.html";
        });
    }

    /**
     * Calls the header
     * @param html_data
     */
    function LoadHeader(html_data){
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
        CheckLogin();
    }

    /**
     * Use the XMLHttpRequest to open the connection with the server,
     * and listen if the application is loaded and successful
     * @param method
     * @param url
     * @param callback
     */
    function AjaxRequest(method, url, callback){

        // step 1: initialize XHR object
        let xhr = new XMLHttpRequest();

        // step 2: open connection to the server
        xhr.open(method, url);

        // step 4: add event listen to monitor the readystatechange
        xhr.addEventListener("readystatechange", () => {

            if(xhr.readyState === 4 && xhr.status === 200){
                if(typeof callback == "function"){
                    callback(xhr.responseText);
                }else{
                    console.error("ERROR: callback not a function");
                }
            }
        });

        // step 3: send the request
        xhr.send();
    }

    /**
     * Validates each field input using regular expressions with an error message
     */
    function ContactFormValidation(){
        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid first and last name"); // fullName
        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid contact number"); // contactNumber
        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address"); // emailAddress
    }

    /**
     * This function validates input for contact and edit pages
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    function ValidateField(input_field_id, regular_expression, error_message){

        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function (){
            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)){
                // fail validation
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                // pass validation
                messageArea.removeClass("class").hide();
            }
        });
    }

    /**
     * Adds the contact inputted and stores into the local storage.
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     * @constructor
     */
    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){
            let key = contact.fullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    function DisplayHomePage()
    {
        console.log("Called DisplayHomePage...");

        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3"> This is my first paragraph</p>`);

        $("body").append(`<article class="container">
                <p id="ArticleParagraph" class="mt-3"> This is my article paragraph.</p></article>`)
    }

    function DisplayAboutPage()
    {
        console.log("Called DisplayAboutPage...");
    }

    function DisplayContactPage() {
        console.log("Called DisplayContactPage...");

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function (){

            if(subscribeCheckbox.checked){
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayProductPage() {
        console.log("Called DisplayProductPage...");
    }

    function DisplayServicePage() {
        console.log("Called DisplayServicePage...");
    }

    function DisplayContactListPage() {
        console.log("Called DisplayContactListPage...");

        if(localStorage.length > 0){

            let contactList = document.getElementById("contactList");
            let data = "";

            let index = 1;
            let keys = Object.keys(localStorage);

            for (const key of keys)
            {
                let contact = new core.Contact();
                let contactData = localStorage.getItem(key);
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.fullName}</td>
                         <td>${contact.contactNumber}</td>
                         <td>${contact.emailAddress}</td>
                         <td>
                             <button value="${key}" class="btn btn-primary btn-sm edit">
                                <i class="fas fa-edit fa-sm"> Edit </i>
                             </button>
                         </td>
                         <td>
                           <button value="${key}" class="btn btn-danger btn-sm delete">
                                <i class="fas fa-trash-alt fa-sm"> Delete </i>
                             </button></td>
                         </td>
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }

        // incoming request parameter #
        $("#addButton").on("click", () => {
            location.href = "edit.html#add";
        });

        $("button.edit").on("click", function (){
            location.href = "edit.html#" + $(this).val();
        })

        $("button.delete").on("click", function (){

            if (confirm("Confirm contact Delete?")){
                localStorage.removeItem($(this).val());
            }
            location.href = "contact-list.html";
        })
    }

    function DisplayEditPage(){
        console.log("Called DisplayEditPage()...")

        ContactFormValidation();

        let page = location.hash.substring(1);
        switch (page){
            case "add":

                $("main>h1").text("Add Contact");

                $("#editButton").html(`<i class="fa fa-plus fa-sm"> Add`);
                $("#editButton").on("click", () => {

                    // Prevent form submission
                    event.preventDefault();

                    AddContact(fullName.value, contactNumber.value, emailAddress.value);

                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });

                break;
            default:
                // edit operation

                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));

                // display contact info
                $("#fullName").val(contact.fullName);
                $("#contactNumber").val(contact.contactNumber);
                $("#emailAddress").val(contact.emailAddress);

                $("#editButton").on("click", (event) => {
                    // prevent form submission
                    event.preventDefault();
                    contact.fullName = $("#fullName").val();
                    contact.contactNumber = $("#contactNumber").val();
                    contact.emailAddress = $("#emailAddress").val();

                    localStorage.setItem(page, contact.serialize());
                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });
                break;
        }
    }

    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage...");

        let messageArea = $("#messageArea");

        $("#loginButton").on("click", function () {

            let success = false;
            let newUser = new core.User();

            // reads json file, from ajax locally if success
            $.get("./data/users.json", function(data) {

                for(const user of data.users){
                    console.log(user);
                    if(username.value === user.Username && password.value === user.Password){
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if(success){
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "contact-list.html";
                }else{
                    $("username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("ERROR: Invalid Credentials").show();
                }
            });
        });

        $("#cancelButton").on("click", function (){
            document.forms[0].reset();
            location.href = "index.html";
        });
    }

    function DisplayRegisterPage() {
        console.log("Called DisplayRegisterPage...");
    }

    function Start()
    {
        console.log("App Started....");

        AjaxRequest("GET", "header.html", LoadHeader);

        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductPage();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Our Services":
                DisplayServicePage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }
    }

    window.addEventListener("load", Start);
})()