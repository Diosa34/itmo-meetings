export default function showToast(toast, type, summary, message) {
        toast.current.show({ severity: type, summary: summary, detail: message});
}