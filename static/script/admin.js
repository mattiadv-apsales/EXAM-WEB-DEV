let update_visual = document.getElementById('update_visual');
let visual_p = document.getElementById('visual_p');

let messages_update = document.getElementById('messages_update');
let messages = document.getElementById('messages');

update_visual.addEventListener('click', function() {
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

messages_update.addEventListener('click', function() {
    fetch("/update_messages", {
        method: "POST",
        headers: {
            "content-type": "applcation/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        messages.innerHTML = ""
        
        data.messages.forEach(msg => {
            let card_message = document.createElement('div')
            card_message.classList.add("card_message")

            let title = document.createElement('div')
            title.classList.add('title')
            title.innerHTML = "MESSAGE"

            let br = document.createElement('br')

            let name = document.createElement('div')
            name.classList.add("info")
            name.innerHTML = msg["nome"]

            let surname = document.createElement('div')
            surname.classList.add("info")
            surname.innerHTML = msg["cognome"]

            let email = document.createElement('div')
            email.classList.add("info")
            email.innerHTML = "<a href='mailto:" + msg["email"] + "'>" + msg["email"] + "</a>"

            let messa = document.createElement('div')
            messa.classList.add("info")
            messa.innerHTML = msg["messaggio"]

            let button = document.createElement('button')
            button.classList.add("delete_message_button")
            button.innerHTML = "Delete"
            button.id = msg["id"]

            card_message.appendChild(title)
            card_message.appendChild(br)
            card_message.appendChild(name)
            card_message.appendChild(surname)
            card_message.appendChild(email)
            card_message.appendChild(messa)
            card_message.appendChild(button)

            messages.appendChild(card_message)
        });
    })
})

function delete_messages(id) {
    console.log(id)
    fetch("/delete_message", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({"id": id})
    })
    .then(response => response.json())
    .then(data => {
        if (data.status == true) {
            let card = document.getElementById('card_' + id)
            card.remove();
        } else {
            return 0;
        }
    })
}

let all_delete_buttons = document.querySelectorAll('.delete_message_button');

all_delete_buttons.forEach(but => {
    but.addEventListener('click', function() {
        delete_messages(but.id)
    })
})