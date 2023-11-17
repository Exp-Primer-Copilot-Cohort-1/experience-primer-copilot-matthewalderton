function skillsMember() {
    var skills = [
        "HTML",
        "CSS",
        "JavaScript",
        "PHP",
        "MySQL",
        "Python"
    ];
    var skillsContainer = document.getElementById("skills");
    var skillsList = "";
    for (var i = 0; i < skills.length; i++) {
        skillsList += "<li>" + skills[i] + "</li>";
    }
    skillsContainer.innerHTML = skillsList;
}