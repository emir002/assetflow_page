const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "⚡️ Šaljem…";
  const res = await fetch("/api/email", {
    method: "POST",
    body: new FormData(form),
  });
  status.textContent = res.ok ? "✅ Poruka poslana!" : "❌ Došlo je do greške.";
  if (res.ok) form.reset();
});
