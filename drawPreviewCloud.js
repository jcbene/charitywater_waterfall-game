function drawPreviewCloud() {
    if (circ) {
        return;
    }

    var previewX = constrain(
        mouseX,
        playX + previewRadius,
        playX + PLAY_AREA_WIDTH - previewRadius
    );

    push();
    imageMode(CENTER);

    image(
        cloudPegImg,
        previewX,
        cloudPreviewY,
        96,
        72
    );

    pop();
}