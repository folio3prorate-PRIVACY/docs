// Chain search functionality for Supported Blockchains page
(function() {
  function initChainSearch() {
    // Only run on the supported blockchains page
    if (!window.location.pathname.includes('supported-blockchains')) {
      return;
    }

    // Find the "All Supported Chains" heading
    const headings = document.querySelectorAll('h2');
    let targetHeading = null;

    headings.forEach(heading => {
      if (heading.textContent.includes('All Supported Chains')) {
        targetHeading = heading;
      }
    });

    if (!targetHeading) {
      return;
    }

    // Check if search already exists
    if (document.getElementById('chain-search-container')) {
      return;
    }

    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.id = 'chain-search-container';
    searchContainer.style.marginBottom = '24px';
    searchContainer.style.marginTop = '8px';

    // Create search input wrapper
    const searchWrapper = document.createElement('div');
    searchWrapper.style.position = 'relative';
    searchWrapper.style.maxWidth = '600px';

    // Create search icon
    const searchIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    searchIcon.setAttribute('width', '18');
    searchIcon.setAttribute('height', '18');
    searchIcon.setAttribute('viewBox', '0 0 18 18');
    searchIcon.setAttribute('fill', 'none');
    searchIcon.style.position = 'absolute';
    searchIcon.style.left = '14px';
    searchIcon.style.top = '50%';
    searchIcon.style.transform = 'translateY(-50%)';
    searchIcon.style.color = '#9ca3af';

    const searchIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    searchIconPath.setAttribute('d', 'M12.5 11h-.79l-.28-.27A6.471 6.471 0 0 0 13 6.5 6.5 6.5 0 1 0 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z');
    searchIconPath.setAttribute('fill', 'currentColor');
    searchIcon.appendChild(searchIconPath);

    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search Supported Blockchains (e.g. Ethereum, Base)...';
    searchInput.style.width = '100%';
    searchInput.style.padding = '12px 40px 12px 42px';
    searchInput.style.fontSize = '15px';
    searchInput.style.border = '1px solid #e5e7eb';
    searchInput.style.borderRadius = '8px';
    searchInput.style.outline = 'none';
    searchInput.style.transition = 'all 0.2s';
    searchInput.style.backgroundColor = '#ffffff';

    // Create clear button
    const clearButton = document.createElement('button');
    clearButton.innerHTML = '×';
    clearButton.style.position = 'absolute';
    clearButton.style.right = '12px';
    clearButton.style.top = '50%';
    clearButton.style.transform = 'translateY(-50%)';
    clearButton.style.background = 'none';
    clearButton.style.border = 'none';
    clearButton.style.color = '#9ca3af';
    clearButton.style.cursor = 'pointer';
    clearButton.style.fontSize = '20px';
    clearButton.style.lineHeight = '1';
    clearButton.style.padding = '4px';
    clearButton.style.display = 'none';

    // Create result message
    const resultMessage = document.createElement('p');
    resultMessage.style.marginTop = '12px';
    resultMessage.style.fontSize = '14px';
    resultMessage.style.color = '#6b7280';
    resultMessage.style.display = 'none';

    // Assemble the search UI
    searchWrapper.appendChild(searchIcon);
    searchWrapper.appendChild(searchInput);
    searchWrapper.appendChild(clearButton);
    searchContainer.appendChild(searchWrapper);
    searchContainer.appendChild(resultMessage);

    // Insert after the heading
    targetHeading.parentNode.insertBefore(searchContainer, targetHeading.nextSibling);

    // Find the "Major Blockchains" section to exclude from search
    const majorBlockchainsSection = targetHeading.previousElementSibling;

    // Search functionality
    function performSearch() {
      const searchValue = searchInput.value.toLowerCase().trim();

      // Show/hide clear button
      clearButton.style.display = searchValue ? 'flex' : 'none';

      // Get all cards within the tabs section only (not Major Blockchains)
      const tabsContainer = targetHeading.nextElementSibling;
      if (!tabsContainer) {
        return;
      }

      const tabCards = tabsContainer.querySelectorAll('a[class*="Card"], div[class*="card-"]');
      let visibleCount = 0;

      // Filter cards within tabs
      tabCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        const shouldShow = searchValue === '' || cardText.includes(searchValue);

        if (shouldShow) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Show/hide result message
      if (searchValue) {
        resultMessage.style.display = 'block';
        if (visibleCount > 0) {
          resultMessage.innerHTML = `Found <strong>${visibleCount}</strong> blockchain${visibleCount !== 1 ? 's' : ''} matching "<strong>${searchValue}</strong>"`;
        } else {
          resultMessage.innerHTML = `No blockchains found matching "<strong>${searchValue}</strong>"`;
        }
      } else {
        resultMessage.style.display = 'none';
      }
    }

    // Event listeners
    searchInput.addEventListener('input', performSearch);

    searchInput.addEventListener('focus', () => {
      searchInput.style.borderColor = '#3F58C7';
      searchInput.style.boxShadow = '0 0 0 3px rgba(63, 88, 199, 0.1)';
    });

    searchInput.addEventListener('blur', () => {
      searchInput.style.borderColor = '#e5e7eb';
      searchInput.style.boxShadow = 'none';
    });

    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      performSearch();
      searchInput.focus();
    });

    clearButton.addEventListener('mouseenter', () => {
      clearButton.style.color = '#3F58C7';
    });

    clearButton.addEventListener('mouseleave', () => {
      clearButton.style.color = '#9ca3af';
    });
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChainSearch);
  } else {
    initChainSearch();
  }

  // Re-initialize on navigation (for SPA)
  const observer = new MutationObserver(() => {
    initChainSearch();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Listen for navigation
  window.addEventListener('popstate', () => {
    setTimeout(initChainSearch, 100);
  });

  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.closest('a')) {
      setTimeout(initChainSearch, 200);
    }
  });
})();
