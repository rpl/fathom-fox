let backgroundPort = browser.runtime.connect();

async function createPanel() {
  const sidebar = await browser.devtools.panels.elements.createSidebarPane("Fathom");
  sidebar.setPage('/pages/devtoolsPanel.html');
  sidebar.onShown.addListener(panelShowed);
  sidebar.onHidden.addListener(panelHid);
}

async function panelShowed(extensionPanel) {
    // TODO: Pull data attrs into UI.

    backgroundPort.postMessage({type: 'showHighlight',
                                tabId: browser.devtools.inspectedWindow.tabId,
                                inspectedElement: await inspectedElementPath()});
}

function panelHid(extensionPanel) {
    backgroundPort.postMessage({type: 'hideHighlight',
                                tabId: browser.devtools.inspectedWindow.tabId});
}

createPanel();
