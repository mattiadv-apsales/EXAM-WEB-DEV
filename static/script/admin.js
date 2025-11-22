let update_visual = document.getElementById('update_visual');
let visual_p = document.getElementById('visual_p');

let messages_update = document.getElementById('messages_update');
let messages = document.getElementById('messages');

let output = document.getElementById('output');

const temp_for_loading = 3000

function clear_output() {
    output.innerHTML = ""
}

function fetch_update_visual() {
    fetch("/update_visual", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
    })
    .then(response => response.json())
    .then(data => {
        let visual_page = document.getElementById('visual_page').innerText;
        let diff = 0
        if (Number(data.visual) > Number(visual_page)) {
            diff = Number(data.visual) - Number(visual_page);
        }
        if (diff > 0) {
            output.innerHTML = diff + " new visual on the website"
        } else {
            output.innerHTML = "No new visual on the website"
        }
        visual_p.innerHTML = "Visual page: <span id = 'visual_page'>" + data.visual + "</span>"

        setTimeout(clear_output, temp_for_loading)
        update_visual.disabled = false
    })
}

function fetch_update_message() {
    fetch("/update_messages", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        messages.innerHTML = ""
        output.innerHTML = ""
        messages_update.disabled = false
        
        data.messages.forEach(msg => {
            let card_message = document.createElement('div')
            card_message.classList.add("card_message")
            card_message.id = "card_" + msg["id"]

            let title = document.createElement('div')
            title.classList.add('title')
            title.innerHTML = "MESSAGE"

            let br = document.createElement('br')

            let name = document.createElement('div')
            name.classList.add("info")
            name.innerHTML = "<span class = 'info_point'>Name: </span>" + msg["nome"]

            let surname = document.createElement('div')
            surname.classList.add("info")
            surname.innerHTML = "<span class = 'info_point'>Surname: </span>" +  msg["cognome"]

            let email = document.createElement('div')
            email.classList.add("info")
            email.innerHTML = "<span class = 'info_point'>Email: </span>" +  "<a href='mailto:" + msg["email"] + "'>" + msg["email"] + "</a>"

            let messa = document.createElement('div')
            messa.classList.add("info")
            messa.innerHTML = "<span class = 'info_point'>Message: </span>" +  msg["messaggio"]

            let button = document.createElement('button')
            button.classList.add("delete_message_button")
            button.innerHTML = "Delete"
            button.id = msg["id"]
            button.addEventListener('click', function() {
                delete_messages(msg["id"])
            })

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
}

update_visual.addEventListener('click', function() {
    output.innerHTML = "We are loading new visual, please wait 3 seconds..."
    setTimeout(fetch_update_visual, temp_for_loading)
    update_visual.disabled = true
})

messages_update.addEventListener('click', function() {
    output.innerHTML = "We are loading new messages, please wait 3 seconds..."
    setTimeout(fetch_update_message, temp_for_loading)
    messages_update.disabled = true
})

function delete_messages(id) {
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
            output.innerHTML = "Card deleted correctly"
            setTimeout(clear_output, temp_for_loading)
        } else {
            return 0;
        }
    })
}