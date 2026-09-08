"use client";

import { contact } from "@/projects/projectData";

/** Phase 21: the real closing statement + real contact links. Deliberately
 * not a form — matches the live site and the brief's "keep it simple". */
export default function ContactPanel() {
  return (
    <div className="location-panel">
      <p className="kicker">// Transmit:// Node: Open_Channel</p>
      <h1 className="huge-title" style={{ whiteSpace: "pre-line" }}>
        {contact.statement}
      </h1>
      <p className="body-text">{contact.body}</p>
      <p className="body-text" style={{ fontWeight: 700 }}>
        {contact.motto}
      </p>
      <ul className="contact-list">
        <li>
          <a href={`mailto:${contact.email}`} data-cursor="open">
            <span>
              <span className="tag">Email</span>
              {contact.email}
            </span>
            <span className="val">Start a project ↗</span>
          </a>
        </li>
        <li>
          <a href={contact.whatsapp.href} target="_blank" rel="noreferrer" data-cursor="open">
            <span>
              <span className="tag">WhatsApp</span>
              {contact.whatsapp.display}
            </span>
            <span className="val">Open ↗</span>
          </a>
        </li>
        <li>
          <a href={contact.portfolio.href} target="_blank" rel="noreferrer" data-cursor="open">
            <span>
              <span className="tag">Portfolio</span>
              {contact.portfolio.display}
            </span>
            <span className="val">Open ↗</span>
          </a>
        </li>
        <li>
          <a href={contact.resume.href} data-cursor="open">
            <span>
              <span className="tag">Resume</span>
              {contact.resume.display}
            </span>
            <span className="val">View ↗</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
