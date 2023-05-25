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

    // Hide Login Form and Show Tools
    const div_login = document.getElementById("div_login");
    const div_prompts = document.getElementById("div_prompts");
    const div_tools = document.getElementById("div_tools");
    div_login.classList.add('d-none');
    div_prompts.classList.add('d-none');
    div_tools.classList.remove('d-none');
    div_tools.classList.add('d-flex');

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

const btn_all_logs = document.getElementById('btn_all_logs');
if (btn_all_logs) {
    btn_all_logs.onclick = async function () {
    const div_login = document.getElementById("div_login");
    const div_tools = document.getElementById("div_tools");
    const div_tbl_all = document.getElementById("div_tbl_all");
    div_login.classList.add('d-none');
    div_tools.classList.add('d-none');
    div_tbl_all.classList.remove('d-none');
    div_tbl_all.classList.add('d-flex');
    getPromptsAll();
    }
}

// Btn English to Another Language
const btn_engla = document.getElementById('btn_engla');
if (btn_engla) {
    btn_engla.onclick = async function () {
    const div_login = document.getElementById("div_login");
    const div_prompts = document.getElementById("div_prompts");
    // const div_tbl = document.getElementById("div_tbl");
    const div_tools = document.getElementById("div_tools");
    const div_tool_no1 = document.getElementById("div_tool_no1");
    const div_tool_no2 = document.getElementById("div_tool_no2");
    const div_fa = document.getElementById("div_fa");
    const div_engla = document.getElementById("div_engla");
    div_fa.classList.add('d-none');
    div_tool_no1.classList.add('d-none');
    div_tool_no2.classList.add('d-none');
    div_login.classList.add('d-none');
    div_tools.classList.add('d-none');
    div_engla.classList.remove('d-none');
    div_engla.classList.add('d-flex');
    div_prompts.classList.remove('d-none');
    div_prompts.classList.add('d-flex');
    }
}

// Btn Factual Answering
const btn_fa = document.getElementById('btn_fa');
if (btn_fa) {
    btn_fa.onclick = async function () {
    const div_login = document.getElementById("div_login");
    const div_prompts = document.getElementById("div_prompts_fa");
    // const div_tbl = document.getElementById("div_tbl");
    const div_tools = document.getElementById("div_tools");
    const div_tool_no1 = document.getElementById("div_tool_no1");
    const div_tools_no2 = document.getElementById("div_tools_no2");
    const div_fa = document.getElementById("div_fa");
    const div_engla = document.getElementById("div_engla");
    div_tool_no1.classList.add('d-none');
    div_tools_no2.classList.add('d-none');
    div_engla.classList.add('d-none');
    div_login.classList.add('d-none');
    div_tools.classList.add('d-none');
    div_fa.classList.remove('d-none');
    div_fa.classList.add('d-flex');
    div_prompts.classList.remove('d-none');
    div_prompts.classList.add('d-flex');
    }
}

// Btn Back
const btn_back = document.getElementById('btn_back');
if (btn_back) {
    btn_back.onclick = async function () {
    const div_login = document.getElementById("div_login");
    const div_prompts = document.getElementById("div_prompts");
    const div_engla = document.getElementById("div_engla");
    const div_tbl = document.getElementById("div_tbl");
    div_login.classList.add('d-none');
    div_tbl.classList.add('d-none');
    div_engla.classList.remove('d-none');
    div_engla.classList.add('d-flex');
    div_prompts.classList.remove('d-none');
    div_prompts.classList.add('d-flex');
    getPrompts();
    }
}

const btn_back_all = document.getElementById('btn_back_all');
if (btn_back_all) {
    btn_back_all.onclick = async function () {
    const div_login = document.getElementById("div_login");
    const div_prompts = document.getElementById("div_prompts");
    const div_engla = document.getElementById("div_engla");
    const div_tbl = document.getElementById("div_tbl_all");
    const div_tools = document.getElementById("div_tools");
    div_login.classList.add('d-none');
    div_tbl_all.classList.add('d-none');
    div_engla.classList.add('d-none');
    div_prompts.classList.add('d-none');
    div_tools.classList.remove('d-none');
    div_tools.classList.add('d-flex');
    // getPrompts();
    }
}


// Btn Back Tools
const btn_back_tools = document.getElementById('btn_back_tools');
if (btn_back_tools) {
    btn_back_tools.onclick = async function () {
        const div_login = document.getElementById("div_login");
        const div_prompts = document.getElementById("div_prompts");
        const div_tools = document.getElementById("div_tools");
        div_login.classList.add('d-none');
        div_prompts.classList.add('d-none');
        div_tools.classList.remove('d-none');
        div_tools.classList.add('d-flex');
    }
}

