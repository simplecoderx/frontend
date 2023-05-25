// Btn Back for Factual Answering
const btn_back_fa = document.getElementById('btn_back_fa');
if (btn_back_fa) {
    btn_back_fa.onclick = async function () {
    const div_login = document.getElementById("div_login");
    const div_prompts_fa = document.getElementById("div_prompts_fa");
    const div_fa = document.getElementById("div_fa");
    const div_tbl_fa = document.getElementById("div_tbl_fa");
    div_login.classList.add('d-none');
    div_tbl_fa.classList.add('d-none');
    div_fa.classList.remove('d-none');
    div_fa.classList.add('d-fkex');
    div_prompts_fa.classList.remove('d-none');
    div_prompts_fa.classList.add('d-flex');
    getPrompts_fa();
    }
}

// Btn Logs for Factual Answering
const btn_logs_fa = document.getElementById('btn_logs_fa');
if (btn_logs_fa) {
    btn_logs_fa.onclick = async function () {
    const div_login = document.getElementById("div_login");
    const div_prompts_fa = document.getElementById("div_prompts_fa");
    const div_tools_no2 = document.getElementById("div_tools_no2");
    const div_fa = document.getElementById("div_fa");
    const div_tbl_fa = document.getElementById("div_tbl_fa");
    div_tools_no2.classList.add('d-none');
    div_prompts_fa.classList.add('d-none');
    div_login.classList.add('d-none');
    div_fa.classList.remove('d-none');
    div_fa.classList.add('d-flex');
    div_tbl_fa.classList.remove('d-none');
    div_tbl_fa.classList.add('d-flex');
    getPrompts_fa();
    }
}

// Btn Back Tools for Factual Answering
const btn_back_tools_fa = document.getElementById('btn_back_tools_fa');
if (btn_back_tools_fa) {
    btn_back_tools_fa.onclick = async function () {
        const div_login = document.getElementById("div_login");
        const div_prompts_fa = document.getElementById("div_prompts_fa");
        const div_tools_no2 = document.getElementById("div_tools_no2");
        const div_tools = document.getElementById("div_tools");
        div_tools_no2.classList.add('d-none');
        div_login.classList.add('d-none');
        div_prompts_fa.classList.add('d-none');
        div_tools.classList.remove('d-none');
        div_tools.classList.add('d-flex');
    }
}

const tbl_prompts_fa = document.getElementById('tbl_prompts_fa');
if (tbl_prompts_fa) {
    tbl_prompts_fa.onclick = async function (e) {
        if(e.target && e.target.id == "btn_prompts_del") {
            const id = e.target.name;
            const response = await window.axios.backendLaravelDelete('delete', id);
            console.log(response);
            
            alertMessage("success", "Successfully deleted id " + id + '!');
            getPrompts_fa();
        }
    };
}

// Btn Logout for Factual Answering
const btn_logout_fa = document.getElementById('btn_logout_fa');
if (btn_logout_fa) {
    btn_logout_fa.onclick = async function () {
        btn_logout_fa.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...';
        btn_logout_fa.disabled = true;

        // Use Token to Logout
        const token = sessionStorage.getItem('token');
        const response = await window.axios.backendLaravel('post', 'logout', null, token);
        console.log(response);

        // Hide Login Form and Show Prompts Table
        const div_login = document.getElementById("div_login");
        const div_prompts = document.getElementById("div_prompts_fa");
        div_prompts_fa.classList.add('d-none');
        div_login.classList.remove('d-none');
        div_login.classList.add('d-flex');

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
        
        btn_logout_fa.innerHTML = 'Logout';
        btn_logout_fa.disabled = false;
    }
}

// Btn Logout for Factual Answering
const btn_logout_fa2 = document.getElementById('btn_logout_fa2');
if (btn_logout_fa2) {
    btn_logout_fa2.onclick = async function () {
        btn_logout_fa2.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...';
        btn_logout_fa2.disabled = true;

        // Use Token to Logout
        const token = sessionStorage.getItem('token');
        const response = await window.axios.backendLaravel('post', 'logout', null, token);
        console.log(response);

        // Hide Login Form and Show Prompts Table
        const div_login = document.getElementById("div_login");
        const div_prompts_fa = document.getElementById("div_prompts_fa");
        const div_tbl_fa = document.getElementById("div_tbl_fa");
        div_prompts_fa.classList.add('d-none');
        div_tbl_fa.classList.add('d-none');
        div_login.classList.remove('d-none');
        div_login.classList.add('d-flex');

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
        
        btn_logout_fa2.innerHTML = 'Logout';
        btn_logout_fa2.disabled = false;
    }
}

// Read Prompts from Laravel for Factual Answering
async function getPrompts_fa() {
    // Fetch API Response
    const response = await window.axios.backendLaravel('get', 'prompts');

    // Load table from API Response
    let htmlResult = '';
    Object.keys(response).forEach(key => {
        let date = new Date(response[key].created_at.replace(' ', 'T'));

        if (response[key].tools_type === 'Factual Answering') {
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

    const tbody = document.getElementById('tbl_prompts_fa');
    tbody.innerHTML = htmlResult;
  }
