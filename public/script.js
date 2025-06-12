const params = new URLSearchParams(window.location.search);
const cls = params.get("class");
const type = params.get("type");
const board = params.get("board");

if (!cls || !type || !board) {
  document.getElementById("info").innerHTML = "<p>Error: Selection missing!</p>";
} else {
  document.getElementById("info").innerHTML =
    `<p><strong>Board:</strong><i class="p2">${board}</i></p>
     <p><strong>Class:</strong><i class="p2">${cls}</i></p>
     <p><strong>Question type:</strong><i class="p2">${type}</i></p>`;
}

function makePromptFromURL(topic) {
  let prompt = `Give me ${type} for Class ${cls} on the topic "${topic}"`;

  if (board === "Punjab Board") {
    prompt += " according to the Punjab Board syllabus of Pakistan.";
  } else if (board === "Federal Board") {
    prompt += " based on the Federal Board (FBISE), Pakistan syllabus.";
  } else if (board === "Cambridge") {
    prompt += " following the Cambridge O Level syllabus.";
  } else if (board === "CBSE") {
    prompt += " according to the CBSE syllabus of India.";
  } else {
    prompt += ".";
  }

  return prompt;
}

async function searchAI() {
  const topic = document.getElementById("topicInput").value;
  const prompt = makePromptFromURL(topic);

  const response = await fetch("http://localhost:3000/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  document.getElementById("result").innerText = data.result || "No response from AI.";
}