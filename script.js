var h1 = document.createElement("H3");
h1.className = "text-center";
h1.setAttribute("id", "title");
h1.setAttribute("style", "margin-bottom:1em");
h1.innerHTML = "Search a Book using Keywords like Author, Title, ISBN...";
document.body.appendChild(h1);

var searchDiv = document.createElement("div");
searchDiv.className = "container mt-3";

var searchRow = document.createElement("div");
searchRow.className = "row justify-content-center";

var searchBarCol = document.createElement("div");
searchBarCol.className = "col-lg-6";

var searchBar = document.createElement("input");
searchBar.setAttribute("type", "text");
searchBar.setAttribute("placeholder", "Enter an Author or Title...");
searchBar.setAttribute("id", "searchInput");

var searchButton = document.createElement("button");
searchButton.className = "btn btn-primary ml-2";
searchButton.innerHTML = "Search";
searchButton.addEventListener("click", searchBooks);

searchBarCol.appendChild(searchBar);
searchBarCol.appendChild(searchButton);
searchRow.appendChild(searchBarCol);
searchDiv.appendChild(searchRow);
document.body.appendChild(searchDiv);

function searchBooks() {
	var searchInput = document.getElementById("searchInput").value;
	if (searchInput.trim() === "") {
		alert("Please enter a query to search.");
		return;
	}
	fetch(`https://api.crossref.org/works?query=${searchInput}&rows=30&offset=30`)
	      .then((data) => data.json())
	      .then((data) => {
	    // Clear previous search results
		var previousResults = document.getElementById("searchResults");
		if (previousResults) {
			previousResults.remove();
		}
	    // Display new search results
		bar(data);
	});
}

function bar(text) {
	console.log(text);
	var resultsDiv = document.createElement("div");
	resultsDiv.id = "searchResults"; // Add id to identify the search results container
	resultsDiv.className = "container mt-3";

	var resultsRow = document.createElement("div");
	resultsRow.className = "row";

	for (var i = 0; i < text.message.items.length; i++) {
		var col = document.createElement("div");
		col.className = "col-lg-4 col-sm-12";

		col.innerHTML += `
				 <div class="card">
					    <h5 class="card-header">${text.message.items[i].title}</h5>
			<div class="card-body">
				   <h5 class="card-title">Type: <span style="color:red">${text.message.items[i].type}</span></h5>
					     <p class="card-text">DOI: <span style="color:red">${text.message.items[i].DOI}</span></p>
			<p class="card-text">URL: <a href="${text.message.items[i].URL}">${text.message.items[i].URL}</a></p>
			<p class="card-text">Volume: <span style="color:red">${text.message.items[i].volume  && text.message.items[i].volume.length > 0
				 ? text.message.items[i].volume
				 : "1"}</span></p>
				 <p class="card-text">Publisher: <span style="color:red">${text.message.items[i].publisher}</span></p>
					  </div>
					  </div>`;

		resultsRow.appendChild(col);
	}

	resultsDiv.appendChild(resultsRow); // Append the row to the resultsDiv
	document.body.appendChild(resultsDiv); // Append the resultsDiv to the document body
}
