const form = document.getElementById("form_sentence");
if (form) {
  form.onsubmit = async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    // console.log(await window.axios.openAI());
    // formData.get("username");
    const response = await window.axios.openAI(formData.get("sentence"));
    // alert(response); //for testing sa dotenv
    document.getElementById("sentence_corrected").innerHTML = JSON.stringify(response.choices[0].text).replace(/\\n/g, '');
  };
}