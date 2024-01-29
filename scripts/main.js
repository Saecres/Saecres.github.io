/*
Name: Kaitlin Penaranda
Date: January 27, 2024
ID: 100869243
*/

(function f() {
    function DisplayHomePage() {
        console.log("Called DisplayHomePage...");
    }
    function DisplayPortfolioPage() {
        console.log("Called DisplayPortfolioPage...");


        let project = {
            title: 'Harmony Hub',
            description: 'Discover a world where creativity meets innovation. ' +
                'Dive into a seamless blend of artistry and technology that transcends boundaries. ' +
                'Here, every click is a journey, and every scroll unveils a new chapter.',
            image: '../images/website.jpg'
        };

        // Get the project container element
        let projectContainer = document.getElementById('project-container');

        // Create HTML elements to display project information
        let titleElement = document.createElement('h2');
        titleElement.textContent = project.title;

        let descriptionElement = document.createElement('p');
        descriptionElement.textContent = project.description;

        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', project.image);
        imageElement.setAttribute('alt', project.title);

        // Append elements to the project container
        projectContainer.appendChild(titleElement);
        projectContainer.appendChild(descriptionElement);
        projectContainer.appendChild(imageElement);


        // // Storage for projects
        // let Projects = [
        //     { title: 'Tic Tac Toe',
        //         description: 'Experience the timeless thrill of Tic Tac Toe with our Dynamic Tic Tac Toe project. ' +
        //             'Engage in strategic battles, challenging friends or enjoying solo matches against a smart ' +
        //             'AI opponent. The game\'s sleek design ensures a seamless experience across devices.',
        //         image: '../images/tictactoe.jpg'}
        // ]
        //
        // let CardContainer = document.getElementsByTagName("main")[0];
        //
        // // Loop to create every card in the storage
        // Projects.forEach(project => {
        //     CreateProjectCard(project);
        // })
        //
        // function CreateProjectCard(Project){
        //
        //     // creating div for the card
        //     let Card = document.createElement('div');
        //     Card.setAttribute("class", "portfolioDiv")
        //
        //     // create h2 tag for the title of the card
        //     let Title = document.createElement('h2');
        //     Title.setAttribute("class", "blog-title")
        //     // put the text into the h2 tag
        //     Title.textContent = Project.title;
        //
        //     // create a paragraph tag to store the description of the card
        //     let Description = document.createElement('p');
        //     Description.setAttribute("class", "ProjectDescription");
        //     Description.setAttribute("class", "mt-3");
        //
        //     // put the text into the p tag
        //     Description.textContent = Project.description;
        //
        //     // create a picture tag to store the image of the project
        //     let Picture = document.createElement('img');
        //     Picture.setAttribute("class", "ProjImg")
        //
        //     // add the image to the tag
        //     Picture.src = Project.image;
        //
        //     // add an alternate text in case image does not load
        //     Picture.alt = Project.title
        //
        //     // Append the tags to the card
        //     Card.appendChild(Title);
        //     Card.appendChild(Description);
        //     Card.appendChild(Picture);
        //
        //     // Append div to main container
        //     CardContainer.appendChild(Card);
        // }
        //
        // // make function to add more projects
        // function AddMoreProjects(){
        //     // Clears the main tag project
        //     CardContainer.innerHTML = '';
        //
        //     // More hypothetical projects
        //     let MoreProjects = [
        //         { title: 'Harmony Hub',
        //             description: 'Discover a world where creativity meets innovation. ' +
        //                 'Dive into a seamless blend of artistry and technology that transcends boundaries. ' +
        //                 'Here, every click is a journey, and every scroll unveils a new chapter.',
        //             image: '../images/website.jpg' },
        //         // Add more projects as needed
        //     ]
        //     // Creates new projects
        //     MoreProjects.forEach(MoreProject => {
        //         CreateProjectCard(MoreProject);
        //     })
        // }

        let LoadMoreBtn = document.getElementById("LoadMoreBtn");
        LoadMoreBtn.addEventListener("click", function (){
            AddMoreProjects();
        });
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


        let fullNameInput = document.getElementById('yourName');
        let emailAddressInput = document.getElementById('yourEmail');
        let messageInput = document.getElementById('userMessage');

        let submitButton = document.getElementById("submitButton");
        let contactForm = document.getElementById("ContactForm");
        let contactModal = new bootstrap.Modal(document.getElementById('ContactModal'));
        let contactErrorModal = new bootstrap.Modal(document.getElementById('ContactErrorModal'));

        submitButton.addEventListener("click", function(event) {
            event.preventDefault(); // prevent default form submission behavior

            let contactName = fullNameInput.value.trim();
            let contactEmail = emailAddressInput.value.trim();
            let contactMessage = messageInput.value.trim();

            if (contactName !== "" && contactEmail !== "" && contactMessage !== "") {
                document.getElementById('modalFullName').textContent = `Name: ${contactName}`;
                document.getElementById('modalEmailAddress').textContent = `Email: ${contactEmail}`;
                document.getElementById('modalMessage').textContent = `Message: ${contactMessage}`;

                contactForm.reset();
                contactModal.show();
                setTimeout(redirect, 5000);
            } else {
                contactErrorModal.show();
            }

            function displayModal(fullName, phoneNumber, email) {
                // Set the modal body content with the submitted data
                let modalBody = document.getElementById('modalBody');
                modalBody.innerHTML = `
                  <p><strong>Full Name:</strong> ${fullName}</p>
                  <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                  <p><strong>Email:</strong> ${email}</p>
               `;

                // Show the modal
                $('#myModal').modal('show');
            }
        });


        function redirect() {
            window.location.href = "index.html";
        }

    }



    function Start() {
        console.log("App Started....");
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
        }

        // Creates fixed navigation bar
        function createFooterNavbar() {
            console.log("Creating footer navbar...");  // Debug statement
            const footerNav = document.createElement('nav');
            footerNav.className = 'navbar navbar-expand-md navbar-dark bg-black fixed-bottom';

            // Add padding to the bottom of the body to accommodate the fixed footer
            document.body.style.paddingBottom = '5em';

            const navList = document.createElement('ul');
            navList.className = 'navbar-nav mx-auto';

            // // Updated: Add 'Careers' dynamically
            // const careersLink = createNavLink('Careers', '../careers.html');  // Set your actual URL
            // navList.appendChild(careersLink);
            //
            // // Updated: Change 'Blog' to 'News'
            // const newsLink = createNavLink('News', '../careers.html');  // Set your actual URL
            // let blogLink = document.getElementById('blogLink');
            // if (blogLink) {
            //     blogLink.replaceWith(newsLink);
            // }

            const privacyLink = createNavLink('Privacy Policy', '../privacy-policy.html');
            const termsLink = createNavLink('Terms of Service', '../terms-of-service.html');
            const contactLink = createNavLink('Contact', '../contact.html');

            navList.appendChild(privacyLink);
            navList.appendChild(termsLink);
            navList.appendChild(contactLink);

            footerNav.appendChild(navList);
            document.body.appendChild(footerNav);

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
                icon.className = 'fas fa-newspaper'; // Set your desired Font Awesome icon class

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
    }

    window.addEventListener("load", Start);
})()