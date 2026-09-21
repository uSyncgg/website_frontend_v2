import { useAsync } from './useEvents';
import { getEventPasses, getEventReceipt } from 'services/event_registration';

export function useEventPasses(path) {
  return useAsync(() => getEventPasses({ path }), [path]);
}

export function useEventReceipt(registrationId) {
  return useAsync(() => getEventReceipt({ registration_id: registrationId }), [registrationId]);
}
