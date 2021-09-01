
let form = document.getElementById('form');
form.addEventListener('submit', formSend);


async function formSend(e) {
   e.preventDefault();

   let error = formValidate();

   let formData = new FormData(form);

   if (error === 0) {
      form.classList.add('_sending');

      let response = await fetch('sendmail.php', {
         method: 'POST',
         body: formData
      });

      if (response.ok) {
         let result = await response.json();
         alert(result.message);
         form.reset();
         form.classList.remove('_sending');
      } else {
         alert('Error');
         form.classList.remove('_sending');
      }

   } else {
      alert('Fill in the required fields');
   }
}

function formValidate() {
   let error = 0;
   let formReq = document.querySelectorAll('._req');
   for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);


      if (input.classList.contains('_email')) {
         if (emailTest(input)) {
            formAddError(input);
            formRemoveSuccess(input);
            error++;
         }
      } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
         formAddError(input);
         error++;
      } else {
         if (input.value === '') {
            formAddError(input);
            formRemoveSuccess(input)
            error++;
         }
      }
   }
   return error;
}

function inputSuccess() {
   let inputs = form.querySelectorAll('._req');
   let er = 0;
   for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      input.addEventListener("input", function () {
         if (input.validity.valid) {
            if (input.classList.contains('_error')) {
               er = 1
               formRemoveError(input);
            }
            formAddSuccess(input);
         }
         if (input.value === '' || input.value == '[A-Za-z]') {
            formRemoveSuccess(input);
            if (er) {
               formAddError(input);
            }
         }
      }, false);
   }
}
inputSuccess();

function formAddError(input) {
   input.parentElement.classList.add('_error');
   input.classList.add('_error');
}

function formRemoveError(input) {
   input.parentElement.classList.remove('_error');
   input.classList.remove('_error');
}

function emailTest(input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

function formAddSuccess(input) {
   input.classList.add('_success');
}

function formRemoveSuccess(input) {
   input.classList.remove('_success');
}
