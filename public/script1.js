// ✅ Firebase Configuration (update with yours if needed)
const firebaseConfig = {
  apiKey: "AIzaSyAT9KCbgjxC_Qz3OFA5GNONAE4hZlc3pnA",
  authDomain: "eduskill-vault.firebaseapp.com",
  projectId: "eduskill-vault",
  appId: "1:186902568540:web:928797fbdb1e8b1eced099"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ✅ Google Login
document.getElementById("loginBtn").addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      document.getElementById("dashboard").style.display = "block";
      document.getElementById("loginBtn").style.display = "none";
    })
    .catch(err => alert("Login failed: " + err.message));
});

// ✅ Contact Form Submission (Updated and Cleaned)
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
      const res = await fetch("https://your-project.cloudfunctions.net/sendContactEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });
    

    const data = await res.json();
    alert(data.message || "Message sent!");
    document.getElementById("contactForm").reset();
  } catch (err) {
    console.error("Send error:", err);
    alert("Failed to send message");
  }
});
