// ABOUTME: Small vector icons and the cat illustration builder used across the UI and canvas.
// ABOUTME: All icons use currentColor so they inherit surrounding text color.
const svg=(inner,vb=24)=>`<svg viewBox="0 0 ${vb} ${vb}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="icon" aria-hidden="true">${inner}</svg>`;

export const icon={
 person:svg('<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"/>'),
 book:svg('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v17H6.5A2.5 2.5 0 0 0 4 22.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v17h5.5a2.5 2.5 0 0 1 2.5 2.5z"/>'),
 bag:svg('<path d="M6 8h12l-1.2 12.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
 dial:svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2"/>'),
 trophy:svg('<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 5H5.5A2.5 2.5 0 0 0 8 9"/><path d="M16 5h2.5A2.5 2.5 0 0 1 16 9"/><path d="M12 13v3.5"/><path d="M8.5 20h7"/><path d="M9.5 20l.8-3.5h3.4l.8 3.5"/>'),
 info:svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r=".9" fill="currentColor" stroke="none"/>'),
 speaker:svg('<path d="M4 9.5v5h3.2l4.6 3.4V6.1L7.2 9.5z"/><path d="M16.5 9a4 4 0 0 1 0 6"/>'),
 bell:svg('<path d="M6.5 10a5.5 5.5 0 0 1 11 0c0 4.6 1.8 5.6 1.8 5.6H4.7S6.5 14.6 6.5 10z"/><path d="M10.3 18.5a1.9 1.9 0 0 0 3.4 0"/>'),
 vibrate:svg('<rect x="8" y="3.5" width="8" height="17" rx="2"/><path d="M2.5 9v6M21.5 9v6"/>'),
 contrast:svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none"/>'),
 pencil:svg('<path d="M4 20l.9-3.8L15.6 5.5l2.9 2.9L7.8 19.1z"/><path d="M13.9 7.2l2.9 2.9"/>'),
 check:svg('<path d="M4 12.5l5 5L20 6"/>'),
 lock:svg('<rect x="6" y="10.5" width="12" height="9" rx="2"/><path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7"/>'),
 fish:'<svg viewBox="0 0 24 24" class="icon" aria-hidden="true"><ellipse cx="9" cy="12" rx="7" ry="4.2" fill="#8ee7ff" stroke="#2b93b8" stroke-width="1.2"/><path d="M16 12l5-4.5v9z" fill="#8ee7ff" stroke="#2b93b8" stroke-width="1.2"/><circle cx="5.5" cy="11" r="1" fill="#0b3d4d"/></svg>',
 play:'<svg viewBox="0 0 24 24" class="icon" aria-hidden="true"><path d="M6 4.5v15l13-7.5z" fill="currentColor"/></svg>'
};

// Ilustrasi kucing vektor (dipakai di logo & pratinjau skin) — menggantikan ilustrasi lebah.
export function catSvg(body,stripe,{crown=false,alpha=1,size=48}={}){
 return `<svg viewBox="0 0 40 40" width="${size}" height="${size}" style="opacity:${alpha}">
  <path d="M8 13L12 3L17 12Z" fill="${body}"/>
  <path d="M32 13L28 3L23 12Z" fill="${body}"/>
  <path d="M10 11L12.5 5.5L15 11Z" fill="${stripe}"/>
  <path d="M30 11L27.5 5.5L25 11Z" fill="${stripe}"/>
  <circle cx="20" cy="23" r="14" fill="${body}"/>
  <path d="M11 26q2 -5 6 -3.5M29 26q-2 -5 -6 -3.5" stroke="${stripe}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="15" cy="21" r="2.4" fill="#241c0d"/>
  <circle cx="25" cy="21" r="2.4" fill="#241c0d"/>
  <path d="M20 24.5l-1.6 1.6h3.2z" fill="${stripe}"/>
  <path d="M20 26.4q1.6 1.6 3.2 0" stroke="${stripe}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <path d="M6 24h7M6 27h6.5M27.5 27h6.5M27 24h7" stroke="${stripe}" stroke-width="1.3" stroke-linecap="round" opacity=".55"/>
  ${crown?'<path d="M14 3.5l1.6 3.4L20 2.5l4.4 4.4L26 3.5l-.9 4.3H14.9z" fill="#ffd34e" stroke="#7a4b00" stroke-width=".8"/>':""}
 </svg>`;
}
