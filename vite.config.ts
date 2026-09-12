import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

function suppressViteHmrSocketPlugin(): Plugin {
  return {
    name: 'suppress-vite-hmr-socket',
    transformIndexHtml: {
      order: 'pre',
      handler() {
        return [
          {
            tag: 'script',
            attrs: { type: 'text/javascript' },
            children: `
(function() {
  var OriginalWebSocket = window.WebSocket;
  if (!OriginalWebSocket) return;

  function isViteHmr(protocols) {
    if (!protocols) return false;
    if (typeof protocols === 'string') return protocols.indexOf('vite') !== -1;
    if (Array.isArray(protocols)) return protocols.some(function(p) { return typeof p === 'string' && p.indexOf('vite') !== -1; });
    return false;
  }

  window.WebSocket = function (url, protocols) {
    if (isViteHmr(protocols) || (typeof url === 'string' && (url.indexOf('vite-hmr') !== -1 || url.indexOf('24678') !== -1 || url.indexOf('5173') !== -1))) {
      var listeners = {};
      var fakeWs = {
        url: url,
        readyState: 1,
        OPEN: 1,
        CONNECTING: 0,
        CLOSING: 2,
        CLOSED: 3,
        addEventListener: function (type, callback) {
          listeners[type] = listeners[type] || [];
          listeners[type].push(callback);
          if (type === 'open') {
            setTimeout(function () {
              try { callback({ type: 'open', target: fakeWs }); } catch (e) {}
            }, 0);
          }
        },
        removeEventListener: function (type, callback) {
          if (!listeners[type]) return;
          listeners[type] = listeners[type].filter(function (cb) { return cb !== callback; });
        },
        send: function () {},
        close: function () {
          fakeWs.readyState = 3;
          (listeners['close'] || []).forEach(function (cb) {
            try { cb({ type: 'close', wasClean: true, code: 1000, target: fakeWs }); } catch (e) {}
          });
        }
      };
      return fakeWs;
    }
    return new OriginalWebSocket(url, protocols);
  };

  window.WebSocket.prototype = OriginalWebSocket.prototype;
  window.WebSocket.CONNECTING = OriginalWebSocket.CONNECTING;
  window.WebSocket.OPEN = OriginalWebSocket.OPEN;
  window.WebSocket.CLOSING = OriginalWebSocket.CLOSING;
  window.WebSocket.CLOSED = OriginalWebSocket.CLOSED;

  window.addEventListener('unhandledrejection', function (event) {
    var reason = event && (event.reason || event);
    var msg = (reason && (reason.message || reason.description || (typeof reason === 'string' ? reason : reason.toString()))) || '';
    if (typeof msg === 'string' && (msg.indexOf('WebSocket') !== -1 || msg.indexOf('websocket') !== -1)) {
      event.preventDefault();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
    }
  });
})();
            `,
            injectTo: 'head-prepend',
          },
        ];
      },
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [suppressViteHmrSocketPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: false,
      watch: null,
    },
  };
});
