import { useAcademy } from '../context'

export function ToastBanner() {
  const { toast, hideToast } = useAcademy()
  if (!toast) return null

  return (
    <div className="ac-toast" role="status" aria-live="polite">
      <span className="ac-toast__dot" aria-hidden="true" />
      <p>{toast.message}</p>
      <button type="button" className="ac-toast__close" onClick={hideToast} aria-label="Dismiss notification">
        ✕
      </button>
    </div>
  )
}
