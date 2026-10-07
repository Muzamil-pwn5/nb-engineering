import { useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "nb-cookie-notice-dismissed";

function hasDismissedNotice() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => !hasDismissedNotice());

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // The notice can still be dismissed when storage is unavailable.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="cookie-notice" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-description">
      <div>
        <h2 id="cookie-title">Privacy notice</h2>
        <p id="cookie-description">This site uses essential browser storage to remember this notice. No analytics or advertising cookies are currently enabled.</p>
      </div>
      <div className="cookie-notice-actions">
        <Link to="/privacy-policy" className="cookie-policy-link">Read privacy policy</Link>
        <button type="button" className="cookie-dismiss" onClick={dismiss}>Continue</button>
      </div>
    </aside>
  );
}
