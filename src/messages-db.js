(function () {
  const DB_NAME = 'somnex-messages';
  const STORE_NAME = 'messages';

  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error('IndexedDB is not supported in this browser.'));
        return;
      }

      const request = window.indexedDB.open(DB_NAME, 1);

      request.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = function () {
        resolve(request.result);
      };

      request.onerror = function () {
        reject(request.error);
      };
    });
  }

  function saveMessage(message) {
    return new Promise((resolve, reject) => {
      openDatabase()
        .then((db) => {
          const payload = {
            id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
            ...message,
            createdAt: new Date().toISOString(),
          };

          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          const request = store.add(payload);

          request.onsuccess = function () {
            resolve(payload);
          };

          request.onerror = function () {
            reject(request.error);
          };
        })
        .catch(reject);
    });
  }

  function getAllMessages() {
    return new Promise((resolve, reject) => {
      openDatabase()
        .then((db) => {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const request = store.getAll();

          request.onsuccess = function () {
            const messages = request.result || [];
            resolve(messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
          };

          request.onerror = function () {
            reject(request.error);
          };
        })
        .catch(reject);
    });
  }

  window.SomnexMessages = {
    saveMessage,
    getAllMessages,
  };
})();
