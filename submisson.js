document.getElementById("comingSoonForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents page reloading

    // Get selected radio button value
    let selectedOption = document.querySelector('input[name="option"]:checked');

    // Check if a selection was made
    if(selectedOption) {
        document.getElementById("result").hidden = false;

        // Adding option to data.json file
        fetch("https://api.vero-design.com:3000/submit", { // localhost --> domain
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ option: selectedOption.value })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("result").textContent = data.message;
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("result").textContent = "Submission failed!";
        });

        document.getElementById("result").textContent = "Thank you for submitting this form.";
        // alert("you selected " + selectedOption.value);
    } else {
        document.getElementById("result").hidden = false;
        document.getElementById("result").textContent = "Please select an option to submit the form.";
    }
});

document.getElementById("comingSoonForm").addEventListener("reset", function(event) {
    event.preventDefault(); // Prevents reloads

    document.getElementById("result").hidden = false;
    document.getElementById("result").textContent = "Form reset.";
});

// Function to put submissions onto a list

function fetchSubmissions() {
    fetch("http://https://vd-coming-soon-park.onrender.com/submissions")
    .then(response => response.json())
    .then(data => {
        let list = document.getElementById("submissionsList");
        list.innerHTML = "";
        data.forEach(entry => {
            let li = document.createElement("li");
            li.textContent = entry.option;
            list.appendChild(li);
        });
    });
}