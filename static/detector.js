/**
 * BrowserDetector
 * 
 * This util checks the current browser name and version and offers a
 * convinient API to test for specific versions or browsers and whether
 * the current visitor uses a supported browser or not.
 */
var BrowserDetector = {
    browser: {},
    unsupportedBrowsers: {
        IE: 10,
        MSIE: 10
    },
  
    //   detectBrowser();
  
    /**
     * Detects the current browser and its version number.
     * 
     * @returns {Object} An object with keys for browser `name` and `version`.
     */
    detectBrowser: function() {
      this.browser = (function() {
        var ua = navigator.userAgent,
          tem,
          M =
            ua.match(
              /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
            ) || [];
  
        if (/trident/i.test(M[1])) {
          tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
          return { name: "IE", version: tem[1] || "" };
        }
  
        if (M[1] === "Chrome") {
          tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
          if (tem != null) {
            return { name: tem[1].replace("OPR", "Opera"), version: tem[2] };
          }
        }
  
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
  
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
          M.splice(1, 1, tem[1]);
        }
  
        return { name: M[0], version: M[1] };
      })();
    },
  
    /**
     * Checks if the current browser is Internet Explorer.
     * 
     * @returns {Boolean}
     */
    isIE: function() {
      return this.browser.name === 'IE';
    },
  
    /**
     * Checks if the current browser is Edge.
     * 
     * @returns {Boolean}
     */
    isEdge: function() {
      return this.browser.name === 'Edge';
    },
  
    /**
     * Checks if the current browser is from Microsoft (Edge
     * or Internet Explorer).
     * 
     * @returns {Boolean}
     */
    isMicrosoft: function() {
      return this.isIE || this.isEdge;
    },
  
    /**
     * Checks if the current browser is Firefox.
     * 
     * @returns {Boolean}
     */
    isFirefox: function() {
      return this.browser.name === 'Firefox';
    },
  
    /**
     * Checks if the current browser is Chrome.
     * 
     * @returns {Boolean}
     */
    isChrome: function() {
      return this.browser.name === 'Chrome';
    },
  
    /**
     * Checks if the current browser is Safari.
     * 
     * @returns {Boolean}
     */
    isSafari: function() {
      return this.browser.name === 'Safari';
    },
  
    /**
     * Checks if the current browser is from an Android device.
     * 
     * @returns {Boolean}
     */
    isAndroid: function() {
      return /Android/i.test(navigator.userAgent);
    },
  
    /**
     * Checks if the current browser is from a BlackBerry device.
     * 
     * @returns {Boolean}
     */
    isBlackBerry: function() {
      return /BlackBerry/i.test(navigator.userAgent);
    },
  
    /**
     * Checks if the current browser is from a Windows Mobile device.
     * 
     * @returns {Boolean}
     */
    isWindowsMobile: function() {
      return /IEMobile/i.test(navigator.userAgent);
    },
  
    /**
     * Checks if the current browser is Mobile Safari.
     * 
     * @returns {Boolean}
     */
    isIOS: function() {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
  
    /**
     * Checks if the current browser is a mobile browser.
     * 
     * @returns {Boolean}
     */
    isMobile: function() {
      return (
        this.isAndroid || this.isBlackBerry || this.isWindowsMobile || this.isIOS
      );
    },
  
    /**
     * Checks if the current browser is supported by
     * our environment.
     * 
     * @returns {Boolean}
     */
    isSupported: function() {
      console.log('TEST BROWSER: '+this.browser.version+' '+this.browser.name)
      if (this.unsupportedBrowsers.hasOwnProperty(this.browser.name)) {
        if (+this.browser.version <= this.unsupportedBrowsers[this.browser.name]) {
          return false;
        }
      }
  
      return true;
    }
  }

//   window.detector = new BrowserDetector;
BrowserDetector.detectBrowser();
  if(!BrowserDetector.isSupported()) {
    window.location.href = '/unsupported-browser/'
  }