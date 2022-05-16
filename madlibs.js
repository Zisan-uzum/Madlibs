/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
const madLibsEdit = document.querySelector(".madLibsEdit");
const madLibsPreview = document.querySelector(".madLibsPreview");
// document.addEventListener("keyup", (e) => {
//   show();
// });
function edit(objList) {
  const elements = [];
  const text = document.createElement("p");
  objList.forEach((obj) => {
    if (obj.word !== "," && obj.pos !== null) {
      const mapPos = { n: "noun", v: "verb", a: "adjective" };
      const posString = obj.pos.join("").slice(1, -1);
      //console.log(mapPos[posString.match(/n|v|a/).join("")]);
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute(
        "placeholder",
        mapPos[posString.match(/n|v|a/).join("")]
      );
      text.appendChild(input);
      elements.push(input);
      //console.log(input);
      text.innerHTML += " ";
    } else {
      const span = document.createElement("span");
      span.innerText = obj.word + " ";
      text.appendChild(span);
      // console.log(span);
      elements.push(span);
    }
  });
  madLibsEdit.appendChild(text);
  return elements;
}

function show(list) {
  const text = document.createElement("p");
  text.textContent = "";
  console.log(list);
  for (let item of list) {
    if (item.tagName === "input") {
      console.log("input is ", item.value);
      text.textContent += item.value;
    } else {
      console.log("span is ", item.textContent);
      text.textContent += item.textContent;
    }
  }
  madLibsPreview.appendChild(text);
}
function parseStory(rawStory) {
  // Your code here.
  let parts = rawStory.split(" ");
  let parsed = [];
  parts.forEach((part) => {
    // look for first word then type then comma
    let word = part.match(/\w+/);
    let pos = part.match(/\[\w+\]/);
    let punc = part.match(/,|\./);
    let obj1 = { word, pos };
    parsed.push(obj1);
    if (punc) {
      parsed.push({ word: punc.join(""), pos: null });
    }
  });
  return parsed;
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => edit(processedStory))
  .then((list) => show(list));
