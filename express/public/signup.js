// public/signup.js
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(signupForm);

  try {
    const response = await fetch("/signup", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    alert(data.message);
    signupForm.reset();
  } catch (error) {
    alert("Error signing up.");
    console.error(error);
  }
});
