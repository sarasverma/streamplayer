async function loadVideo() {
  const url = document.getElementById("video-url").value;
  const loading = document.getElementById("loading");
  const player = document.getElementById("video-player");
  const source = document.getElementById("video-source");

  if (!url) {
    alert("Please enter a URL.");
    return;
  }

  loading.style.display = "block"; // Show loading
  player.style.display = "none"; // Hide player while loading

  try {
    const response = await fetch("/get_video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (data.video_url) {
      source.src = data.video_url;
      player.load();
      player.style.display = "block";
    } else {
      alert("Error: " + data.error);
    }
  } catch (error) {
    alert("Failed to load video: " + error.message);
  } finally {
    loading.style.display = "none"; // Hide loading
  }
}
