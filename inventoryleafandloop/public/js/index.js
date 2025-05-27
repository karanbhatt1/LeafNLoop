const btn = document.querySelector("#add")
const selectimagesbtn = document.querySelector("#select");
const dropdown = document.querySelector("#dropdown");
const input = document.querySelectorAll(".dat");
const list_items = document.querySelectorAll(".list_items");
const pop = document.querySelector("#pop");
// Function to select images from the dropdown
function selectimage() {
    selectimagesbtn.addEventListener("click", () => {
        console.log("selecting images");
        if (dropdown.style.display == "none" || dropdown.style.display == "") {
            dropdown.style.display = "flex";
            dropdown.style.flexDirection = "column";
            dropdown.style.gap = "2em";
            dropdown.style.position = "absolute";
            dropdown.style.top = "50px";
            dropdown.style.left = "10em";
            dropdown.style.zIndex = "1000";
            dropdown.style.backgroundColor = "#212121";
            dropdown.style.border = "1px solid #ccc";
            dropdown.style.padding = "10px";
            dropdown.style.borderRadius = "5px";
            dropdown.style.overflowY = "auto";
            dropdown.style.maxHeight = "300px";
            list_items.forEach((el) => {
                el.style.display = "flex";
                el.style.flexDirection = "column";
                el.style.gap = "0.5em";
                el.style.justifyContent = "center";
                el.style.alignItems = "center";
                el.style.width = "100%";
                el.style.height = "100%";
                el.style.cursor = "pointer";
            });
           

        } else {
            dropdown.style.display = "none";
        }

    });
}
// Function to hide the dropdown when the input field is focused
function hideonfocus(input,dropdown) {
    input.forEach((el) => {
        el.addEventListener("focus", () => {
            if (dropdown.style.display == "flex") {
                dropdown.style.display = "none";
            }
        })
    })
}
// Function to set the public ID and URL when an image is clicked
function setPUandPI(){
    list_items.forEach((el) => {
        el.addEventListener("click", (e) => {
            console.log("clicked on list item");
            const public_id = e.target.getAttribute("alt");
            const url = e.target.getAttribute("src");
            input[0].value= url;
            input[1].value = public_id;
            dropdown.style.display = "none";
        });
    });
}
selectimage();
hideonfocus(input, dropdown);
setPUandPI();

btn.addEventListener("click", (err) => {
    if (err) {
        fetch("/err").then(response => response.text())
            .then(data => console.log(data));
    }
    if (btn.textContent == "Add to inventory") {
        fetch("/added")
            .then(response => json.stringfy(response))
            .then(data => console.log(data))
    }
})
const btn2 = document.querySelector("#rmv")

btn2.addEventListener("click", () => {
    if (btn2.textContent == "Remove From Inventory") {
        fetch("/removed")
            .then(response => response.text("removed"))
    }
})

// function showPopup() {

//   pop.classList.remove("hidden");
//   pop.classList.add("show");

//   setTimeout(() => {
//     pop.classList.remove("show");
//     pop.classList.add("hidden");
//   }, 2000); // hide after 3s
// }

//showPopup();
// Show the popup when the page loads
