function drawPreviewDroplet() {
    if (circ) {
        return;
    }

    var previewX = constrain(mouseX, playX + previewRadius, playX + PLAY_AREA_WIDTH - previewRadius);

    push();
    fill(30, 80, 150, 160);
    stroke(255);
    strokeWeight(2);
    ellipse(previewX, spawnY, previewRadius * 2, previewRadius * 2);
    pop();
}