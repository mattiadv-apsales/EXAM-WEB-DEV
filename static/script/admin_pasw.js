let password = document.getElementById('password');
let send_password = document.getElementById('send_password');
let output = document.getElementById('output');

function reset_output() {
    output.innerHTML = "";
    output.classList.remove("positive")
    output.classList.remove("negative")
}

function send_password_verify() {
    let p_value = password.value;

    fetch("/pasw", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({"password": p_value})
    })
    .then(response => response.json())
    .then(data => {
        if (data.pasw == true) {
            output.classList.add("positive");
            output.innerHTML = "Corretta";
            window.location.href = "/admin-pannel"
        } else {
            output.classList.add("negative");
            output.innerHTML = "Password errata";
        }

        setTimeout(reset_output, 1500);
        
        password.value = "";
    })
}

send_password.addEventListener('click', function() {
    send_password_verify();
})

password.addEventListener('keypress', function(e) {
    if (e.key == "Enter") {
        send_password_verify();
    }
})