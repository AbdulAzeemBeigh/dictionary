const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetics[1].text}/</p>
                </div>
                <p class="word-meaning"><h3>Meaning</h3>
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example"><h3>Example</h3>
                    ${data[0].meanings[0].definitions[0].example || "No Example"}
                </p>
                
                <p class="word-synonyms"><h3>Synonyms</h3>
                    ${data[0].meanings[0].synonyms[0] || "No Synonym"}
                </p>`;
                
                
            sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            alert("Couldn't Find The Word\n\ \n\Please Enter New Word ");
            document.getElementById("inp-word").value="";
        });
});
function playSound() {
    sound.play();
}