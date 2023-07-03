function addWaybackLink(element) {
  const originalURL = element.href;
  const waybackURL = `https://archive.org/wayback/available?url=${encodeURIComponent(originalURL)}`;

  fetch(waybackURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.archived_snapshots.closest) {
        const waybackLink = document.createElement("a");
        waybackLink.textContent = "Open in Wayback Machine";
        waybackLink.href = data.archived_snapshots.closest.url;
        waybackLink.target = "_blank";

        element.parentElement.appendChild(waybackLink);
      } else {
        showNotification("Snapshot Not Found");
      }
    })
    .catch((error) => {
      console.error("Error fetching Wayback Machine data:", error);
    });
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
  notification.style.color = "#fff";
  notification.style.padding = "5px";
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.borderRadius = "5px";
  notification.style.zIndex = "9999";
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

const searchResults = document.querySelectorAll('div.Z26q7c.UK95Uc.jGGQ5e a');
searchResults.forEach(addWaybackLink);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "get_current_url") {
    const currentURL = window.location.href;
    sendResponse({ url: currentURL });
  }
});
