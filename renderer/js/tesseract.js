// Main Window - Tesseract Tool#3 Btn
const btn_tesseract = document.getElementById('btn_tesseract');
if (btn_tesseract) {
    btn_tesseract.onclick = async function () {
    const div_login = document.getElementById("div_login");
    const div_prompts = document.getElementById("div_prompts_fa");
    const div_tools = document.getElementById("div_tools");
    const div_tool_no1 = document.getElementById("div_tool_no1");
    const div_tools_no2 = document.getElementById("div_tools_no2");
    const div_fa = document.getElementById("div_fa");
    const div_engla = document.getElementById("div_engla");
    const div_tesseract = document.getElementById("div_tesseract");
    div_tool_no1.classList.add('d-none');
    div_tools_no2.classList.add('d-none');
    div_engla.classList.add('d-none');
    div_login.classList.add('d-none');
    div_tools.classList.add('d-none');
    div_fa.classList.add('d-none');
    div_prompts.classList.add('d-none');
    div_tesseract.classList.remove('d-none');
    div_tesseract.classList.add('d-flex');
    }
}

// document.addEventListener("DOMContentLoaded", () => {
//     const formFileInput = document.getElementById("formFile");
//     const clearBtn = document.getElementById("clearBtn");
//     const frame = document.getElementById("frame");

//     formFileInput.addEventListener("change", preview);
//     clearBtn.addEventListener("click", clearImage);

//     function preview() {
//         frame.src = URL.createObjectURL(event.target.files[0]);
//     }

//     function clearImage() {
//         formFileInput.value = null;
//         frame.src = "";
//     }
// });


// Extract Text from Image
const btn_extract_tess = document.getElementById("btn_extract_tess");
if (btn_extract_tess) {
    btn_extract_tess.onclick = async function () {
    const file = document.getElementById("file_extract_tess").files[0];

    const file_types = ['image/png', 'image/bmp', 'image/jpeg'];
    if ( !file || !file_types.includes(file['type']) ) {
      alertMessage("error", "Please upload an image with (png, bmp, jpeg) format!");
      return;
    }

    btn_extract_tess.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
    btn_extract_tess.disabled = true;

    const response = await window.axios.tesseract(file.path);
    document.querySelector("textarea[name='sentence-img_tess']").innerHTML = response.text;
    
    btn_extract_tess.innerHTML = 'Extract Text';
    btn_extract_tess.disabled = false;
  };
}

//Preview Btn
// const previewButton = document.getElementById("previewButton");
// if (previewButton) {
//   previewButton.addEventListener("click", function() {
//     const fileInput = document.getElementById("file_extract_tess");
//     const previewImage = document.querySelector("#div_tesseract .card-body img");

//     const file = fileInput.files[0];

//     // Check if a file is selected
//     if (file) {
//       const reader = new FileReader();

//       // Read the image file and display the preview
//       reader.onload = function(e) {
//         if (previewImage) {
//           previewImage.src = e.target.result;
//         }
//       };

//       reader.readAsDataURL(file); // Read the file as a data URL
//     }
//   });
// }


//WORKING PREVIEW
// const previewButton = document.getElementById("previewButton");
// const clearButton = document.getElementById("clearButton");
// const fileInput = document.getElementById("file_extract_tess");
// const previewImage = document.getElementById("previewImage");

// previewButton.onclick = function () {
//   const file = fileInput.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       previewImage.src = e.target.result;
//     };
//     reader.readAsDataURL(file);
//   }
// };

// clearButton.onclick = function () {
//   previewImage.src = "";
//   fileInput.value = "";
// };

const btn_preview = document.getElementById("previewButton");
const fileInput = document.getElementById("file_extract_tess");
const previewImage = document.getElementById("previewImage");
const hideImageButton = document.getElementById("hideImageButton");
const sentenceTextarea = document.querySelector("textarea[name='sentence-img_tess']");

if (btn_preview) {
  btn_preview.onclick = async function () {
    const file = fileInput.files[0];

    const file_types = ['image/png', 'image/bmp', 'image/jpeg'];
    if (!file || !file_types.includes(file.type)) {
      alertMessage("error", "Please upload an image with (png, bmp, jpeg) format!");
      return;
    }

    btn_preview.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
    btn_preview.disabled = true;

    // Image preview
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.classList.remove("d-none");
    };
    reader.readAsDataURL(file);

    btn_preview.innerHTML = 'Preview';
    btn_preview.disabled = false;
  };
}

// Hide Image
if (hideImageButton) {
  hideImageButton.onclick = async function () {
    if (!previewImage.src) {
      alertMessage("error", "No image to hide!");
      return;
    }
    previewImage.src = "";
    previewImage.classList.add("d-none");
  };
}


// First Btn Back in Factual Answering
const btn_back_tesseract = document.getElementById('btn_back_tesseract');
if (btn_back_tesseract) {
    btn_back_tesseract.onclick = async function () {
        const div_login = document.getElementById("div_login");
        const div_prompts = document.getElementById("div_prompts");
        const div_tools = document.getElementById("div_tools");
        const div_tesseract = document.getElementById("div_tesseract");
        div_login.classList.add('d-none');
        div_prompts.classList.add('d-none');
        div_tesseract.classList.add('d-none');
        div_tools.classList.remove('d-none');
        div_tools.classList.add('d-flex');
    }
}

