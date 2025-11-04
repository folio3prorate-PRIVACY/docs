// Update Dev Portal button label based on current tab
(function() {
  function updateButtonLabel() {
    const isApiTab = window.location.pathname.startsWith('/api/');
    const buttons = document.querySelectorAll('nav a[href*="data.octav.fi"], header a[href*="data.octav.fi"]');

    buttons.forEach(button => {
      const label = isApiTab ? 'Dev Portal' : 'Launch Octav';
      // Only update text nodes, not the img element
      const textNode = Array.from(button.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
      if (textNode) {
        textNode.textContent = label;
      } else {
        // If no text node exists, create one after the image
        const img = button.querySelector('img');
        if (img) {
          button.insertBefore(document.createTextNode(' ' + label), img.nextSibling);
        }
      }
    });
  }

  // Run on page load
  updateButtonLabel();

  // Run when navigation changes (for SPA navigation)
  const observer = new MutationObserver(() => {
    updateButtonLabel();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Also listen for popstate (browser back/forward)
  window.addEventListener('popstate', updateButtonLabel);

  // Listen for clicks on links to catch navigation
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.closest('a')) {
      setTimeout(updateButtonLabel, 100);
    }
  });
})();
