/* ===================================================================
 * Start menu JS
 *
 * ------------------------------------------------------------------- */

(function (html) {
  "use strict";
  html.className = html.className.replace(/\bno-js\b/g, "") + " js ";

  //htmml document variables object
  var dom_obj = {
    about: document.getElementById("menu-about"),
    about_section: document.getElementById("about"),
    about_link: document.getElementById("about-link"),
    work: document.getElementById("menu-work"),
    contact: document.getElementById("menu-contact"),
    text: document.getElementById("cmd"),
  };

  /* Text change animation and functionality
   * -------------------------------------------------- */

  //About section start
  function change_text_about_on() {
    //Change element inner text
    dom_obj.about.innerHTML = "About";
    //Change color
    dom_obj.about.style.color = "#df9fdf";
    //Add new class
    dom_obj.about.classList.add("mune_btn");
  }

  function change_text_about_off() {
    dom_obj.about.innerHTML = "I am Fiorella,";
    dom_obj.about.style.color = "white";
    dom_obj.about.classList.remove("mune_btn");
  }

  //Mouser over event listener
  dom_obj.about.onmouseover = function () {
    change_text_about_on();
  };
  //Mouse out eventlistener
  dom_obj.about.onmouseout = function () {
    change_text_about_off();
  };
  //About section end

  //Work section start
  function change_text_work_on() {
    dom_obj.work.innerHTML = "Work";
    dom_obj.work.style.color = "#df9fdf";
    dom_obj.work.classList.add("mune_btn");
  }

  function change_text_work_off() {
    dom_obj.work.innerHTML = "a Frontend Engineer";
    dom_obj.work.style.color = "white";
    dom_obj.work.classList.remove("mune_btn");
  }

  //Mouser over event listener
  dom_obj.work.onmouseover = function () {
    change_text_work_on();
  };
  //Mouse out eventlistener
  dom_obj.work.onmouseout = function () {
    change_text_work_off();
  };
  //Work section end

  //Contact section start
  function change_text_contact_on() {
    dom_obj.contact.innerHTML = "Contact\n\n";
    dom_obj.contact.style.color = "#df9fdf";
    dom_obj.contact.classList.add("mune_btn");
  }

  function change_text_contact_off() {
    dom_obj.contact.innerHTML = "based in Costa Rica.";
    dom_obj.contact.style.color = "white";
    dom_obj.contact.classList.remove("mune_btn");
  }

  //Mouser over event listener
  dom_obj.contact.onmouseover = function () {
    change_text_contact_on();
  };
  //Mouse out eventlistener
  dom_obj.contact.onmouseout = function () {
    change_text_contact_off();
  };

  //Contact section end

  /* Typying header functionality
   * -------------------------------------------------- */
  //Text to change
  var _CONTENT = [
    "print('Hello world!')",
    "console.log('you have found your candidate')",
    "alert('Lets talk ;)')",
  ];

  //Current sentence being processed
  var _PART = 0;

  //Character number of the current sentence being processed
  var _PART_INDEX = 0;

  //Holds the handle returned from setInterval
  var _INTERVAL_VAL;

  //Element that holds the text
  var _ELEMENT = document.querySelector("#text");

  //Cursor element
  var _CURSOR = document.querySelector("#cursor");

  //Implements typing effect
  function Type() {
    // Get substring with 1 characater added
    var text = _CONTENT[_PART].substring(0, _PART_INDEX + 1);
    _ELEMENT.innerHTML = text;
    _PART_INDEX++;

    //If full sentence has been displayed then start to delete the sentence after some time
    if (text === _CONTENT[_PART]) {
      //Hide the cursor
      _CURSOR.style.display = "none";

      clearInterval(_INTERVAL_VAL);
      setTimeout(function () {
        _INTERVAL_VAL = setInterval(Delete, 50);
      }, 1000);
    }
  }

  //Implements deleting effect
  function Delete() {
    //Get substring with 1 characater deleted
    var text = _CONTENT[_PART].substring(0, _PART_INDEX - 1);
    _ELEMENT.innerHTML = text;
    _PART_INDEX--;

    //If sentence has been deleted then start to display the next sentence
    if (text === "") {
      clearInterval(_INTERVAL_VAL);

      //If current sentence was last then display the first one, else move to the next
      if (_PART == _CONTENT.length - 1) _PART = 0;
      else _PART++;

      _PART_INDEX = 0;

      //Start to display the next sentence after some time
      setTimeout(function () {
        _CURSOR.style.display = "inline-block";
        _INTERVAL_VAL = setInterval(Type, 100);
      }, 200);
    }
  }

  //Start the typing effect on load
  _INTERVAL_VAL = setInterval(Type, 100);
})(document.documentElement);
