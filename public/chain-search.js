// Chain search functionality for Supported Blockchains page
(function() {
  function initChainSearch() {
    // Only run on the supported blockchains page
    if (!window.location.pathname.includes('supported-blockchains')) {
      return;
    }

    // Check if search already exists
    if (document.getElementById('chain-search-container')) {
      return;
    }

    // Find the "All Supported Chains" heading - be very specific
    const headings = document.querySelectorAll('h2');
    let targetHeading = null;

    // Find the exact heading with "All Supported Chains" text
    for (const heading of headings) {
      const text = heading.textContent.trim();
      if (text === 'All Supported Chains' || text.startsWith('All Supported Chains')) {
        // Verify this is in the main content area, not navigation
        const parentSection = heading.closest('article, main, [class*="content"]');
        if (parentSection) {
          targetHeading = heading;
          break; // Take the first match only
        }
      }
    }

    if (!targetHeading) {
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
    searchIcon.style.color = '#3F58C7';

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
    searchInput.style.border = '2px solid #3F58C7';
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

    // Create results container for search results
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'chain-search-results';
    resultsContainer.style.display = 'none';
    resultsContainer.style.marginTop = '24px';
    resultsContainer.style.marginBottom = '24px';

    // Insert after the heading
    targetHeading.parentNode.insertBefore(searchContainer, targetHeading.nextSibling);
    targetHeading.parentNode.insertBefore(resultsContainer, targetHeading.nextSibling.nextSibling);

    // Hidden blockchain database
    const blockchains = [
      // Ethereum L2s
      { name: 'Arbitrum', description: 'High-performance L2', icon: 'https://images.octav.fi/chains/arbitrum_icon.svg', category: 'Ethereum L2s' },
      { name: 'Arbitrum Nova', description: 'Gaming & social L2', icon: 'https://images.octav.fi/chains/arbitrum_nova_icon.png', category: 'Ethereum L2s' },
      { name: 'Base', description: 'Coinbase L2', icon: 'https://images.octav.fi/chains/base_icon.svg', category: 'Ethereum L2s' },
      { name: 'Optimism', description: 'OP Stack L2', icon: 'https://images.octav.fi/chains/optimism_icon.svg', category: 'Ethereum L2s' },
      { name: 'Blast', description: 'Native yield L2', icon: 'https://images.octav.fi/chains/blast_icon.svg', category: 'Ethereum L2s' },
      { name: 'zkSync Era', description: 'Zero-knowledge L2', icon: 'https://images.octav.fi/chains/zksync_era_icon.svg', category: 'Ethereum L2s' },
      { name: 'Linea', description: 'ConsenSys zkEVM', icon: 'https://images.octav.fi/chains/linea_icon.svg', category: 'Ethereum L2s' },
      { name: 'Scroll', description: 'Native zkEVM', icon: 'https://images.octav.fi/chains/scroll_icon.png', category: 'Ethereum L2s' },
      { name: 'Polygon zkEVM', description: 'Polygon\'s zkEVM', icon: 'https://images.octav.fi/chains/polygon_zkevm_icon.png', category: 'Ethereum L2s' },
      { name: 'Starknet', description: 'Cairo-based L2', icon: 'https://images.octav.fi/chains/starknet_icon.svg', category: 'Ethereum L2s' },
      { name: 'Zora', description: 'Creator economy L2', icon: 'https://images.octav.fi/chains/zora_icon.png', category: 'Ethereum L2s' },
      { name: 'Mode', description: 'DeFi-focused L2', icon: 'https://images.octav.fi/chains/mode_icon.svg', category: 'Ethereum L2s' },
      { name: 'Mantle', description: 'Modular L2', icon: 'https://images.octav.fi/chains/mantle.svg', category: 'Ethereum L2s' },
      { name: 'Metis', description: 'Decentralized L2', icon: 'https://images.octav.fi/chains/metis_icon.svg', category: 'Ethereum L2s' },
      { name: 'Boba', description: 'Hybrid compute L2', icon: 'circle', category: 'Ethereum L2s' },
      { name: 'Fraxtal', description: 'Frax\'s L2', icon: 'https://images.octav.fi/chains/fraxtal_icon.svg', category: 'Ethereum L2s' },
      { name: 'Taiko', description: 'Based rollup', icon: 'https://images.octav.fi/chains/taiko_icon.png', category: 'Ethereum L2s' },
      { name: 'X Layer', description: 'OKX L2', icon: 'x', category: 'Ethereum L2s' },
      { name: 'opBNB', description: 'BSC\'s L2', icon: 'https://images.octav.fi/chains/op_bnb_icon.png', category: 'Ethereum L2s' },
      { name: 'Unichain', description: 'Uniswap\'s L2', icon: 'https://images.octav.fi/chains/unichain_icon.png', category: 'Ethereum L2s' },
      { name: 'Sonic', description: 'Fast transactions', icon: 'https://images.octav.fi/chains/sonic_icon.png', category: 'Ethereum L2s' },
      { name: 'Abstract', description: 'Consumer-focused L2', icon: 'https://images.octav.fi/chains/abstract_icon.png', category: 'Ethereum L2s' },
      { name: 'Lens', description: 'Social L2', icon: 'https://images.octav.fi/chains/lens_icon.png', category: 'Ethereum L2s' },
      { name: 'Cyber', description: 'Social network L2', icon: 'robot', category: 'Ethereum L2s' },
      { name: 'ApeChain', description: 'ApeCoin L2', icon: 'monkey', category: 'Ethereum L2s' },
      { name: 'Ink', description: 'Kraken\'s L2', icon: 'https://images.octav.fi/chains/ink_icon.png', category: 'Ethereum L2s' },
      { name: 'Sonieum', description: 'Sony\'s L2', icon: 'https://images.octav.fi/chains/soneium_icon.png', category: 'Ethereum L2s' },
      { name: 'World Chain', description: 'Worldcoin L2', icon: 'https://images.octav.fi/chains/world_icon.png', category: 'Ethereum L2s' },
      { name: 'Plasma', description: 'Gaming L2', icon: 'https://images.octav.fi/chains/plasma_icon.png', category: 'Ethereum L2s' },
      { name: 'ZERϴ', description: 'Privacy L2', icon: 'circle', category: 'Ethereum L2s' },
      { name: 'Zircuit', description: 'AI-enhanced L2', icon: 'z', category: 'Ethereum L2s' },
      { name: 'Gravity', description: 'Galxe\'s L2', icon: 'circle-dot', category: 'Ethereum L2s' },
      { name: 'Morph', description: 'Consumer L2', icon: 'https://images.octav.fi/chains/morph_icon.png', category: 'Ethereum L2s' },

      // EVM L1s
      { name: 'Ethereum', description: 'Leading smart contract platform', icon: 'https://images.octav.fi/chains/ethereum_icon.svg', category: 'EVM L1s' },
      { name: 'BSC', description: 'BNB Smart Chain', icon: 'https://images.octav.fi/chains/binance_icon.svg', category: 'EVM L1s' },
      { name: 'Polygon', description: 'Ethereum sidechain', icon: 'https://images.octav.fi/chains/polygon_icon.svg', category: 'EVM L1s' },
      { name: 'Avalanche', description: 'Subnet architecture', icon: 'https://images.octav.fi/chains/avalanche_icon.svg', category: 'EVM L1s' },
      { name: 'Fantom', description: 'Fast finality', icon: 'https://images.octav.fi/chains/fantom_icon.svg', category: 'EVM L1s' },
      { name: 'Gnosis', description: 'Payments focused', icon: 'https://images.octav.fi/chains/gnosis_icon.svg', category: 'EVM L1s' },
      { name: 'Celo', description: 'Mobile-first', icon: 'https://images.octav.fi/chains/celo_icon.svg', category: 'EVM L1s' },
      { name: 'Cronos', description: 'Crypto.com chain', icon: 'https://images.octav.fi/chains/cronos_icon.svg', category: 'EVM L1s' },
      { name: 'Cronos zkEVM', description: 'Cronos L2', icon: 'https://images.octav.fi/chains/cronos_icon.svg', category: 'EVM L1s' },
      { name: 'Kaia', description: 'Asian market focus', icon: 'k', category: 'EVM L1s' },
      { name: 'Moonbeam', description: 'Polkadot parachain', icon: 'moon', category: 'EVM L1s' },
      { name: 'Moonriver', description: 'Kusama parachain', icon: 'moon', category: 'EVM L1s' },
      { name: 'Canto', description: 'DeFi-focused', icon: 'c', category: 'EVM L1s' },
      { name: 'Core', description: 'Bitcoin-aligned', icon: 'https://images.octav.fi/chains/core_icon.png', category: 'EVM L1s' },
      { name: 'Rootstock', description: 'Bitcoin sidechain', icon: 'https://images.octav.fi/chains/rootstock_icon.png', category: 'EVM L1s' },
      { name: 'Kava', description: 'Cosmos EVM', icon: 'k', category: 'EVM L1s' },
      { name: 'IoTeX', description: 'IoT blockchain', icon: 'microchip', category: 'EVM L1s' },
      { name: 'Shibarium', description: 'SHIB L2', icon: 'https://images.octav.fi/chains/shib_icon.png', category: 'EVM L1s' },
      { name: 'WEMIX', description: 'Gaming platform', icon: 'w', category: 'EVM L1s' },
      { name: 'Astar', description: 'Polkadot parachain', icon: 'star', category: 'EVM L1s' },
      { name: 'ZetaChain', description: 'Omnichain', icon: 'z', category: 'EVM L1s' },
      { name: 'Flare', description: 'Data blockchain', icon: 'https://images.octav.fi/chains/flare_icon.png', category: 'EVM L1s' },
      { name: 'Fuse', description: 'Payments', icon: 'https://images.octav.fi/chains/fuse_icon.png', category: 'EVM L1s' },
      { name: 'Oasys', description: 'Gaming optimized', icon: 'gamepad', category: 'EVM L1s' },
      { name: 'Telos', description: 'Fast & feeless', icon: 'https://images.octav.fi/chains/tlos_icon.png', category: 'EVM L1s' },
      { name: 'Dogechain', description: 'DOGE ecosystem', icon: 'dog', category: 'EVM L1s' },
      { name: 'Chiliz', description: 'Sports & entertainment', icon: 'pepper-hot', category: 'EVM L1s' },
      { name: 'Conflux', description: 'Chinese blockchain', icon: 'wave', category: 'EVM L1s' },
      { name: 'Lisk', description: 'JavaScript SDK', icon: 'l', category: 'EVM L1s' },
      { name: 'Etherlink', description: 'Tezos L2', icon: 'https://images.octav.fi/chains/ethlink_icon.png', category: 'EVM L1s' },
      { name: 'Vana', description: 'Data ownership', icon: 'v', category: 'EVM L1s' },

      // Alt L1s & Specialized
      { name: 'Solana', description: 'High-throughput blockchain', icon: 'https://images.octav.fi/chains/solana_icon.svg', category: 'Alt L1s' },
      { name: 'Hyperliquid', description: 'Decentralized perpetuals exchange', icon: 'https://images.octav.fi/chains/hyperliquid_icon.png', category: 'Alt L1s' },
      { name: 'Berachain', description: 'Liquidity-focused PoL', icon: 'https://images.octav.fi/chains/berachain_icon.png', category: 'Alt L1s' },
      { name: 'Sei', description: 'Trading-optimized', icon: 's', category: 'Alt L1s' },
      { name: 'Immutable', description: 'Gaming & NFTs', icon: 'shield', category: 'Alt L1s' },
      { name: 'Ronin', description: 'Axie Infinity chain', icon: 'sword', category: 'Alt L1s' },
      { name: 'XRPL', description: 'XRP Ledger', icon: 'x', category: 'Alt L1s' },
      { name: 'DuckChain', description: 'TON-based', icon: 'duck', category: 'Alt L1s' },

      // Bitcoin & Others
      { name: 'Bitlayer', description: 'Bitcoin L2', icon: 'layer-group', category: 'Bitcoin' },
      { name: 'B²', description: 'Bitcoin L2', icon: 'https://images.octav.fi/chains/b2_icon.png', category: 'Bitcoin' },
      { name: 'BOB', description: 'Build on Bitcoin', icon: 'https://images.octav.fi/chains/bob_icon.png', category: 'Bitcoin' },
      { name: 'Merlin', description: 'Bitcoin L2', icon: 'https://images.octav.fi/chains/merlin_icon.png', category: 'Bitcoin' },

      // DeFi & Infrastructure
      { name: 'Manta', description: 'Privacy DeFi', icon: 'https://images.octav.fi/chains/manta.svg', category: 'DeFi' },
      { name: 'Karak', description: 'Restaking layer', icon: 'k', category: 'DeFi' },
      { name: 'Orderly', description: 'DeFi infrastructure', icon: 'chart-line', category: 'DeFi' },
      { name: 'Reya', description: 'Trading optimized', icon: 'r', category: 'DeFi' },
      { name: 'Katana', description: 'Ronin DEX chain', icon: 'https://images.octav.fi/chains/katana_icon.png', category: 'DeFi' },
      { name: 'Bouncebit', description: 'BTC restaking', icon: 'https://images.octav.fi/chains/bouncebit_icon.png', category: 'DeFi' },
      { name: 'Plume', description: 'RWA-focused', icon: 'https://images.octav.fi/chains/plume_icon.svg', category: 'DeFi' },
      { name: 'SwellChain', description: 'Liquid staking L2', icon: 'https://images.octav.fi/chains/swell_icon.png', category: 'DeFi' },
      { name: 'Story', description: 'IP blockchain', icon: 'book', category: 'DeFi' },
      { name: 'Bifrost', description: 'Liquid staking', icon: 'bridge', category: 'DeFi' },
      { name: 'Everclear', description: 'Cross-chain clearing', icon: 'https://images.octav.fi/chains/everclear_icon.png', category: 'DeFi' },
      { name: 'HyperEVM', description: 'High performance', icon: 'h', category: 'DeFi' },
      { name: 'Mint', description: 'NFT-focused', icon: 'https://images.octav.fi/chains/mint_icon.png', category: 'DeFi' },
      { name: 'Rari', description: 'Royalty-focused', icon: 'https://images.octav.fi/chains/rari_icon.png', category: 'DeFi' },

      // Emerging
      { name: 'Sophon', description: 'Entertainment & gaming', icon: 'https://images.octav.fi/chains/sophon_icon.png', category: 'Emerging' },
      { name: 'Corn', description: 'DeFi layer', icon: 'https://images.octav.fi/chains/corn_icon.png', category: 'Emerging' },
      { name: 'Hemi', description: 'Bitcoin-Ethereum bridge', icon: 'https://images.octav.fi/chains/hemi_icon.png', category: 'Emerging' },
      { name: 'GOAT', description: 'Community-driven', icon: 'goat', category: 'Emerging' },
      { name: 'DBK', description: 'Gaming chain', icon: 'd', category: 'Emerging' }
    ];

    // Search functionality
    function performSearch() {
      const searchValue = searchInput.value.toLowerCase().trim();

      // Show/hide clear button
      clearButton.style.display = searchValue ? 'flex' : 'none';

      if (!searchValue) {
        // Hide results container
        resultsContainer.style.display = 'none';
        resultsContainer.innerHTML = '';
        resultMessage.style.display = 'none';
        return;
      }

      // Search through blockchain database
      const matches = blockchains.filter(chain => {
        return chain.name.toLowerCase().includes(searchValue) ||
               chain.description.toLowerCase().includes(searchValue) ||
               chain.category.toLowerCase().includes(searchValue);
      });

      // Update result message
      resultMessage.style.display = 'block';
      if (matches.length > 0) {
        resultMessage.innerHTML = `Found <strong>${matches.length}</strong> blockchain${matches.length !== 1 ? 's' : ''} matching "<strong>${searchValue}</strong>"`;
      } else {
        resultMessage.innerHTML = `No blockchains found matching "<strong>${searchValue}</strong>"`;
      }

      // Clear and populate results container
      resultsContainer.innerHTML = '';

      if (matches.length > 0) {
        // Create grid container
        const gridContainer = document.createElement('div');
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
        gridContainer.style.gap = '16px';
        gridContainer.style.marginTop = '16px';

        // Create cards for matches
        matches.forEach(chain => {
          const card = document.createElement('div');
          card.style.border = '1px solid #e5e7eb';
          card.style.borderRadius = '8px';
          card.style.padding = '16px';
          card.style.backgroundColor = '#ffffff';
          card.style.transition = 'all 0.2s';
          card.style.cursor = 'default';
          card.style.display = 'flex';
          card.style.gap = '12px';
          card.style.alignItems = 'flex-start';

          // Card hover effect
          card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            card.style.transform = 'translateY(-2px)';
          });
          card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
            card.style.transform = 'translateY(0)';
          });

          // Chain icon/logo
          const iconContainer = document.createElement('div');
          iconContainer.style.flexShrink = '0';
          iconContainer.style.width = '40px';
          iconContainer.style.height = '40px';
          iconContainer.style.borderRadius = '8px';
          iconContainer.style.overflow = 'hidden';
          iconContainer.style.display = 'flex';
          iconContainer.style.alignItems = 'center';
          iconContainer.style.justifyContent = 'center';
          iconContainer.style.backgroundColor = '#f9fafb';

          // Check if icon is a URL or FontAwesome icon name
          if (chain.icon.startsWith('http')) {
            const iconImg = document.createElement('img');
            iconImg.src = chain.icon;
            iconImg.alt = chain.name;
            iconImg.style.width = '32px';
            iconImg.style.height = '32px';
            iconImg.style.objectFit = 'contain';
            iconContainer.appendChild(iconImg);
          } else {
            // FontAwesome icon placeholder
            const iconPlaceholder = document.createElement('div');
            iconPlaceholder.textContent = chain.name.charAt(0).toUpperCase();
            iconPlaceholder.style.fontSize = '18px';
            iconPlaceholder.style.fontWeight = '600';
            iconPlaceholder.style.color = '#3F58C7';
            iconContainer.appendChild(iconPlaceholder);
          }

          // Content container
          const contentContainer = document.createElement('div');
          contentContainer.style.flex = '1';
          contentContainer.style.minWidth = '0';

          // Card title
          const title = document.createElement('h4');
          title.textContent = chain.name;
          title.style.margin = '0 0 4px 0';
          title.style.fontSize = '16px';
          title.style.fontWeight = '600';
          title.style.color = '#111827';

          // Card description
          const description = document.createElement('p');
          description.textContent = chain.description;
          description.style.margin = '0';
          description.style.fontSize = '14px';
          description.style.color = '#6b7280';
          description.style.lineHeight = '1.5';

          contentContainer.appendChild(title);
          contentContainer.appendChild(description);
          card.appendChild(iconContainer);
          card.appendChild(contentContainer);
          gridContainer.appendChild(card);
        });

        resultsContainer.appendChild(gridContainer);
        resultsContainer.style.display = 'block';
      } else {
        resultsContainer.style.display = 'none';
      }
    }

    // Event listeners
    searchInput.addEventListener('input', performSearch);

    searchInput.addEventListener('focus', () => {
      searchInput.style.borderColor = '#3F58C7';
      searchInput.style.boxShadow = '0 0 0 3px rgba(63, 88, 199, 0.15)';
    });

    searchInput.addEventListener('blur', () => {
      searchInput.style.borderColor = '#3F58C7';
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

  // Retry logic for SPA navigation
  let retryCount = 0;
  const maxRetries = 10;

  function tryInitWithRetry() {
    if (window.location.pathname.includes('supported-blockchains')) {
      const headings = document.querySelectorAll('h2');
      let hasTargetHeading = false;

      // Check for exact heading match in main content area
      for (const h of headings) {
        const text = h.textContent.trim();
        if (text === 'All Supported Chains' || text.startsWith('All Supported Chains')) {
          const parentSection = h.closest('article, main, [class*="content"]');
          if (parentSection) {
            hasTargetHeading = true;
            break;
          }
        }
      }

      if (hasTargetHeading && !document.getElementById('chain-search-container')) {
        initChainSearch();
        retryCount = 0;
      } else if (!document.getElementById('chain-search-container') && retryCount < maxRetries) {
        retryCount++;
        setTimeout(tryInitWithRetry, 100);
      }
    } else {
      retryCount = 0;
    }
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInitWithRetry);
  } else {
    tryInitWithRetry();
  }

  // Re-initialize on navigation (for SPA) with debouncing
  let debounceTimer;
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      retryCount = 0;
      tryInitWithRetry();
    }, 150);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Listen for navigation events
  window.addEventListener('popstate', () => {
    retryCount = 0;
    setTimeout(tryInitWithRetry, 100);
  });
})();
