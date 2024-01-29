$(document).ready(function () {
  $("#myform").bootstrapValidator({
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh",
    },
    fields: {
      first_name: {
        validators: {
          stringLength: {
            min: 2,
            max: 10,
            message: "please Enter at least 2 chars and not more than 10",
          },
          notEmpty: {
            message: "Please Enter your Name",
          },
        },
      },
      last_name: {
        validators: {
          stringLength: {
            min: 2,
            max: 10,
            message: "please Enter at least 2 chars and not more than 10",
          },
          notEmpty: {
            message: "Please Enter your LastName",
          },
        },
      },
      username: {
        validators: {
          stringLength: {
            min: 2,
          },
          notEmpty: {
            message: "Please Enter your UserName",
          },
        },
      },
      email: {
        validators: {
          notEmpty: {
            message: "Please Enter your Email Id",
          },
          emailAddress: {
            message: "please Enter valid Email id",
          },
        },
      },
      phone: {
        validators: {
          notEmpty: {
            min: 10,
            message: "please Enter your phone number",
          },
          phone: {
            country: "INDIA",
            message: "please Enter a valid phone number",
          },
        },
      },
      comment: {
        validators: {
          stringLength: {
            min: 10,
            max: 200,
            message: "please Enter at least 10 chars and not more than 200",
          },
          notEmpty: {
            message: "please enter comment",
          },
        },
      },
    },
  });
});

function registerUser(data){
  console.log(data);
  let body = data
}