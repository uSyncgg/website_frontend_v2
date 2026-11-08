import apiClient from "./apiClient";

// uSync staff only (the backend checks the admins table): reported match chat messages.
//
//   GET  /admin/chat-reports?status=open|actioned|dismissed|all
//        -> { open_count, reports: [{ id, source: 'player' | 'admin_hide', category, note, status, created_at,
//             reporter_name, sender_name, sender_role, message, event_id, event_name, match_id,
//             chat_available, reviewed_by, reviewed_at, resolution_note }] }
//   GET  /admin/chat-reports/:id/history
//        -> { live, highlight_id, event_id, match_id, admins: [name], messages: [{ id, kind, name, role, body, at, hidden, hidden_by }] }
//           live is false once the chat has been deleted: messages are then the saved copy around the reported one.
//   POST /admin/chat-reports/:id/resolve { action: 'actioned' | 'dismissed', note } -> the updated report
//
// Reading a chat here is written to the admin audit log by the backend.

const auth = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const getChatReports = (token, status = 'open') =>
    apiClient.get('/admin/chat-reports', { ...auth(token), params: { status } }).then(res => res.data);

export const getChatReportHistory = (token, reportId) =>
    apiClient.get(`/admin/chat-reports/${encodeURIComponent(reportId)}/history`, auth(token)).then(res => res.data);

export const resolveChatReport = (token, reportId, action, note) =>
    apiClient.post(`/admin/chat-reports/${encodeURIComponent(reportId)}/resolve`, { action, note: note || null }, auth(token)).then(res => res.data);

// The history's lines in the shape the chat component draws.
export const historyMessages = (history) => history.messages.map(m => ({
    id: m.id,
    kind: m.kind,
    sender: m.kind === 'user' ? { name: m.name, role: m.role } : null,
    body: m.body,
    at: m.at,
    mine: false,
    hidden: !!m.hidden,
    hiddenBy: m.hidden_by ?? null,
}));
