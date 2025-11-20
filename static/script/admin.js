let update_visual = document.getElementById('update_visual');
let visual_p = document.getElementById('visual_p');

update_visual.addEventListener('click', function() {
    let visual_page = 0;

    fetch("/update_visual", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
    })
    .then(response => response.json())
    .then(data => {
        visual_p.innerHTML = "Visual page: " + data.visual
    })
})