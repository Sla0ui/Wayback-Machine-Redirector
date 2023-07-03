chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "notification") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Wayback Machine",
      message: message.message,
    });
  }
});
