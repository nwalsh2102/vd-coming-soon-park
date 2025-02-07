document.addEventListener("DOMContentLoaded", function () {
    fetch("http://https://vd-coming-soon-park.onrender.com:3000/submissions")
    .then(response => response.json())
    .then(data => {
        let tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = ""; // Clear existing data
        
        data.forEach((entry, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${index + 1}</td><td>${entry.option}</td>`;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error("Error loading data:", error));
});

// https://api.vero-design.com/