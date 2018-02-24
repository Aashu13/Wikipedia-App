$(document).ready(function() {
  var Input = document.getElementById("searchInput");
  var spanText = document.getElementById("text");
  $("#searchIcon").on("click", function() {
    $(Input).toggle();
    $(spanText).toggle();
  });

  $(Input)
    .on("focus", function() {
      $(this).css("border-top-color", "#151413");
      $(this)
        .parent()
        .addClass("focus");
    })
    .blur(function() {
      if ($(this).val() === "") {
        $(this)
          .parent()
          .removeClass("focus");
        $(this).css("border-top-color", "#ddd");
      }
    });

  $("form").on("submit", function(event) {
    $("#search_wrapper")
      .parent()
      .addClass("moveup");
    var searchIcon = document.getElementById("searchIcon");
    var inputvalue = document.getElementById("searchInput").value;

    event.preventDefault();
    var wikipedia_api =
      "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" +
      inputvalue +
      "?&callback=?";
    var wrapper_2 = document.getElementById("wrapper_2");
    wrapper_2.innerHTML = "";

    $.getJSON(wikipedia_api, function(data) {
      var keysCode = data.query.pages;
      var keysOfpages = Object.keys(keysCode);

      for (var i = 0; i < keysOfpages.length; i++) {
        var pageId = data.query.pages[keysOfpages[i]].pageid;
        var title = data.query.pages[keysOfpages[i]].title;
        var paragraph = data.query.pages[keysOfpages[i]].extract;

        var section = document.createElement("div");

        var heading = document.createElement("h3");
        heading.textContent = title;

        var para = document.createElement("p");
        para.textContent = paragraph;

        var aTag = document.createElement("a");
        aTag.href = "http://en.wikipedia.org/?curid=" + pageId;
        aTag.setAttribute("target", "_blank");

        aTag.appendChild(heading);
        section.appendChild(aTag);
        section.appendChild(para);
        wrapper_2.appendChild(section);
      }
    });
  });
});
