document.addEventListener("DOMContentLoaded", () => {
    console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

    const monstersURL = "http://localhost:3000/monsters/?_limit=50&_page=";

    // set page number at 1 and will be incremented at next page button
    let pageNum = 1;

    // create monster form
    const form = document.createElement("form");
    const nameInput = document.createElement("input");
    const ageInput = document.createElement("input");
    const descriptionInput = document.createElement("input");
    const createButton = document.createElement("button");
    nameInput.placeholder = "name...";
    ageInput.placeholder = "age...";
    descriptionInput.placeholder = "description...";
    createButton.textContent = "Create";
    createButton.id = "create_button";
    form.appendChild(nameInput);
    form.appendChild(ageInput);
    form.appendChild(descriptionInput);
    form.appendChild(createButton);
    document.getElementById("create-monster").appendChild(form);

    // event listener for submit button on create monster form
    document
        .getElementById("create-monster")
        .addEventListener("submit", event => {
            event.preventDefault();
            formData = {
                name: event.target[0].value,
                age: event.target[1].value,
                description: event.target[2].value
            };
            addMonster(formData);
            form.reset()
            console.log(formData);
        });

    // fetch post to create new monster
    function addMonster(formData) {
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: formData.name,
                age: formData.age,
                description: formData.description
            })
        });
    }

    // render monsters
    function renderMonsters(json) {
        document.getElementById("monster-container").innerHTML = ""; // clear div of monsters
        json.forEach(function(monster) {
            console.log(monster);
            const monsterDiv = document.createElement("div");

            const monsterName = document.createElement("h2");
            monsterName.textContent = monster.name;
            monsterDiv.appendChild(monsterName);

            const monsterAge = document.createElement("h4");
            monsterAge.textContent = `Age: ${monster.age} Years`;
            monsterDiv.appendChild(monsterAge);

            const monsterDescription = document.createElement("p");
            monsterDescription.textContent = monster.description;
            monsterDiv.appendChild(monsterDescription);

            document
                .getElementById("monster-container")
                .appendChild(monsterDiv);
        });
    }

    // fetch monsters
    function getMonsters(pageNum) {
        fetch(monstersURL + pageNum)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                renderMonsters(json);
                console.log(json);
            });
    }

    // next page button
    document.getElementById("forward").addEventListener("click", function() {
        getMonsters((pageNum += 1));
        console.log("next page");
    });

    // previous page button
    document.getElementById("back").addEventListener("click", function() {
        getMonsters((pageNum -= 1));
        console.log("previous page");
    });

    getMonsters(pageNum);
});
