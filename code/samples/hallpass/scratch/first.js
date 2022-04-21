
function start() {
    console.log("Hello 123");
    const box = document.getElementById("box1")
    console.log("box is", box)
    box.addEventListener("click", bumpbox)
    box.style.position = "absolute"
    window.addEventListener("mousemove", handlemousemove)
}
/**
 *  this is an event handler
 * hello
 * 
 */
function bumpbox(event) {
    console.log("bumpboxrun", event.timeStamp)
    const box = document.getElementById("foobar")
    console.log(box)
    box.style.color = "red"
    box.style.transform = "translate(45px,299px)", 5000
}

function handlemousemove(event) {
    console.log(event)
    const box1 = document.getElementById("box1")
    box1.style.color = "white"
    box1.style.left = event.clientX + 'px';
    box1.style.top = event.clientY + 'px';
  //  box1.style.bottom = event.clientX
}
start()



    // for (a = 1; a <= 5; a++) {
    //     console.log(a)

    //         if (a %2 != 0 ) {
    //             console.log("even--", a)
    //         }
    // }