// Btn Logout
const btn_logout1 = document.getElementById('btn_logout1');
if (btn_logout1) {
    btn_logout1.onclick = async function () {
        btn_logout1.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...';
        btn_logout1.disabled = true;

        // Use Token to Logout
        const token = sessionStorage.getItem('token');
        const response = await window.axios.backendLaravel('post', 'logout', null, token);
        console.log(response);

        // Hide Login Form and Show Prompts Table
        const div_login = document.getElementById("div_login");
        const div_prompts = document.getElementById("div_prompts");
        const div_tools = document.getElementById("div_tools");
        div_prompts.classList.add('d-none');
        div_tools.classList.add('d-none');
        div_login.classList.remove('d-none');
        // div_tools.classList.remove('d-none');
        div_login.classList.add('d-flex');
        // div_prompts.classList.remove('d-flex');
        // div_prompts.classList.add('d-none');

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

        alertMessage("success", "Successfully logged out account!");
        
        btn_logout1.innerHTML = 'Logout';
        btn_logout1.disabled = false;
    }
}

// Btn Logout2
const btn_logout2 = document.getElementById('btn_logout2');
if (btn_logout2) {
    btn_logout2.onclick = async function () {
        btn_logout2.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...';
        btn_logout2.disabled = true;

        // Use Token to Logout
        const token = sessionStorage.getItem('token');
        const response = await window.axios.backendLaravel('post', 'logout', null, token);
        console.log(response);

        // Hide Login Form and Show Prompts Table
        const div_login = document.getElementById("div_login");
        const div_prompts = document.getElementById("div_prompts");
        const div_tbl = document.getElementById("div_tbl");
        const div_tools = document.getElementById("div_tools");
        div_prompts.classList.add('d-none');
        div_tbl.classList.add('d-none');
        div_tools.classList.add('d-none');
        div_login.classList.remove('d-none');
        // div_tools.classList.remove('d-none');
        div_login.classList.add('d-flex');
        // div_prompts.classList.remove('d-flex');
        // div_prompts.classList.add('d-none');

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

        alertMessage("success", "Successfully logged out account!");
        
        btn_logout2.innerHTML = 'Logout';
        btn_logout2.disabled = false;
    }
}

// Btn Logout
const btn_logout_index = document.getElementById('btn_logout_index');
if (btn_logout_index) {
    btn_logout_index.onclick = async function () {
        btn_logout_index.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...';
        btn_logout_index.disabled = true;

        // Use Token to Logout
        const token = sessionStorage.getItem('token');
        const response = await window.axios.backendLaravel('post', 'logout', null, token);
        console.log(response);

        // Hide Login Form and Show Prompts Table
        const div_login = document.getElementById("div_login");
        const div_prompts = document.getElementById("div_prompts");
        const div_tools = document.getElementById("div_tools");
        div_prompts.classList.add('d-none');
        div_tools.classList.add('d-none');
        div_login.classList.remove('d-none');
        // div_tools.classList.remove('d-none');
        div_login.classList.add('d-flex');
        // div_prompts.classList.remove('d-flex');
        // div_prompts.classList.add('d-none');

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

        alertMessage("success", "Successfully logged out account!");
        
        btn_logout_index.innerHTML = 'Logout';
        btn_logout_index.disabled = false;
    }
}

// Read Prompts from Laravel Filtered by Tools Type: English to Another Language
async function getPrompts () {
    // Fetch API Response
    const response = await window.axios.backendLaravel('get', 'prompts');

    // Load table from API Response
    let htmlResult = '';
    Object.keys(response).forEach(key => {
        let date = new Date(response[key].created_at.replace(' ', 'T'));
        
        if (response[key].tools_type === 'English to Another Language') {
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
        }
    });

    const tbody = document.getElementById('tbl_prompts');
    tbody.innerHTML = htmlResult;
}


// Read All Prompts from Laravel
async function getPromptsAll () {
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

    const tbody = document.getElementById('tbl_prompts_all');
    // tbody.innerHTML = htmlResult;
}
  

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

const tbl_prompts_all = document.getElementById('tbl_prompts_all');
if (tbl_prompts_all) {
    tbl_prompts_all.onclick = async function (e) {
        if(e.target && e.target.id == "btn_prompts_del") {
            const id = e.target.name;
            const response = await window.axios.backendLaravelDelete('delete', id);
            console.log(response);
            
            alertMessage("success", "Successfully deleted id " + id + '!');
            getPrompts();
        }
    };
}
