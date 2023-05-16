// Form Login
const form_login = document.getElementById("form_login");
if (form_login) {
    form_login.onsubmit = async function (e) {
    e.preventDefault();

    const btn_submit = document.querySelector("#form_login button[type='submit']");
    const formData = new FormData(form_login);

    btn_submit.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...';
    btn_submit.disabled = true;

    const response = await window.axios.backendLaravel('post', 'login', {
            email: formData.get("email"),
            password: formData.get("password"),
        } );

    // If email and password validation fails 
    if ( response.user == null ) {
        const field_email = document.querySelector("#form_login input[name='email']");
        const field_password = document.querySelector("#form_login input[name='password']");
        const invalid_email = document.getElementById("invalid_email");
        const invalid_password = document.getElementById("invalid_password");

        if ( response.errors.email == undefined ) {
            invalid_email.innerHTML = '';
            field_email.classList.remove('is-invalid');
        }
        else {
            invalid_email.innerHTML = response.errors.email;
            field_email.classList.add('is-invalid');
        }
        
        if ( response.errors.password == undefined ) {
            invalid_password.innerHTML = '';
            field_password.classList.remove('is-invalid');
        }
        else {
            invalid_password.innerHTML = response.errors.password;
            field_password.classList.add('is-invalid');
        }

        btn_submit.innerHTML = 'Login';
        btn_submit.disabled = false;
        return;
    }

    // Store Token for Backend Laravel API access
    sessionStorage.setItem('token', response.token);
    alertMessage("success", "Successfully logged in account!");

    // Hide Login Form and Show Prompts Table
    const div_login = document.getElementById("div_login");
    const div_prompts = document.getElementById("div_prompts");
    div_login.classList.add('d-none');
    div_prompts.classList.remove('d-none');
    div_prompts.classList.add('d-flex');

    btn_submit.innerHTML = 'Login';
    btn_submit.disabled = false;

    // Load Table
    getPrompts();
  };
}

// Btn Logs
const btn_logs = document.getElementById('btn_logs');
if (btn_logs) {
    btn_logs.onclick = async function () {
    const div_login = document.getElementById("div_login");
    const div_prompts = document.getElementById("div_prompts");
    const div_tbl = document.getElementById("div_tbl");
    div_prompts.classList.add('d-none');
    div_login.classList.add('d-none');
    div_tbl.classList.remove('d-none');
    div_tbl.classList.add('d-flex');
    getPrompts();
    }
}

// Btn Back
const btn_back = document.getElementById('btn_back');
if (btn_back) {
    btn_back.onclick = async function () {
    const div_login = document.getElementById("div_login");
    const div_prompts = document.getElementById("div_prompts");
    const div_tbl = document.getElementById("div_tbl");
    div_login.classList.add('d-none');
    div_tbl.classList.add('d-none');
    div_prompts.classList.remove('d-none');
    div_prompts.classList.add('d-flex');
    getPrompts();
    }
}


// Btn Logout
const btn_logout = document.getElementById('btn_logout');
if (btn_logout) {
    btn_logout.onclick = async function () {
        btn_logout.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...';
        btn_logout.disabled = true;

        // Use Token to Logout
        const token = sessionStorage.getItem('token');
        const response = await window.axios.backendLaravel('post', 'logout', null, token);
        console.log(response);

        // Hide Login Form and Show Prompts Table
        const div_login = document.getElementById("div_login");
        const div_prompts = document.getElementById("div_prompts");
        div_login.classList.remove('d-none');
        div_login.classList.add('d-flex');
        div_prompts.classList.remove('d-flex');
        div_prompts.classList.add('d-none');

        // Clear Login Form Fields
        const field_email = document.querySelector("#form_login input[name='email']");
        const field_password = document.querySelector("#form_login input[name='password']");
        const invalid_email = document.getElementById("invalid_email");
        const invalid_password = document.getElementById("invalid_password");
        invalid_email.innerHTML = '';
        field_email.value = '';
        field_email.classList.remove('is-invalid');
        invalid_password.innerHTML = '';
        field_password.value = '';
        field_password.classList.remove('is-invalid');
        
        btn_logout.innerHTML = 'Logout';
        btn_logout.disabled = false;
    }
}

