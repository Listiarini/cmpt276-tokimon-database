window.onload = function() {
    var weight = document.getElementById("weight");
    var height = document.getElementById("height");
    var fly = document.getElementById("fly");
    var fight = document.getElementById("fight");
    var fire = document.getElementById("fire");
    var water = document.getElementById("water");
    var electric = document.getElementById("electric");
    var ice = document.getElementById("ice");
    var total = document.getElementById("total");

    function updateTotal() {
        var t = parseInt(fly.value,10) + parseInt(fight.value,10) + parseInt(fire.value,10) + parseInt(water.value ,10)
        + parseInt(electric.value,10) + parseInt(ice.value,10);
        total.innerHTML = t;
    }

    fly.addEventListener("input", function() { updateTotal(); } );
    fight.addEventListener("input", function() { updateTotal(); } );
    fire.addEventListener("input", function() { updateTotal(); } );
    water.addEventListener("input", function() { updateTotal(); } );
    electric.addEventListener("input", function() { updateTotal(); } );
    ice.addEventListener("input", function() { updateTotal(); } );
    total.addEventListener("input", function() { updateTotal(); } );
    
}