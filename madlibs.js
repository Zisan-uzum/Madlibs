const listOfWords = [];
const madLibsEdit = document.querySelector(".madLibsEdit");
const madLibsPreview = document.querySelector(".madLibsPreview");
const previewText = document.createElement("p");

function edit() {
  const editText = document.createElement("p");
  const mapPos = { n: "noun", v: "verb", a: "adjective" };
  let inputCount = 0;
  listOfWords.forEach((obj) => {
    if (obj.pos !== null) {
      const posString = obj.pos.join("").slice(1, -1);
      editText.innerHTML +=
        `<input id="${"input" + inputCount}" maxlength = {20} placeholder ="${
          mapPos[posString.match(/n|v|a/).join("")]
        }"> </input>` + " ";
      inputCount++;
    } else {
      editText.innerHTML += `<span>${obj.word}</span>` + " ";
    }
  });
  madLibsEdit.appendChild(editText);
}
function preview() {
  const inputs = document.getElementsByTagName("input");
  for (let input of inputs) {
    input.addEventListener("input", () => {
      previewText.innerHTML = "";
      const editElements =
        document.querySelector(".madLibsEdit").children[0].children;
      for (let item of editElements) {
        if (item.tagName === "INPUT") {
          if (item.value !== "") {
            previewText.innerHTML += `<span>${item.value}</span>` + " ";
          } else {
            previewText.innerHTML += "<span>________</span>" + " ";
          }
        } else if (item.tagName == "SPAN") {
          previewText.innerHTML += `<span>${item.textContent}</span>` + " ";
        }
      }
      madLibsPreview.appendChild(previewText);
    });
  }
}
function hotKey() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        index <= inputs.length - 2
          ? inputs[index + 1].focus()
          : inputs[0].focus();
      }
    });
  });
}
function parseStory(rawStory) {
  let parts = rawStory.split(" ");
  parts.forEach((part) => {
    let word = part.match(/\w+/);
    let pos = part.match(/\[\w+\]/);
    let punc = part.match(/,|\./);
    let obj1 = { word, pos };
    listOfWords.push(obj1);
    if (punc) {
      listOfWords.push({ word: punc.join(""), pos: null });
    }
  });
  return listOfWords;
}
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    edit(processedStory);
    hotKey();
    preview();
  });
