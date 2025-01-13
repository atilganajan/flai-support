async function getAnswer(text) {
  const response = await fetch('http://localhost:3000/ask', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: text })
  });

  const data = await response.json();
  return data.answer;
}

async function processQuery(text) {
        const button = document.getElementById("ai-process-button");
        const originalText = button.innerText;
        button.innerText = "Processing...";
        button.disabled = true;

        const answer = await getAnswer(text);

        const replyBox = document.querySelector('.msg-reply-box');
        if (replyBox) {
            const paragraph = document.createElement('p');
            paragraph.textContent = answer;
            replyBox.appendChild(paragraph);
            replyBox.setAttribute('data-placeholder', '');
        }

        button.remove();
        
        return answer;

}

let isSelected= false;
let text= "";

document.addEventListener("mouseup", () => {
    const selection = window.getSelection();
    text = selection.toString().trim();

    console.log("isSelected:", isSelected);

    if (text && !isSelected && text!="") {
        isSelected=true;

        let existingButton = document.getElementById("ai-process-button");
        if (existingButton) existingButton.remove();

        const rect = selection.getRangeAt(0).getBoundingClientRect();
        
        const button = document.createElement("button");
        button.id = "ai-process-button";
        button.innerHTML = `FLAI`;

        
        button.style.position = "absolute";
        button.style.top = `${rect.bottom + window.scrollY}px`;
        button.style.left = `${rect.right + window.scrollX + 5}px`;
        button.style.zIndex = "10000";
        button.style.padding = "8px";
        button.style.border = "none";
        button.style.color = "#ffffff";
        button.style.backgroundColor = "#007bff";
        button.style.borderRadius = "50%";
        button.style.cursor = "pointer";
        button.style.display = "flex";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";

        button.onmouseover = () => {
            button.style.backgroundColor = "#0056b3";
        };
        button.onmouseout = () => {
            button.style.backgroundColor = "#007bff";
        };


        document.body.appendChild(button);
    }
});


document.addEventListener("click", async function(event) {
  if (event.target.closest("#ai-process-button") || event.target.closest("#ai-process-svg")) {
    await processQuery(text);
    isSelected=false;
}
});

document.addEventListener("mousedown", (e) => {
    const button = document.getElementById("ai-process-button");
    if (button && !button.contains(e.target)) {
        button.remove();
        isSelected=false;
    }
   
});