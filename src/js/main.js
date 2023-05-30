const encryptionMap = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
};

const decryptionMap = {
    "enter": "e",
    "imes": "i",
    "ai": "a",
    "ober": "o",
    "ufat": "u"
};

function encryptText(text) {
    let encryptedText = "";

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const encryptedChar = encryptionMap[char] || char;
        encryptedText += encryptedChar;
    }

    return encryptedText;
}

function decryptText(text) {
    let decryptedText = "";

    let i = 0;
    while (i < text.length) {
        const char = text[i];

        if (char === " ") {
            decryptedText += char;
            i++;
        } else {
            let decryptedChar = "";
            let found = false;
            for (let len = 5; len >= 1; len--) {
                const substring = text.substr(i, len);
                if (decryptionMap.hasOwnProperty(substring)) {
                    decryptedChar = decryptionMap[substring];
                    i += len;
                    found = true;
                    break;
                }
            }

            if (!found) {
                decryptedChar = char;
                i++;
            }

            decryptedText += decryptedChar;
        }
    }

    return decryptedText;
}

function copyToClipboard() {
    const resultTextarea = document.getElementById("result");
    resultTextarea.select();
    document.execCommand("copy");
    alert("Texto copiado al portapapeles");
}

function convertText(event) {
    const textArea = document.getElementById("text");
    const resultContainer = document.getElementById("resultContainer");
    const image = document.getElementById("image");
    const copyButton = document.getElementById("copyButton");
    const option = event.target.value;
  
    let result = "";
  
    if (option === "encrypt") {
      result = encryptText(textArea.value.trim());
    } else if (option === "decrypt") {
      result = decryptText(textArea.value.trim());
    }
  
    if (textArea.value.trim() === "") {
      resultContainer.style.display = "none";
      image.style.display = "block";
      copyButton.classList.add("d-none"); // Ocultar el botón "Copiar"
    } else {
      resultContainer.style.display = "block";
      image.style.display = "none";
      copyButton.classList.remove("d-none"); // Mostrar el botón "Copiar"
    }
  
    resultContainer.innerText = result;
  }
  

const encryptButton = document.getElementById("encryptButton");
encryptButton.addEventListener("click", convertText);

const decryptButton = document.getElementById("decryptButton");
decryptButton.addEventListener("click", convertText);

const copyButton = document.getElementById("copyButton");
copyButton.addEventListener("click", copyToClipboard);