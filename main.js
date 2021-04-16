objects = []
status = ""

function preload() {

}

function setup() {
    canvas = createCanvas(400, 400)
    canvas.parent("canvas")

    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
}

function start() {
    objectdetector = ml5.objectDetector("cocossd", modeloaded)
    document.getElementById("status").innerHTML = "Status : detecting objects";
    object_find = document.getElementById("word-input").value
}

function modeloaded() {
    console.log("Model is working!")
    status = true
}

function gotresults(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects = results
    }
}

function draw() {
    image(video, 0, 0, 380, 380)

    if (status != "") {
        objectdetector.detect(video, gotresults)
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status:Objects Detected"
            object_name = objects[i].label
            x = objects[i].x
            y = objects[i].y
            width = objects[i].width
            height = objects[i].height
            acc = floor(objects[i].confidence * 100) + "%"

            r = random(255)
            g = random(255)
            b = random(255)

            fill(r, g, b)
            text(object_name + " " + acc, x, y - 7)
            textSize(15)
            noFill()
            stroke(r, g, b)
            strokeWeight(1)
            rect(x, y, width, height)

            if (object_name == object_find) {
                video.stop()
                document.getElementById("object").innerHTML = object_find + " found"
                synth = window.speechSynthesis
                utterThis = new SpeechSynthesisUtterance(object_find + "Found");
                synth.speak(utterThis);

            } else {
                document.getElementById("object").innerHTML = object_find + " not found"
            }
        }
    }
}