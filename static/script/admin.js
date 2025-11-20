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

            card_message.appendChild(title)
            card_message.appendChild(br)
            card_message.appendChild(name)
            card_message.appendChild(surname)
            card_message.appendChild(email)
            card_message.appendChild(messa)

            messages.appendChild(card_message)
        });
    })
})

/*

<div class = "card_message">
    <div class = "title">MESSAGE</div>
    <br>
    <div class = "info">{{message.nome}}</div>
    <div class = "info">{{message.cognome}}</div>
    <div class = "info"><a href="mailto:{{message.email}}">{{message.email}}</a></div>
    <div class = "info">{{message.messaggio}}</div>
</div>

*/