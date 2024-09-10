// Extract Text from Image: Tesseract
const btn_extract = document.getElementById("btn_extract");
if (btn_extract) {
  btn_extract.onclick = async function () {
    const file = document.getElementById("file_extract").files[0];

    const file_types = ['image/png', 'image/bmp', 'image/jpeg'];
    if ( !file || !file_types.includes(file['type']) ) {
      alertMessage("error", "Please upload an image with (png, bmp, jpeg) format!");
      return;
    }

    btn_extract.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
    btn_extract.disabled = true;

    const response = await window.axios.tesseract(file.path);
    document.querySelector("textarea[name='sentence-img']").innerHTML = response.text;
    
    btn_extract.innerHTML = 'Extract Text';
    btn_extract.disabled = false;
  };
}

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
  };
}

// Form Submit for English to Another Language
const form_openai = document.getElementById("form_openai");
if (form_openai) {
  form_openai.onsubmit = async function (e) {
    e.preventDefault();

    const btn_submit = document.querySelector("#form_openai button[type='submit']");
    const tools_type = document.querySelector("#form_openai [name='tools-type']").value;
    //const extraction_type = document.getElementById("pills-text-tab").classList.contains('active');
    const sentence = document.querySelector("#form_openai [name='sentence-text']").value;
      // ? document.querySelector("#form_openai [name='sentence-text']").value
      // : document.querySelector("#form_openai [name='sentence-img']").value;
    const selectedLanguage = document.querySelector("#Dropdown").innerText.trim();
    const refreshButton = document.querySelector("#refresh-btn");
    const resultTextarea = document.querySelector("#result-textarea");
    const sentenceTextarea = document.querySelector("#form_openai [name='sentence-text']");
    //console.log("this is in the index selectedLanguage after initialization: " + selectedLanguage);

      // Event listener for refresh button click
    refreshButton.onclick= async function() {
      sentenceTextarea.value = ""; // Clear the input textarea
      resultTextarea.value = ""; // Clear the result textarea
      selectedLanguage.innerText = "English" + " " + '<i class="fa fa-caret-down"></i>'; // Set the default language
      console.log("Text areas and selected language refreshed");
    };

    if (sentence.length == 0) {
      alertMessage("error", "The input is empty!");
      return;
    }
    if (sentence.length <= 8) {
      alertMessage("error", "Too short. Please input text at least 5!");
      return;
    }

    btn_submit.innerHTML = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...';
    btn_submit.disabled = true;

    const response = await window.axios.openAI(sentence, tools_type, selectedLanguage);
    const result = response.choices[0].text;
    document.querySelector("#div-result textarea").innerHTML = result.replace(/\n/g, "");
    console.log("this is in the index selectedLanguage after translation: " + selectedLanguage);

    const token = sessionStorage.getItem('token');
    const db_response = await window.axios.backendLaravelPost('post', '', {
      text: sentence,
      result: result,
      tools_type: tools_type
    }, token);
    console.log(db_response);

    btn_submit.innerHTML = 'Process Text';
    btn_submit.disabled = false;

    console.log("last part: " + selectedLanguage);

    const authToken = token;
    console.log(authToken);
    sessionStorage.setItem('token', authToken);
  };
}



//Factual Answering Button
const fa_btn = document.getElementById("btn-text");
if (fa_btn) {
  fa_btn.onclick = async function () {
    console.log(fa_btn.value);
  }
}

// Alert Message
function alertMessage(status, sentence){
  window.Toastify.showToast({
    text: sentence,
    duration: 3000,
    stopOnFocus: true,
    style: {
      textAlign: "center",
      background: status == "error" ? "#E76161":"#539165",
      color: "white",
      padding: "5px",
      marginTop: "2px"
    }
  });
}
