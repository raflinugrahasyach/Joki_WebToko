// =========================================================================
// Berkas: client/assets/js/utils/toast.js
// =========================================================================
export function showToast(message, isError = false) {
    const toastId = 'toast-notification';
    const existingToast = document.getElementById(toastId);
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = toastId;
    const bgColor = isError ? 'bg-red-600' : 'bg-gray-900';
    const icon = isError 
        ? `<i data-lucide="alert-circle" class="inline-block mr-2 w-5 h-5 text-white"></i>` 
        : `<i data-lucide="check-circle" class="inline-block mr-2 w-5 h-5 text-emerald-400"></i>`;
    
    toast.className = `fixed top-5 right-5 ${bgColor} text-white py-3 px-6 rounded-lg shadow-xl text-sm z-50 animate-fade-in-down`;
    toast.innerHTML = `${icon} ${message}`;
    
    document.body.appendChild(toast);
    lucide.createIcons({ attrs: { 'stroke-width': 2 } });

    setTimeout(() => {
        toast.classList.remove('animate-fade-in-down');
        toast.classList.add('animate-fade-out-up');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}