// Read Prompts from SupaBase --ORIGINAL
async function getPrompts () {
    // Fetch API Response
    const response = await window.axios.backendLaravel('get', 'prompts');

    // Load table from API Response
    let htmlResult = '';
    Object.keys(response).forEach(key => {
        let date = new Date(response[key].created_at.replace(' ', 'T'));

        htmlResult += '<tr>' +
            '<th scope="row">' +  response[key].prompt_id + '</th>' +
            '<td>' + response[key].tools_type + '</td>' +
            '<td>' + response[key].text + '</td>' +
            '<td>' + response[key].result + '</td>' +
            '<td>' + date.toLocaleString('en-US', { timeZone: 'UTC' }) + '</td>' +
            '<td>' + 
                '<div class="btn-group" role="group">' +
                    '<button id="btn_prompts_del" name="' + response[key].prompt_id + '" type="button" class="btn btn-danger btn-sm" aria-expanded="false">' +
                        'Remove' +
                    '</button>' +
                '</div>' +
        '</tr>';
    });

    const tbody = document.getElementById('tbl_prompts');
    tbody.innerHTML = htmlResult;
}


// async function getPrompts(page = 1, pageSize = 5) {
//     // Calculate the start index based on the current page
//     const startIndex = (page - 1) * pageSize;
  
//     // Fetch API Response
//     const response = await window.axios.backendLaravel('get', 'prompts');
  
//     // Get the total number of prompts
//     const totalPrompts = Object.keys(response).length;
  
//     // Calculate the total number of pages
//     const totalPages = Math.ceil(totalPrompts / pageSize);
  
//     // Calculate the end index for the current page
//     const endIndex = Math.min(startIndex + pageSize, totalPrompts);
  
//     // Load table rows for the current page
//     let htmlResult = '';
//     for (let i = startIndex; i < endIndex; i++) {
//       const key = Object.keys(response)[i];
//       const prompt = response[key];
//       const date = new Date(prompt.created_at.replace(' ', 'T'));
  
//       htmlResult += '<tr>' +
//         '<th scope="row">' + prompt.prompt_id + '</th>' +
//         '<td>' + prompt.tools_type + '</td>' +
//         '<td>' + prompt.text + '</td>' +
//         '<td>' + prompt.result + '</td>' +
//         '<td>' + date.toLocaleString('en-US', { timeZone: 'UTC' }) + '</td>' +
//         '<td>' +
//         '<div class="btn-group" role="group">' +
//         '<button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">' +
//         'Action' +
//         '</button>' +
//         '<ul class="dropdown-menu">' +
//         '<li><a id="btn_prompts_del" class="dropdown-item" href="#" name="' + prompt.prompt_id + '">Remove</a></li>' +
//         '</ul>' +
//         '</div>' +
//         '</tr>';
//     }
  
//     const tbody = document.getElementById('tbl_prompts');
//     tbody.innerHTML = htmlResult;
  
//     // Update pagination links
//     const pagination = document.getElementById('pagination');
//     pagination.innerHTML = createPaginationLinks(page, totalPages);
//   }
  
//   // Helper function to create pagination links
//   function createPaginationLinks(currentPage, totalPages) {
//     let links = '';
    
//     for (let i = 1; i <= totalPages; i++) {
//       links += '<li class="page-item' + (i === currentPage ? ' active' : '') + '">';
//       links += '<a class="page-link" href="#" data-page="' + i + '">' + i + '</a>';
//       links += '</li>';
//     }
   
//     return links;
//   }
  
//   // Handle pagination link clicks
//   const pagination = document.getElementById('pagination');
//   if (pagination) {
//     pagination.addEventListener('click', function (e) {
//       e.preventDefault();
//       if (e.target && e.target.matches('a.page-link')) {
//         const page = parseInt(e.target.getAttribute('data-page'));
//         getPrompts(page);
//       }
//     });
//   }

  

// Set Btn Delete Prompt Click functionality from Table Prompts
const tbl_prompts = document.getElementById('tbl_prompts');
if (tbl_prompts) {
    tbl_prompts.onclick = async function (e) {
        if(e.target && e.target.id == "btn_prompts_del") {
            const id = e.target.name;
            const response = await window.axios.backendLaravelDelete('delete', id);
            console.log(response);
            
            alertMessage("success", "Successfully deleted id " + id + '!');
            getPrompts();
        }
    };
}
