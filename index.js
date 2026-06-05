const resultPanel = document.getElementById('fileContents');
const inputElement = document.getElementById('files');

inputElement?.addEventListener('change', () => {
  const file = inputElement.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  
  reader.readAsArrayBuffer(file); 
  reader.onload = async function({ target }) {
    try {
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', target.result);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      resultPanel.textContent = hashHex;
    } catch (cryptoError) {
      resultPanel.textContent = 'Error calculating hash';
    }
  };

  reader.onerror = function() {
    resultPanel.textContent = 'Error reading file';
  };
});