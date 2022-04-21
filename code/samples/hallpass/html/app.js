/**
 * Hall Pass Project
 * March 8, 2021
 * @author Radley Finer
 */

function gamestart() {
    console.log("line 8", Date.now())

    const title_scene = document.getElementById("title_scene")

    const game_scene = document.getElementById("game_scene")
    console.log("line 15", title_scene)
    title_scene.style.display = 'none'
    game_scene.style.display = 'block'
}

