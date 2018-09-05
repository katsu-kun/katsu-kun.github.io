// Binds the enter key to the response form for submissions
$('#response').on("submit", function(event){
    event.preventDefault();
    var response = ('#response').value;
    $('p').innerText = value;
});

