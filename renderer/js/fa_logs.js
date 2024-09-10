// Main Window - Factual Answering Tool#2 Btn
const btn_fa = document.getElementById('btn_fa');
if (btn_fa) {
    btn_fa.onclick = async function () {
    const div_login = document.getElementById("div_login");
    const div_prompts = document.getElementById("div_prompts_fa");
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

// Form Submit for Factual Answering
const form_openai_fa = document.getElementById("form_openai_fa");
if (form_openai_fa) {
  form_openai_fa.onsubmit = async function (e) {
    e.preventDefault();

    const btn_submit = document.querySelector("#form_openai_fa button[type='submit']");
    const formData = new FormData(form_openai_fa);
    let tools_type = formData.get("tools-type");
    let sentence = formData.get("sentence-text");

    if(sentence == 0){
        alertMessage("error", "The input is empty!")
    }
    if (sentence.length <= 8) {
      alertMessage("error", "Too short. Please input text at least 5!");
      return;
    }

    btn_submit.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...';
    btn_submit.disabled = true;

    const response = await window.axios.openAI(sentence, tools_type);
    let result = response.choices[0].text;
    document.querySelector("#div-results textarea").innerHTML = result.replace(/\n/g, "");

    const token = sessionStorage.getItem('token');
    // console.log(token)
    const db_response = await window.axios.backendLaravelPost('post', '', {
      text: sentence,
      result: result,
      tools_type: tools_type
    }, token);

    console.log(db_response);

    btn_submit.innerHTML = 'Process Text';
    btn_submit.disabled = false;

    const authToken = token;
    console.log(authToken);
    sessionStorage.setItem('token', authToken);
  };
}

// First Btn Back in Factual Answering
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

// Factual Answering Logs Back Btn - Second Btn
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

// Btn Delete in Factual Answering Table Prompts
const tbl_prompts_fa = document.getElementById('tbl_prompts_fa');
if (tbl_prompts_fa) {
    tbl_prompts_fa.onclick = async function (e) {
        if(e.target && e.target.id == "btn_prompts_del") {
            const id = e.target.name;
            const token = sessionStorage.getItem('token');
            const response = await window.axios.backendLaravelDelete('delete', id, null, token);
            console.log(response);
            
            alertMessage("success", "Successfully deleted id " + id + '!');
            getPrompts_fa();
        }
    };
}

// First Logout Btn for Factual Answering
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

// Factual Answering Table Prompts Logout Btn- Second Logout Btn
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
    const token = sessionStorage.getItem('token');
    const response = await window.axios.backendLaravel('get', 'prompts', null, token);

    // Load table from API Response
    let htmlResult = '';
    let index = 1;
    Object.keys(response).forEach(key => {
        let date = new Date(response[key].created_at.replace(' ', 'T'));

        if (response[key].tools_type === 'Factual Answering') {
        htmlResult += '<tr>' +
            '<th scope="row">' +  index + '</th>' +
            '<td>' + response[key].tools_type + '</td>' +
            '<td>' + response[key].text + '</td>' +
            '<td>' + response[key].result + '</td>' +
            '<td>' + date.toLocaleString('en-US', { timeZone: 'Asia/Manila' }) + '</td>' +
            '<td>' + 
                '<div class="btn-group" role="group">' +
                    '<button id="btn_prompts_del" name="' + response[key].prompt_id + '" type="button" class="btn btn-danger btn-sm" aria-expanded="false">' +
                        'Remove' +
                    '</button>' +
                '</div>' +
        '</tr>';
        index++;
    }
    });

    const tbody = document.getElementById('tbl_prompts_fa');
    tbody.innerHTML = htmlResult;

    const authToken = token;
    console.log(authToken);
    sessionStorage.setItem('token', authToken);
  }
