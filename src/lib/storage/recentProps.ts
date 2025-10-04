import type { PropTicket } from "@/types/props";

const KEY = "fynetic_recent_props";

export function loadRecentProps(): PropTicket[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PropTicket[]) : [];
  } catch {
    return [];
  }
}

export function saveRecentProp(ticket: PropTicket) {
  const list = loadRecentProps();
  const next = [ticket, ...list].slice(0, 20);
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function deleteRecentProp(id: string) {
  const list = loadRecentProps().filter(t => t.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function clearRecentProps() {
  localStorage.removeItem(KEY);
}
