/*
Name: Kaitlin Penaranda
Date: February 24, 2024
ID: 100869243
*/

(function f() {

    /**
     * Load more button to see projects
     */
    function LoadButton(){
        const loadmore = document.querySelector('.load-more');
        let currentItems = 1;
        loadmore.addEventListener('click', (e) => {
            const elementList = [...document.querySelectorAll('.post li')];
            e.target.classList.add('show-loader');

            for(let i = currentItems; i < currentItems + 1; i++){
                setTimeout( function (){
                    e.target.classList.remove('show-loader');
                    if (elementList[i]) {
                        elementList[i].style.display = 'flex';
                    }
                }, 3000)
            }
            currentItems += 1;

            //hide load button if fully loaded
            if (currentItems >= elementList.length){
                event.target.classList.add('loaded')
            }
        })
    }

    function SearchBar(){
        let query = $("#searchInput").val().trim().toLowerCase();

        switch(query){
            case "home":
                redirect('index.html');
                break;
            case "portfolio":
                redirect('portfolio.html');
                break;
            case "service":
                redirect('service.html');
                break;
            case "news":
                redirect('blog.html');
                break;
            case "blog":
                redirect('blog.html');
                break;
            case "team":
                redirect('team.html');
                break;
            case "event":
                redirect('events.html');
                break;
            case "gallery":
                redirect('gallery.html');
                break;
            case "career":
                redirect('career.html');
                break;
            default:
                console.log("No matching page found: " + query);
                break;
        }
    }

    function redirect(page){
        window.location.href = page;
    }

    // document.addEventListener("DOMContentLoaded", function() {
    //     const searchBar = document.getElementById("searchBar");
    //
    //     searchBar.addEventListener("keypress", function(event) {
    //         if (event.key === "Enter") {
    //             const searchTerm = searchBar.value.trim().toLowerCase();
    //             redirectToPage(searchTerm);
    //         }
    //     });
    // });
    //
    // function redirectToPage(searchTerm) {
    //     let page = "";
    //     switch (searchTerm) {
    //         case "home":
    //             page = "index.html";
    //             break;
    //         case "portfolio":
    //             page = "portfolio.html";
    //             break;
    //         case "services":
    //             page = "service.html";
    //             break;
    //         case "news":
    //             page = "blog.html";
    //             break;
    //         case "blog":
    //             page = "blog.html";
    //             break;
    //         case "careers":
    //             page = "careers.html";
    //             break;
    //         case "events":
    //             page = "events.html";
    //             break;
    //         case "gallery":
    //             page = "gallery.html";
    //             break;
    //         case "team":
    //             page = "team.html";
    //             break;
    //         case "privacy":
    //             page = "privacy-policy.html";
    //             break;
    //         case "terms":
    //             page = "terms-of-service.html";
    //             break;
    //         case "contact":
    //             page = "contact.html";
    //             break;
    //         default:
    //             // Default behavior when no specific page matches
    //             page = "search-results.html?query=" + encodeURIComponent(searchTerm);
    //             break;
    //     }
    //     window.location.href = page;
    // }

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

    function RegisterFormValidation(){
        // first name
        ValidateField("#firstName",
            /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]+)+/,
            "Please enter a valid first name");

        // last name
        ValidateField("#lastName",
            /([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid last name");

        // emailAddress
        ValidateField("#emailAddress",
            /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address");

        // phone number
        ValidateField("#phoneNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid phone number");

        // password
        ValidateField("#password",
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Please enter a valid password, password must contain 1 uppercase letter" +
            ", 1 lowercase letter, 1 digit, 1 special character and must be 8 characters or more.")
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

    // Creates footer navigation bar
    function createFooterNavbar() {
        console.log("Creating footer navbar...");  // Debug statement
        const footerNav = document.createElement('nav');
        footerNav.className = 'navbar navbar-expand-md navbar-dark bg-black fixed-bottom';

        // Add padding to the bottom of the body to accommodate the fixed footer
        document.body.style.paddingBottom = '5em';

        const navList = document.createElement('ul');
        navList.className = 'navbar-nav mx-auto';

        const privacyLink = createNavLink('Privacy Policy', '../privacy-policy.html');
        const termsLink = createNavLink('Terms of Service', '../terms-of-service.html');
        const contactLink = createNavLink('Contact', '../contact.html');

        navList.appendChild(privacyLink);
        navList.appendChild(termsLink);
        navList.appendChild(contactLink);

        footerNav.appendChild(navList);
        document.body.appendChild(footerNav);
    }

    /**
     * Calls the header
     * @param html_data
     */
    function LoadHeader(html_data){
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
        CheckLogin();
        $("#searchButton").on("click", (event) => {
            event.preventDefault();// Prevent default button behavior

            SearchBar();
        });
    }

    function ShowWelcomeMessage(username) {
        $("#welcomeMessage").text(`Welcome, ${username}!`).fadeIn();
        setTimeout(function() {
            $("#welcomeMessage").fadeOut();
        }, 5000); // 5 seconds
    }

    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-undo"></i> Logout</a>`)
            let userData = JSON.parse(sessionStorage.getItem("user"));
            if (userData && userData.type === "user") {
                let user = userData.data;
                if (!sessionStorage.getItem("welcomeShown")) {
                    ShowWelcomeMessage(user.DisplayName);
                    sessionStorage.setItem("welcomeShown", "true");
                    setTimeout(function() {
                        $("#welcomeMessage").fadeOut("slow", function() {
                            $(this).remove();
                        });
                    }, 6000); // 6 seconds
                }
            }
        }

        $("#logout").on("click", function () {
            sessionStorage.clear();
            location.href = "index.html";
        });
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

    function createNavLink(text, href) {
        const listItem = document.createElement('li');
        listItem.className = 'nav-item';

        const link = document.createElement('a');
        link.className = 'nav-link';
        link.textContent = text;
        link.href = href;

        listItem.appendChild(link);
        return listItem;
    }

    function updateNavigation() {
        console.log("Updating navigation...");  // Debug statement

        // Updated: Add 'Careers' dynamically
        const careersLink = createNavLinkWithIcon(' Careers', 'careers.html', 'fas fa-user-nurse');
        let navBar = document.querySelector('.navbar-nav');
        if (navBar) {
            navBar.appendChild(careersLink);
        }

        // Updated: Change 'Blog' text to 'News'
        let blogLink = document.querySelector('.navbar-nav .nav-link[href="blog.html"]');
        if (blogLink) {
            blogLink.textContent = ''; // Clear existing text

            // Create an icon element
            const icon = document.createElement('i');
            icon.className = 'fas fa-newspaper';

            // Create a span for text
            const textSpan = document.createElement('span');
            textSpan.textContent = ' News';

            // Append the icon and text to the link
            blogLink.appendChild(icon);
            blogLink.appendChild(textSpan);
        }

    }

    // Function to create a navigation link with an icon
    function createNavLinkWithIcon(text, href, iconClass) {
        const listItem = document.createElement('li');
        listItem.className = 'nav-item';

        const link = document.createElement('a');
        link.className = 'nav-link';
        link.href = href;

        // Create an icon element
        const icon = document.createElement('i');
        icon.className = iconClass;

        // Create a span for text
        const textSpan = document.createElement('span');
        textSpan.textContent = text;

        // Append the icon and text to the link
        link.appendChild(icon);
        link.appendChild(textSpan);

        // Append the link to the list item
        listItem.appendChild(link);

        return listItem;
    }

    // Call the function to create the footer navigation bar
    createFooterNavbar();
    updateNavigation(); // Add careers and change blog to news

    function DisplayHomePage() {
        console.log("Called DisplayHomePage...");
    }
    function DisplayPortfolioPage() {
        console.log("Called DisplayPortfolioPage...");
        LoadButton();
    }
    function DisplayServicePage() {
        console.log("Called DisplayServicePage...");
    }
    function DisplayTeamPage() {
        console.log("Called DisplayTeamPage...");
    }
    function DisplayBlogPage() {
        console.log("Called DisplayBlogPage...");
    }
    function DisplayPrivacyPolicyPage(){
        console.log("Called DisplayPrivacyPolicyPage...");
    }
    function DisplayTermsOfServicePage(){
        console.log("Called DisplayTermsOfServicePage...");
    }
    function DisplayContactPage(){
        console.log("Called DisplayContactPage...");

        ContactFormValidation();

        // let submitButton = document.getElementById("submitButton");
        // let contactForm = document.getElementById("ContactForm");
        // let contactModal = new bootstrap.Modal(document.getElementById('ContactModal'));
        // let contactErrorModal = new bootstrap.Modal(document.getElementById('ContactErrorModal'));
        //
        // submitButton.addEventListener("click", function(event) {
        //     event.preventDefault(); // prevent default form submission behavior
        //
        //     let contactName = fullNameInput.value.trim();
        //     let contactEmail = emailAddressInput.value.trim();
        //     let contactMessage = messageInput.value.trim();
        //
        //     if (contactName !== "" && contactEmail !== "" && contactMessage !== "") {
        //         document.getElementById('modalFullName').textContent = `Name: ${contactName}`;
        //         document.getElementById('modalEmailAddress').textContent = `Email: ${contactEmail}`;
        //         document.getElementById('modalMessage').textContent = `Message: ${contactMessage}`;
        //
        //         contactForm.reset();
        //         contactModal.show();
        //         setTimeout(redirect, 5000);
        //     } else {
        //         contactErrorModal.show();
        //     }
        //
        //     function displayModal(fullName, phoneNumber, email) {
        //         // Set the modal body content with the submitted data
        //         let modalBody = document.getElementById('modalBody');
        //         modalBody.innerHTML = `
        //           <p><strong>Full Name:</strong> ${fullName}</p>
        //           <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        //           <p><strong>Email:</strong> ${email}</p>
        //        `;
        //
        //         // Show the modal
        //         $('#myModal').modal('show');
        //     }
        // });
        //
        // function redirect() {
        //     window.location.href = "index.html";
        // }

    }

    function DisplayEventPage() {
        console.log("Called DisplayEventPage...");

        $.get("./data/events.json", function(data) {
            for(const event of data.events) {
                $("#events").append(
                    `
                    <div class="event-card">
                        <h2>${event.title}</h2>
                        <p>Date: ${event.date}</p>
                        <p>Location: ${event.location}</p>
                        <p>Description: ${event.description}</p>
                    </div>
                    `
                );
            }
        });
    }

    function DisplayGalleryPage() {
        console.log("Called DisplayGalleryPage...");

        const imageWrapper = document.querySelector(".images");
        const searchInput = document.querySelector(".search input");
        const loadMoreBtn = document.querySelector(".gallery .load-more");
        const lightbox = document.querySelector(".lightbox");
        const downloadImgBtn = lightbox.querySelector(".uil-import");
        const closeImgBtn = lightbox.querySelector(".close-icon");

        // API key, paginations, searchTerm variables
        const apiKey = "3VG8elotqjE4I85ZORIkvgY9vLuZ8R9XjQ67ijmdNfCaNSHZV0KVwJA5";
        const perPage = 15;
        let currentPage = 1;
        let searchTerm = null;

        const downloadImg = (imgUrl) => {
            // Converting received img to blob, creating its download link, & downloading it
            fetch(imgUrl).then(res => res.blob()).then(blob => {
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = new Date().getTime();
                a.click();
            }).catch(() => alert("Failed to download image!"));
        }

        const showLightbox = (name, img) => {
            // Showing lightbox and setting img source, name and button attribute
            lightbox.querySelector("img").src = img;
            lightbox.querySelector("span").innerText = name;
            downloadImgBtn.setAttribute("data-img", img);
            lightbox.classList.add("show");
            document.body.style.overflow = "hidden";
        }

        const hideLightbox = () => {
            // Hiding lightbox on close icon click
            lightbox.classList.remove("show");
            document.body.style.overflow = "auto";
        }

        const generateHTML = (images) => {
            // Making li of all fetched images and adding them to the existing image wrapper
            imageWrapper.innerHTML += images.map(img =>
                `<li class="card">
            <img onclick="showLightbox('${img.photographer}', '${img.src.large2x}')" src="${img.src.large2x}" alt="img">
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button onclick="downloadImg('${img.src.large2x}');">
                    <i class="uil uil-import"></i>
                </button>
            </div>
        </li>`
            ).join("");
        }

        const getImages = (apiURL) => {
            // Fetching images by API call with authorization header
            searchInput.blur();
            loadMoreBtn.innerText = "Loading...";
            loadMoreBtn.classList.add("disabled");
            fetch(apiURL, {
                headers: { Authorization: apiKey }
            }).then(res => res.json()).then(data => {
                generateHTML(data.photos);
                loadMoreBtn.innerText = "Load More";
                loadMoreBtn.classList.remove("disabled");
            }).catch(() => alert("Failed to load images!"));
        }

        const loadMoreImages = () => {
            currentPage++; // Increment currentPage by 1
            // If searchTerm has some value then call API with search term else call default API
            let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
            apiUrl = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiUrl;
            getImages(apiUrl);
        }

        const loadSearchImages = (e) => {
            // If the search input is empty, set the search term to null and return from here
            if (e.target.value === "") return searchTerm = null;
            // If pressed key is Enter, update the current page, search term & call the getImages
            if (e.key === "Enter") {
                currentPage = 1;
                searchTerm = e.target.value;
                imageWrapper.innerHTML = "";
                getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=${perPage}`);
            }
        }

        getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
        loadMoreBtn.addEventListener("click", loadMoreImages);
        searchInput.addEventListener("keyup", loadSearchImages);
        closeImgBtn.addEventListener("click", hideLightbox);
        downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));
    }

    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage...");

        ContactFormValidation();

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
        RegisterFormValidation();

        $("#submitButton").on("click", (event) =>{
            event.preventDefault();
        });
    }

    function Start() {
        console.log("App Started....");

        AjaxRequest("GET", "header.html", LoadHeader);
        createFooterNavbar();

        switch (document.title) {
            case "Home":
                DisplayHomePage();
                break;
            case "Portfolio":
                DisplayPortfolioPage();
                break;
            case "Our Team":
                DisplayTeamPage();
                break;
            case "Blog":
                DisplayBlogPage();
                break;
            case "Our Services":
                DisplayServicePage();

            case "Privacy Policy":
                DisplayPrivacyPolicyPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Terms of Service":
                DisplayTermsOfServicePage();
                break;
            case "Events":
                DisplayEventPage();
                break;
            case "Gallery":
                DisplayGalleryPage();
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