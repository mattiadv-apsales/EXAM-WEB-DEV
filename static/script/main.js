let container_navbar = document.getElementById('container_navbar');

let name = document.getElementById('name');
let surname = document.getElementById('surname');
let email = document.getElementById('email');
let message = document.getElementById('message');
let send_form = document.getElementById('send_form');
let output = document.getElementById('output');

let ig = document.getElementById('ig');
let tt = document.getElementById('tt');
let yt = document.getElementById('yt');
let gh = document.getElementById('gh');

let phone = document.getElementById('phone');
let active_menu = document.getElementById('active_menu');
let container_navbar_phone = document.getElementById('container_navbar_phone');

x = -1

active_menu.addEventListener('click', function() {
    x = x * -1;

    if (x == 1) {
        container_navbar_phone.style.display = "flex";
    } else {
        container_navbar_phone.style.display = "none";
    }
})

let lists = container_navbar_phone.querySelectorAll('li');

for (let li of lists) {
    li.addEventListener('click', function() {
        container_navbar_phone.style.display = "none";
        x = -1;
    })
}

ig.addEventListener('click', function() {
    window.open("https://www.instagram.com/mattia_de_vincentis.webdev/", "_blank")
})

tt.addEventListener('click', function() {
    window.open("https://www.tiktok.com/@mattiadv.blog", "_blank")
})

yt.addEventListener('click', function() {
    window.open("https://www.youtube.com/@mattiadevincentisblog", "_blank")
})

gh.addEventListener('click', function() {
    window.open("https://github.com/mattiadv-apsales", "_blank")
})

function clear_output() {
    output.innerHTML = ""
    output.classList.remove("positive");
    output.classList.remove("negative");
}

document.addEventListener('scroll', function(e) {
    let y = window.scrollY

    if (y > 100) {
        container_navbar.classList.add("active")
    } else {
        container_navbar.classList.remove("active")
    }
})

function send_form_server() {
    let n_value = name.value;
    let s_value = surname.value;
    let e_value = email.value;
    let m_value = message.value;

    if (n_value != "" && s_value != "" && e_value != "" && e_value.includes("@") && e_value.includes(".") && m_value != "") {
        fetch("/send_form", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({"name": n_value, "surname": s_value, "email": e_value, "message": m_value})
        })
        .then(response => response.json())
        .then(data => {
            if (data.success == true) {
                output.classList.add("positive");
                output.innerHTML = "Messaggio inviato con successo!";
            } else {
                output.classList.add("negative");
                output.innerHTML = "Messaggio non inviato, errore del server";
            }

            name.value = ""
            surname.value = ""
            email.value = ""
            message.value = ""

            setTimeout(clear_output, 2500)
        })
    } else {
        output.classList.add("negative");
        output.innerHTML = "Compilare tutti i campi correttamente";
        setTimeout(clear_output, 3000)
    }
}

send_form.addEventListener('click', function(e) {
    e.preventDefault();
    send_form_server();
})