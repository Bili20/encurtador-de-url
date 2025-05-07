const form = document.getElementById("urlForm") as HTMLFormElement;
const longUrlInput = document.getElementById("longUrl") as HTMLInputElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;
const shortUrlSpan = document.getElementById("shortUrl") as HTMLSpanElement;
const redirectButton = document.getElementById(
  "redirectButton"
) as HTMLButtonElement;
const copyButton = document.getElementById("copyButton") as HTMLButtonElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const longUrl = longUrlInput.value;

  try {
    const response = await fetch("/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ original_url: longUrl }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Erro desconhecido");

    resultDiv.classList.remove("hidden");
    shortUrlSpan.textContent = data;

    longUrlInput.value = "";
  } catch (e: any) {
    resultDiv.innerHTML = `<p class="error">${e.message}</p>`;
  }
});

redirectButton.addEventListener("click", async () => {
  try {
    window.open(
      shortUrlSpan.textContent || "",
      "_blank",
      "noopener,noreferrer"
    );
  } catch (e: any) {
    resultDiv.innerHTML = `<p class="error">${e.message}</p>`;
  }
});

copyButton.addEventListener("click", () => {
  navigator.clipboard
    .writeText(shortUrlSpan.textContent || "")
    .then(() => alert("URL copiada!"))
    .catch(() => alert("Erro ao copiar"));
});
