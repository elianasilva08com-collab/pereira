// Utility functions for loading tracking tags and custom HTML

export const loadGoogleTag = (tagId: string): void => {
  console.log('📊 Carregando Google Tag:', tagId);
  
  // Remove existing tags
  const existingScripts = document.querySelectorAll('script[data-google-tag]');
  existingScripts.forEach(script => script.remove());
  
  // Add new tag
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
  script1.setAttribute('data-google-tag', 'gtag-src');
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.setAttribute('data-google-tag', 'gtag-config');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${tagId}');
    console.log('✅ Google Tag configurado automaticamente:', '${tagId}');
  `;
  document.head.appendChild(script2);

  script1.onload = () => {
    console.log('✅ Google Tag carregado automaticamente:', tagId);
  };
};

export const loadCustomHtml = (htmlContent: string): void => {
  console.log('🎨 Carregando HTML personalizado');
  
  // Remove existing custom HTML
  const existingCustom = document.querySelector('#custom-html-injection');
  if (existingCustom) {
    existingCustom.remove();
  }
  
  const container = document.createElement('div');
  container.id = 'custom-html-injection';
  container.innerHTML = htmlContent;
  
  // Move scripts to head
  const scripts = container.querySelectorAll('script');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    if (script.src) {
      newScript.src = script.src;
      newScript.async = true;
    }
    if (script.innerHTML) {
      newScript.innerHTML = script.innerHTML;
    }
    Array.from(script.attributes).forEach(attr => {
      if (attr.name !== 'src' && attr.name !== 'innerHTML') {
        newScript.setAttribute(attr.name, attr.value);
      }
    });
    document.head.appendChild(newScript);
  });

  // Move styles to head
  const styles = container.querySelectorAll('style');
  styles.forEach(style => {
    const newStyle = document.createElement('style');
    newStyle.innerHTML = style.innerHTML;
    document.head.appendChild(newStyle);
  });
};

export const loadEventSnippet = (snippet: string): void => {
  console.log('🎯 Carregando snippet de eventos');
  
  // Remove existing snippet
  const existingSnippet = document.querySelector('#google-event-snippet');
  if (existingSnippet) {
    existingSnippet.remove();
  }
  
  const script = document.createElement('script');
  script.id = 'google-event-snippet';
  script.innerHTML = snippet;
  document.head.appendChild(script);
};

export const loadSavedTags = (): void => {
  console.log('🚀 Carregando tags salvas...');
  
  // Load Google Tag
  const savedTagId = localStorage.getItem('googleTagId');
  if (savedTagId) {
    loadGoogleTag(savedTagId);
  } else {
    console.log('ℹ️ Nenhuma Google Tag salva encontrada');
  }

  // Load custom HTML
  const savedHtml = localStorage.getItem('customHtmlTag');
  if (savedHtml) {
    loadCustomHtml(savedHtml);
  } else {
    console.log('ℹ️ Nenhum HTML personalizado salvo encontrado');
  }

  // Load event snippet
  const savedEventSnippet = localStorage.getItem('googleEventSnippet');
  if (savedEventSnippet) {
    loadEventSnippet(savedEventSnippet);
  } else {
    console.log('ℹ️ Nenhum snippet de evento salvo encontrado');
  }

  console.log('✅ Carregamento de tags concluído');
};